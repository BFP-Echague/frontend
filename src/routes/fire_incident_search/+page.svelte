<script>
    // Sample data
    let sampleData = [
      { date: "2023-10-01", purok: "Purok 1", barangay: "Barangay A", year: 2023 },
      { date: "2023-09-25", purok: "Purok 2", barangay: "Barangay B", year: 2023 },
      { date: "2023-09-20", purok: "Purok 3", barangay: "Barangay C", year: 2023 },
      { date: "2023-09-15", purok: "Purok 4", barangay: "Barangay D", year: 2023 },
    ];
  
    let searchTerm = "";
    let filteredData = sampleData;
  
    // Function to perform search
    function performSearch() {
      filteredData = sampleData.filter(
        (item) =>
          item.date.includes(searchTerm) ||
          item.purok.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.year.toString().includes(searchTerm)
      );
    }
  
    // Function to update the results summary
    function getResultsSummary(data) {
      if (data.length === 0) {
        return "No results found. Please refine your search.";
      }
  
      const totalIncidents = data.length;
      const barangays = [...new Set(data.map((item) => item.barangay))];
      const mostCommonBarangay = barangays.reduce((acc, barangay) => {
        const count = data.filter((item) => item.barangay === barangay).length;
        return count > acc.count ? { barangay, count } : acc;
      }, { barangay: "", count: 0 });
  
      return `
        A total of <strong>${totalIncidents} fire incidents</strong> were found matching your search criteria. 
        The incidents occurred across <strong>${barangays.length} different barangays</strong>, with the majority 
        concentrated in <strong>${mostCommonBarangay.barangay}</strong> (${mostCommonBarangay.count} incidents). 
        <br><br>
        <strong>Trends:</strong> The data shows a consistent distribution of incidents across multiple barangays. 
        Authorities are advised to focus on fire safety awareness campaigns in <strong>${mostCommonBarangay.barangay}</strong>.
      `;
    }
  </script>
  
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin: 20px;
    }
    h1 {
      color: #d32f2f; /* BFP Red */
      margin-bottom: 20px;
    }
    .search-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .search-bar input {
      flex: 1;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    .search-bar button {
      background-color: #1976d2; /* BFP Blue */
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .results-container {
      display: grid;
      grid-template-columns: 2fr 1fr; /* Two columns: 2/3 for table, 1/3 for description */
      gap: 20px; /* Space between the table and description */
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table th,
    table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    table th {
      background-color: #f8f8f8;
      font-weight: bold;
    }
    .results-description {
      background-color: #f8f8f8;
      padding: 15px;
      border-radius: 5px;
      height: fit-content; /* Adjust height to fit content */
    }
    .results-description h3 {
      margin-top: 0;
      color: #d32f2f; /* BFP Red */
    }
  </style>
  
  <header>
    <div class="header-content">
      <img src="bfp_logo.jpg" alt="Bureau of Fire Protection Logo" class="bfp-logo-header" />
      <button>🏠 Search Fire Incident</button>
    </div>
    <div>
      <input type="text" placeholder="Search..." />
      <i class="fas fa-user-circle profile-icon"></i>
    </div>
  </header>
  
  <div class="container">
    <h1>Search Fire Incident</h1>
    <div class="search-bar">
      <input type="text" bind:value={searchTerm} placeholder="Enter search term..." />
      <button on:click={performSearch}>Search</button>
    </div>
  
    <div class="results-container">
      <!-- Left Column: Table -->
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Purok</th>
            <th>Barangay</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredData as item}
            <tr>
              <td>{item.date}</td>
              <td>{item.purok}</td>
              <td>{item.barangay}</td>
              <td>{item.year}</td>
            </tr>
          {/each}
        </tbody>
      </table>
  
      <!-- Right Column: Short Description -->
      <div class="results-description">
        <h3>Short Description of Results</h3>
        <p>{@html getResultsSummary(filteredData)}</p>
      </div>
    </div>
  </div>