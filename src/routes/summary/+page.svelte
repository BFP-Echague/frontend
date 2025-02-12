<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics of Fire Incidents</title>
    <style>
        /* Layout and General Styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }

        /* Header */
        .header {
            background-color: #b71c1c; /* Dark Red */
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            font-size: 18px;
            font-weight: bold;
        }

        .menu {
            background: #f0f0f0; /* Light Gray */
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

        /* Summary Statistics Title */
        .title {
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color: #d32f2f; /* Red */
            margin-top: 20px;
        }

        /* Paragraph Section */
        .paragraph-section {
            display: flex;
            justify-content: space-around;
            width: 80%;
            margin: 20px auto;
        }

        .paragraph-box {
            width: 45%;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .paragraph-title {
            font-size: 20px;
            font-weight: bold;
            color: #d32f2f; /* Red */
            margin-bottom: 10px;
            text-align: center;
        }

        .paragraph-text {
            font-size: 16px;
            color: #424242;
            text-align: justify;
        }

        /* Graph Section */
        .charts {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin-top: 20px;
        }

        .chart-container {
            width: 30%;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        /* Image Clickable CSS */
        .chart-container img {
            width: 80%;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .chart-container img:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>

    <!-- Header -->
    <div class="header">
        <div class="menu">☰ ANALYTICS OF FIRE INCIDENTS</div>
        <div class="user-profile">👤</div>
    </div>

    <!-- Title -->
    <div class="title">Summary Statistics</div>

    <!-- Paragraphs Below Summary Statistics -->
    <div class="paragraph-section">
        <div class="paragraph-box">
            <div class="paragraph-title">Fire Reports in Echague, Isabela</div>
            <p class="paragraph-text">
                Fire reports in Echague, Isabela, show a concerning rise in incidents, particularly in densely populated 
                residential areas. Many cases have been linked to faulty electrical systems and unattended cooking fires. 
                In response, local authorities have intensified fire safety campaigns and implemented stricter regulations 
                on building fire codes.
            </p>
        </div>

        <div class="paragraph-box">
            <div class="paragraph-title">Fire Incidents Analysis</div>
            <p class="paragraph-text">
                Data from fire department reports suggest that fire incidents in Echague, Isabela, are more frequent 
                during the dry season. The heatmap visualization highlights key risk zones, while the pie chart 
                confirms that electrical faults remain the leading cause of fires. Proper fire prevention strategies 
                and enhanced emergency response efforts are essential to mitigate future risks.
            </p>
        </div>
    </div>

    <!-- Graphs Section -->
    <div class="charts">
        <div class="chart-container">
            <h3>Heatmap of Fire Incidents</h3>
            <img src="heatmap.png" alt="Heatmap" class="heatmap" onclick="generateReport('Heatmap')">
        </div>

        <div class="chart-container">
            <h3>Fire Causes Distribution</h3>
            <img src="pie.jpg" alt="Pie Chart" class="pie" onclick="generateReport('Pie Chart')">
        </div>

        <div class="chart-container">
            <h3>Yearly Fire Incidents</h3>
            <img src="bar.png" alt="Bar Chart" class="bar" onclick="generateReport('Bar Chart')">
        </div>
    </div>

    <script>
        function generateReport(chartType) {
            alert("Generating report for " + chartType);
        }
    </script>

</body>
</html>
