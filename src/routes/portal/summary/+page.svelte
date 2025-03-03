<script lang="ts">
    import { Container, Row, Col, Card, CardBody, CardHeader } from "@sveltestrap/sveltestrap";
    import Chart, { type ChartOptions } from "chart.js/auto";
    import { onMount } from "svelte";

    let barChart, pieChart, heatmapChart;
    let barCanvas: HTMLCanvasElement | null = null;
    let pieCanvas: HTMLCanvasElement | null = null;
    let heatmapCanvas: HTMLCanvasElement | null = null;

    let chartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    }

    onMount(() => {
        if (barCanvas == null) throw new Error("barCanvas not mounted");
        barChart = new Chart(barCanvas, {
            type: "bar",
            data: {
                labels: ["2019", "2020", "2021", "2022", "2023"],
                datasets: [{
                    label: "Yearly Fire Incidents",
                    data: [25, 30, 45, 50, 60],
                    backgroundColor: "rgba(183, 28, 28, 0.7)"
                }]
            },
            options: chartOptions
        });

        if (pieCanvas == null) throw new Error("pieCanvas not mounted");
        pieChart = new Chart(pieCanvas, {
            type: "pie",
            data: {
                labels: ["Electrical", "Cooking", "Arson", "Accidents"],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: ["#D32F2F", "#F57C00", "#1976D2", "#388E3C"]
                }]
            },
            options: chartOptions
        });

        if (heatmapCanvas == null) throw new Error("heatmapCanvas not mounted");
        heatmapChart = new Chart(heatmapCanvas, {
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
            },
            options: chartOptions
        });
    });
</script>

<style>
    .chart-container {
        position: relative;
        height: 40vh;
        width: 100%;
    }
</style>


<!-- Title -->
<div class="d-flex flex-column">
    <h1 class="text-primary text-center">Summary Statistics</h1>
</div>


<!-- Paragraphs -->
<div class="d-flex flex-column">
    <Card class="shadow-card">
        <CardHeader class="text-center">
            <h2 class="text-secondary">Fire Reports in Echague, Isabela</h2>
        </CardHeader>
        <CardBody>
            <p>
                Fire reports in Echague, Isabela, show a concerning rise in incidents, particularly in densely populated 
                residential areas. Many cases have been linked to faulty electrical systems and unattended cooking fires. 
                In response, local authorities have intensified fire safety campaigns and implemented stricter regulations 
                on building fire codes.
            </p>
        </CardBody>
    </Card>
</div>


<!-- Graphs Section -->
<div class="d-flex flex-column m-4">
    <Container fluid>
        <Row>
            <Col>
                <Card class="shadow h-100">
                    <CardBody>
                        <h5>Heatmap of Fire Incidents</h5>
                        <div class="chart-container">
                            <canvas bind:this={heatmapCanvas}></canvas>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col>
                <Card class="shadow">
                    <CardBody>
                        <h5>Fire Causes Distribution</h5>
                        <div class="chart-container">
                            <canvas bind:this={pieCanvas}></canvas>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            <Col>
                <Card class="shadow">
                    <CardBody>
                        <h5>Yearly Fire Incidents</h5>
                        <div class="chart-container">
                            <canvas bind:this={barCanvas}></canvas>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
</div>