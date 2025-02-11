<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BFP Fire Map System - Echague</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f0f0f0;
      color: #333;
    }
    header {
      background-color: #d32f2f; /* BFP Red */
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-content {
      display: flex;
      align-items: center;
      gap: 10px; /* Space between the logo and dashboard button */
    }
    .bfp-logo-header {
      width: 50px; /* Adjust logo size as needed */
      height: auto;
    }
    header button {
      background-color: #1976d2; /* BFP Blue */
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    header input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 300px;
    }
    .profile-icon {
      margin-left: 10px;
      color: white;
      font-size: 24px;
      cursor: pointer;
    }
    .container {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 20px;
      padding: 20px;
      height: calc(100vh - 100px); /* Full height minus header */
    }
    .map-section {
      text-align: center; /* Center the title above the map */
    }
    .map {
      height: 400px; /* Reduced map height */
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      background-size: cover;
      background-position: center;
    }
    .sidebar {
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: fit-content; /* Adjust height to fit content */
    }
    h3 {
      color: #d32f2f; /* BFP Red */
      margin-top: 0;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    form .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    form label {
      font-weight: bold;
    }
    form input, form textarea, form input[type="file"] {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 14px;
    }
    form button {
      background-color: #1976d2; /* BFP Blue */
      color: white;
      border: none;
      padding: 12px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    form button:hover {
      background-color: #1565c0;
    }
    .results-section {
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: left; /* Align results content to the left */
    }
    .results-content {
      display: flex;
      gap: 20px;
      align-items: flex-start; /* Align items to the top */
    }
    .results-content img {
      border-radius: 8px;
      width: 200px; /* Fixed width for the image */
      height: auto; /* Maintain aspect ratio */
      object-fit: cover; /* Ensure the image covers the area without distortion */
    }
    .results-details {
      flex: 1; /* Take up remaining space */
      display: flex;
      flex-direction: column;
      gap: 10px; /* Add some space between the details */
    }
    .input-hint {
      font-size: 0.9em;
      color: #666;
      margin-top: 5px;
    }
    .chart-section {
      margin-top: 20px;
    }
    .chart-camaple {
      width: 100%;
      height: 300px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #666;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <img src="bfp_logo.jpg" alt="BFP Logo" class="bfp-logo-header" />
      <button>🏠 Dashboard</button>
    </div>
    <div>
      <input type="text" placeholder="Search..." />
      <i class="fas fa-user-circle profile-icon"></i>
    </div>
  </header>

  <div class="container">
    <section class="map-section">
      <h3>BFP Fire Map System - Echague</h3>
      <img id="map" class="map" src="echague_map.jpg" alt="Echague Map" />
      <div class="results-section">
        <h3>Results</h3>
        <div id="resultsContent" class="results-content">
          <img id="resultImage" src="placeholder.jpg" alt="Incident Image" />
          <div id="resultDetails" class="results-details">
            Incident details here...
          </div>
        </div>
        <div class="chart-section">
          <div class="chart-camaple">
            Chart Placeholder (Chart Camaple)
          </div>
        </div>
      </div>
    </section>

    <aside class="sidebar">
      <h3>🔥 Incident Report</h3>
      <form id="incidentForm">
        <div class="form-group">
          <label for="reportTime">Time Reported:</label>
          <input type="datetime-local" id="reportTime" required />
        </div>

        <div class="form-group">
          <label for="barangay">Location (Barangay):</label>
          <input type="text" id="barangay" required />
        </div>

        <div class="form-group">
          <label for="category">Incident Category:</label>
          <input type="text" id="category" required />
        </div>

        <div class="form-group">
          <label for="cause">Probable Cause:</label>
          <input type="text" id="cause" required 
                 placeholder="e.g., LPG Leak, Electrical Fault" />
          <span class="input-hint">Separate multiple causes with commas</span>
        </div>

        <div class="form-group">
          <label for="responseTime">Time of Arrival:</label>
          <input type="datetime-local" id="responseTime" required />
        </div>

        <div class="form-group">
          <label for="fireOutTime">Time Fire Out:</label>
          <input type="datetime-local" id="fireOutTime" required />
        </div>

        <div class="form-group">
          <label for="structuresInvolved">Affected Structures:</label>
          <input type="text" id="structuresInvolved" required
                 placeholder="e.g., Residential, Commercial" />
          <span class="input-hint">Separate multiple structures with commas</span>
        </div>

        <div class="form-group">
          <label for="notes">Additional Details:</label>
          <textarea id="notes" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label for="incidentImage">Upload Image:</label>
          <input type="file" id="incidentImage" accept="image/*" />
        </div>

        <button type="submit">Submit Report</button>
      </form>
    </aside>
  </div>

  <script>
    // Array to store markers and their associated data
    let markers = [];
    let currentMarker = null;

    // Handle form submission
    const form = document.getElementById('incidentForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const reportTime = document.getElementById('reportTime').value;
      const barangay = document.getElementById('barangay').value;
      const cause = document.getElementById('cause').value.split(',').map(item => item.trim());
      const responseTime = document.getElementById('responseTime').value;
      const fireOutTime = document.getElementById('fireOutTime').value;
      const structuresInvolved = document.getElementById('structuresInvolved').value.split(',').map(item => item.trim());
      const notes = document.getElementById('notes').value;
      const category = document.getElementById('category').value;
      const incidentImage = document.getElementById('incidentImage').files[0];

      // Create popup content
      const popupContent = `
        <b>Location:</b> ${barangay}<br>
        <b>Report Time:</b> ${reportTime}<br>
        <b>Barangay:</b> ${barangay}<br>
        <b>Cause:</b> ${cause.join(', ')}<br>
        <b>Response Time:</b> ${responseTime}<br>
        <b>Fire Out Time:</b> ${fireOutTime}<br>
        <b>Structures Involved:</b> ${structuresInvolved.join(', ')}<br>
        <b>Notes:</b> ${notes}<br>
        <b>Category:</b> ${category}
      `;

      // Store marker data including the image
      const markerData = {
        barangay,
        reportTime,
        cause,
        responseTime,
        fireOutTime,
        structuresInvolved,
        notes,
        category,
        image: incidentImage ? URL.createObjectURL(incidentImage) : null,
      };

      // Add marker data to the markers array
      markers.push(markerData);

      // Reset form
      form.reset();
      currentMarker = null; // Reset current marker

      // Display the results
      const resultImage = document.getElementById('resultImage');
      const resultDetails = document.getElementById('resultDetails');

      if (markerData.image) {
        resultImage.src = markerData.image;
        resultImage.style.display = 'block';
      } else {
        resultImage.src = 'placeholder.jpg'; // Fallback image
        resultImage.style.display = 'block';
      }

      resultDetails.innerHTML = `
        <b>Location:</b> ${markerData.barangay}<br>
        <b>Report Time:</b> ${markerData.reportTime}<br>
        <b>Barangay:</b> ${markerData.barangay}<br>
        <b>Cause:</b> ${markerData.cause.join(', ')}<br>
        <b>Response Time:</b> ${markerData.responseTime}<br>
        <b>Fire Out Time:</b> ${markerData.fireOutTime}<br>
        <b>Structures Involved:</b> ${markerData.structuresInvolved.join(', ')}<br>
        <b>Notes:</b> ${markerData.notes}<br>
        <b>Category:</b> ${markerData.category}
      `;
    });
  </script>
</body>
</html>