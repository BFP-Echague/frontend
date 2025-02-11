<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fire Incident Details</title>
    <style>
        /* General Styling */
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100vh;
            font-family: Arial, sans-serif;
            background-color: #e0e0e0; /* Gray background */
            display: flex;
            flex-direction: column;
        }

        /* Header */
        .header {
            width: 100%;
            height: 50px;
            background-color: #d32f2f;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            font-size: 16px;
            font-weight: bold;
        }

        .user-profile {
            width: 30px;
            height: 30px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4e4e4e;
            font-weight: bold;
            cursor: pointer;
        }

        /* Main Layout */
        .main-container {
            width: 100%;
            height: calc(100vh - 50px);
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align to the left */
            padding: 10px;
        }

        /* Map and Buttons Section */
        .map-buttons-container {
            display: flex;
            width: 100%;
            height: 60%;
            position: relative;
            padding: 10px;
        }

        /* Map (Curved edges, aligned left) */
        .map-container {
            width: 78%;
            height: 100%;
            border-radius: 15px;
            overflow: hidden;
        }

        .map-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Buttons on the Right (Edge-aligned) */
        .buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 18%;
            align-items: flex-start;
            justify-content: center;
            position: absolute;
            right: 0;
            height: 100%;
        }

        .button {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            text-decoration: none;
            color: white;
            font-weight: bold;
            font-size: 14px;
            padding-left: 15px;
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
        }

        .edit, .print { background: #4e4e4e; }
        .delete { background: #d32f2f; }

        /* Incident Report (Maximized, aligned left) */
        .incident-report {
            width: 97%;
            margin-top: 10px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
        }

        .incident-report h2 {
            margin-bottom: 10px;
            color: #4e4e4e;
            font-size: 18px;
        }

        .incident-report p {
            margin: 3px 0;
            font-size: 14px;
            color: #333;
        }

        .bold {
            font-weight: bold;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <div class="header">
        FIRE INCIDENT DETAILS
        <div class="user-profile">👤</div>
    </div>

    <!-- Main Content -->
    <div class="main-container">

        <!-- Map and Buttons -->
        <div class="map-buttons-container">
            
            <!-- Map Section -->
            <div class="map-container">
                <img src="map.png" alt="Fire Incident Map">
            </div>

            <!-- Buttons on the Right (Edge of Interface) -->
            <div class="buttons">
                <a href="#" class="button edit">✏️ Edit</a>
                <a href="#" class="button print">📂 Print</a>
                <a href="#" class="button delete">🗑️ Delete</a>
            </div>

        </div>

        <!-- Incident Report (White Box, Maximized) -->
        <div class="incident-report">
            <h2>Incident Report</h2>
            <p><span class="bold">Location:</span> Sample Street, City</p>
            <p><span class="bold">Report Time:</span> 10:30 AM</p>
            <p><span class="bold">Barangay:</span> Barangay 123</p>
            <p><span class="bold">Cause of Fire:</span> Electrical Fault</p>
            <p><span class="bold">Response Time:</span> 15 minutes</p>
            <p><span class="bold">Fire Out Time:</span> 11:00 AM</p>
            <p><span class="bold">Casualties:</span> None</p>
        </div>

    </div>

</body>
</html>