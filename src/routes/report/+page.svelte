    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }

        .header {
            background-color: #b71c1c;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            font-size: 18px;
            font-weight: bold;
        }

        .menu {
            background: #f0f0f0;
            padding: 10px 20px;
            border-radius: 20px;
            color: #333;
            cursor: pointer;
            font-weight: bold;
        }

        .user-profile {
            width: 35px;
            height: 35px;
            background-color: white;
            color: #424242;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            cursor: pointer;
        }

        .container {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin: 20px 60px;
        }

        .map-container {
            width: 75%; /* Increased size */
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .map {
            width: 100%;
            border-radius: 8px;
        }

        .actions {
            width: 25%;
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
            margin-top: 80px; /* Lowered buttons */
            margin-left: -30px; /* Moved buttons slightly left */
        }

        .button {
            background: #424242;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
            width: 150px; /* Made buttons longer */
        }

        .button.delete {
            background: #d32f2f;
        }

        .incident-report {
            width: 75%; /* Match the map size */
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            font-size: 14px;
            color: black;
            margin-top: 10px;
        }

        .incident-title {
            font-size: 18px;
            font-weight: bold;
            color: #d32f2f;
            text-align: left;
        }

        .incident-report p {
            margin: 5px 0;
        }

    </style>


    <div class="header">
        <div class="menu">☰ FIRE INCIDENT REPORT</div>
        <div class="user-profile">👤</div>
    </div>

    <div class="container">
        <div>
            <div class="map-container">
                <img src="map.png" alt="Map" class="map">
            </div>
            <div class="incident-report">
                <div class="incident-title">Incident Report</div>
                <p><strong>Location:</strong> Sample Street, City</p>
                <p><strong>Report Time:</strong> 2025-02-12T10:30</p>
                <p><strong>Barangay:</strong> Barangay 123</p>
                <p><strong>Cause of Fire:</strong> Electrical Fault</p>
                <p><strong>Response Time:</strong> 2025-02-12T10:45</p>
                <p><strong>Fire Out Time:</strong> 2025-02-12T11:00</p>
                <p><strong>Casualties:</strong> None</p>
            </div>
        </div>
        <div class="actions">
            <div class="button">✏️ Edit</div>
            <div class="button">📂 Print</div>
            <div class="button delete">🗑️ Delete</div>
        </div>
    </div>
