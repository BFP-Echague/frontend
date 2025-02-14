<script lang="ts">
    import { Button, Container, Row, Col, Card, CardBody } from "@sveltestrap/sveltestrap";
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    let showProfile = false;
    let showMenu = false;

    function toggleMenu() {
        showMenu = !showMenu;
    }

    function toggleProfile() {
        showProfile = !showProfile;
    }

    function generateReport(chartType: string) {
        alert(`Generating report for ${chartType}`);
    }

    let barChart, pieChart, heatmapChart;

    onMount(() => {
        barChart = new Chart(document.getElementById("barChart") as HTMLCanvasElement, {
            type: "bar",
            data: {
                labels: ["2019", "2020", "2021", "2022", "2023"],
                datasets: [{
                    label: "Yearly Fire Incidents",
                    data: [25, 30, 45, 50, 60],
                    backgroundColor: "rgba(183, 28, 28, 0.7)"
                }]
            }
        });

        pieChart = new Chart(document.getElementById("pieChart") as HTMLCanvasElement, {
            type: "pie",
            data: {
                labels: ["Electrical", "Cooking", "Arson", "Accidents"],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: ["#D32F2F", "#F57C00", "#1976D2", "#388E3C"]
                }]
            }
        });

        heatmapChart = new Chart(document.getElementById("heatmapChart") as HTMLCanvasElement, {
            type: "scatter",
            data: {
                datasets: [{
                    label: "Fire Locations",
                    data: [
                        { x: 1, y: 5 }, { x: 2, y: 10 }, { x: 3, y: 6 }, 
                        { x: 4, y: 15 }, { x: 5, y: 12 }, { x: 6, y: 20 }
                    ],
                    backgroundColor: "#B71C1C"
                }]
            }
        });
    });
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
        position: relative;
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

    /* Menu Dropdown */
    .menu-dropdown {
        position: absolute;
        top: 60px;
        left: 20px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        width: 230px;
        flex-direction: column;
        z-index: 1000;
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

    /* Profile */
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

    /* Profile Dropdown */
    .profile-dropdown {
        position: absolute;
        top: 55px;
        right: 10px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        width: 160px;
        flex-direction: column;
        z-index: 1000;
    }

    /* Title */
    .title {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        color: #d32f2f;
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
        color: #d32f2f;
        margin-bottom: 10px;
        text-align: center;
    }

    .paragraph-text {
        font-size: 16px;
        color: #424242;
        text-align: justify;
    }

    /* Chart Section */
    .charts {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
    }

    .chart-container {
        width: 100%;
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    canvas {
        width: 100% !important;
        height: 250px !important;
    }
</style>

<!-- Header -->
<div class="header">
    <div class="menu" on:click={toggleMenu}>☰ ANALYTICS OF FIRE INCIDENTS</div>

    {#if showMenu}
        <div class="menu-dropdown">
            <a class="menu-item" href="/report">📄 Fire Incident Report</a>
            <a class="menu-item" href="/summary">📊 Summary Statistics</a>
        </div>
    {/if}

    <div class="profile" on:click={toggleProfile}>👤</div>

    {#if showProfile}
        <div class="profile-dropdown">
            <div class="menu-item">👮 BFP Admin</div>
        </div>
    {/if}
</div>

<!-- Title -->
<h2 class="title">Summary Statistics</h2>

<!-- Paragraphs -->
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
</div>

<!-- Graphs Section -->
<Container class="mt-4">
    <Row class="charts justify-content-center">
        <Col md="4">
            <Card class="chart-container">
                <CardBody>
                    <h5>Heatmap of Fire Incidents</h5>
                    <canvas id="heatmapChart"></canvas>
                </CardBody>
            </Card>
        </Col>

        <Col md="4">
            <Card class="chart-container">
                <CardBody>
                    <h5>Fire Causes Distribution</h5>
                    <canvas id="pieChart"></canvas>
                </CardBody>
            </Card>
        </Col>

        <Col md="4">
            <Card class="chart-container">
                <CardBody>
                    <h5>Yearly Fire Incidents</h5>
                    <canvas id="barChart"></canvas>
                </CardBody>
            </Card>
        </Col>
    </Row>
</Container>
