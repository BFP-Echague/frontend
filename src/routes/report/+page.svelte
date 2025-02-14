<script lang="ts">
    import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap Import
    import { Button, Container, Row, Col, Card, CardBody } from "sveltestrap"; // Sveltestrap Components

    function editReport() {
        alert("Edit Fire Incident Report");
    }

    function printReport() {
        alert("Generating report...");
    }

    function deleteReport() {
        if (confirm("Are you sure you want to delete this report?")) {
            alert("Report deleted.");
        }
    }
</script>

<svelte:head>
    <title>Fire Incident Report</title>
</svelte:head>

<style>
    .header {
        background-color: #b71c1c;
        color: white;
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

    .map {
        width: 100%;
        border-radius: 8px;
    }

    .incident-title {
        font-size: 18px;
        font-weight: bold;
        color: #d32f2f;
        text-align: left;
    }
</style>

<!-- Header -->
<div class="header d-flex justify-content-between align-items-center">
    <div class="menu">☰ FIRE INCIDENT REPORT</div>
    <div class="user-profile bg-white text-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 35px; height: 35px; font-weight: bold; cursor: pointer;">
        👤
    </div>
</div>

<!-- Main Content -->
<Container class="mt-4">
    <Row>
        <!-- Map & Report Section -->
        <Col md="9">
            <Card>
                <CardBody>
                    <img src="map.png" alt="Map" class="map">
                </CardBody>
            </Card>

            <Card class="mt-3">
                <CardBody>
                    <h5 class="incident-title">Incident Report</h5>
                    <p><strong>Location:</strong> Sample Street, City</p>
                    <p><strong>Report Time:</strong> 2025-02-12T10:30</p>
                    <p><strong>Barangay:</strong> Barangay 123</p>
                    <p><strong>Cause of Fire:</strong> Electrical Fault</p>
                    <p><strong>Response Time:</strong> 2025-02-12T10:45</p>
                    <p><strong>Fire Out Time:</strong> 2025-02-12T11:00</p>
                    <p><strong>Casualties:</strong> None</p>
                </CardBody>
            </Card>
        </Col>

        <!-- Buttons Section -->
        <Col md="3" class="d-flex flex-column align-items-end">
            <Button color="secondary" class="mb-3 w-100" on:click={editReport}>✏️ Edit</Button>
            <Button color="primary" class="mb-3 w-100" on:click={printReport}>📂 Print</Button>
            <Button color="danger" class="w-100" on:click={deleteReport}>🗑️ Delete</Button>
        </Col>
    </Row>
</Container>
