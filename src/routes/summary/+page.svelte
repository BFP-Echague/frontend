<script lang="ts">
    import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
    import { Button, Container, Row, Col, Card, CardBody } from "@sveltestrap/sveltestrap"; // Sveltestrap Components

    let showProfile = false; // Toggles Profile Visibility
    let showMenu = false; // Toggles Menu Visibility

    function generateReport(chartType: string) {
        alert(`Generating report for ${chartType}`);
    }
</script>

<svelte:head>
    <title>Analytics of Fire Incidents</title>
</svelte:head>

<style>
    /* Header */
    .header {
        background-color: #b71c1c;
        color: white;
        padding: 15px 20px;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .menu {
        background: #f0f0f0;
        padding: 10px 20px;
        border-radius: 20px;
        color: #333;
        cursor: pointer;
        font-weight: bold;
        position: relative;
    }

    .menu-dropdown {
        position: absolute;
        top: 40px;
        left: 0;
        background: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        width: 200px;
        display: none;
        flex-direction: column;
    }

    .menu:hover .menu-dropdown {
        display: flex;
    }

    .menu-item {
        padding: 10px;
        color: #333;
        text-decoration: none;
        display: block;
        cursor: pointer;
    }

    .menu-item:hover {
        background: #f5f5f5;
    }

    .profile {
        width: 35px;
        height: 35px;
        background-color: white;
        color: #b71c1c;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        position: relative;
    }

    .profile-dropdown {
        position: absolute;
        top: 40px;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        width: 150px;
        display: none;
    }

    .profile:hover .profile-dropdown {
        display: block;
    }

    .title {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        color: #d32f2f;
        margin-top: 20px;
    }

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
        color: #d32f2f;
        margin-bottom: 10px;
        text-align: center;
    }

    .paragraph-text {
        font-size: 16px;
        color: #424242;
        text-align: justify;
    }

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

<!-- Header -->
<div class="header">
    <!-- Menu Dropdown -->
    <div class="menu">
        ☰ ANALYTICS OF FIRE INCIDENTS
        <div class="menu-dropdown">
            <a class="menu-item" href="/report">Fire Incident Report</a>
            <a class="menu-item" href="/summary">Summary Statistics</a>
        </div>
    </div>

    <!-- Profile Button -->
    <div class="profile">
        👤
        <div class="profile-dropdown">
            <div class="menu-item">BFP Admin</div>
        </div>
    </div>
</div>

<!-- Title -->
<h2 class="title">Summary Statistics</h2>

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
<Container class="mt-4">
    <Row class="charts">
        <Col md="4">
            <Card class="chart-container">
                <CardBody>
                    <h5>Heatmap of Fire Incidents</h5>
                    <img src="heatmap.png" alt="Heatmap" class="heatmap" on:click={() => generateReport("Heatmap")}>
                </CardBody>
            </Card>
        </Col>

        <Col md="4">
            <Card class="chart-container">
                <CardBody>
                    <h5>Fire Causes Distribution</h5>
                    <img src="pie.jpg" alt="Pie Chart" class="pie" on:click={() => generateReport("Pie Chart")}>
                </CardBody>
            </Card>
        </Col>

        <Col md="4">
            <Card class="chart-container">
                <CardBody>
                    <h5>Yearly Fire Incidents</h5>
                    <img src="bar.png" alt="Bar Chart" class="bar" on:click={() => generateReport("Bar Chart")}>
                </CardBody>
            </Card>
        </Col>
    </Row>
</Container>
