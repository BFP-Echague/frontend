<script lang="ts">
    import { Button, Container, Row, Col, Card, CardBody } from "@sveltestrap/sveltestrap"; // Sveltestrap Components

    let isEditing = false; // Toggles Edit Mode
    let showProfile = false; // Toggles Profile Visibility
    let showMenu = false; // Toggles Menu Visibility

    let incident = {
        location: "Sample Street, City",
        reportTime: "2025-02-12T10:30",
        barangay: "Barangay 123",
        cause: "Electrical Fault",
        responseTime: "2025-02-12T10:45",
        fireOutTime: "2025-02-12T11:00",
        casualties: "None"
    };

    function toggleEdit() {
        isEditing = !isEditing;
    }

    function saveReport() {
        alert("Incident Report has been updated.");
        isEditing = false;
    }

    function deleteReport() {
        if (confirm("Are you sure you want to delete this report?")) {
            incident = null; // Hides the Incident Report
        }
    }

    function toggleMenu() {
        showMenu = !showMenu;
    }

    function toggleProfile() {
        showProfile = !showProfile;
    }
</script>

<svelte:head>
    <title>Fire Incident Report</title>
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

    /* Ensure the menu appears above the map */
    .menu-dropdown {
    position: absolute;
    top: 60px;  /* Move the dropdown lower */
    left: 20px; /* Move it slightly to the right */
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 230px;
    display: flex;
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
    top: 55px;   /* Move it lower */
    right: 10px; /* Move slightly to the right */
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 160px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
}

    .map {
        width: 100%;
        border-radius: 8px;
    }

        /* Ensure the map does not overlap */
        .map-container {
        position: relative;
        z-index: 1;
    }

    .incident-title {
        font-size: 18px;
        font-weight: bold;
        color: #d32f2f;
        text-align: left;
    }

    .form-input {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>

<!-- Header -->
<div class="header">
    <!-- Menu Button -->
    <div class="menu" on:click={toggleMenu}>
        ☰ FIRE INCIDENT REPORT
    </div>

    {#if showMenu}
        <div class="menu-dropdown">
            <a class="menu-item" href="/report">📄 Fire Incident Report</a>
            <a class="menu-item" href="/summary">📊 Summary Statistics</a>
        </div>
    {/if}

 <!-- Profile Button -->
 <div class="profile" on:click={toggleProfile}>
    👤
</div>

{#if showProfile}
    <div class="profile-dropdown">
        <div class="menu-item">👮 BFP Admin</div>
    </div>
{/if}
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

            {#if incident}
                <Card class="mt-3">
                    <CardBody>
                        <h5 class="incident-title">Incident Report</h5>

                        {#if isEditing}
                            <p><strong>Location:</strong> <input class="form-input" bind:value={incident.location} /></p>
                            <p><strong>Report Time:</strong> <input class="form-input" type="datetime-local" bind:value={incident.reportTime} /></p>
                            <p><strong>Barangay:</strong> <input class="form-input" bind:value={incident.barangay} /></p>
                            <p><strong>Cause of Fire:</strong> <input class="form-input" bind:value={incident.cause} /></p>
                            <p><strong>Response Time:</strong> <input class="form-input" type="datetime-local" bind:value={incident.responseTime} /></p>
                            <p><strong>Fire Out Time:</strong> <input class="form-input" type="datetime-local" bind:value={incident.fireOutTime} /></p>
                            <p><strong>Casualties:</strong> <input class="form-input" bind:value={incident.casualties} /></p>
                        {:else}
                            <p><strong>Location:</strong> {incident.location}</p>
                            <p><strong>Report Time:</strong> {incident.reportTime}</p>
                            <p><strong>Barangay:</strong> {incident.barangay}</p>
                            <p><strong>Cause of Fire:</strong> {incident.cause}</p>
                            <p><strong>Response Time:</strong> {incident.responseTime}</p>
                            <p><strong>Fire Out Time:</strong> {incident.fireOutTime}</p>
                            <p><strong>Casualties:</strong> {incident.casualties}</p>
                        {/if}
                    </CardBody>
                </Card>
            {/if}
        </Col>

        <!-- Buttons Section -->
        <Col md="3" class="d-flex flex-column align-items-end">
            <Button color="secondary" class="mb-3 w-100" on:click={toggleEdit}>
                {isEditing ? "Cancel" : "✏️ Edit"}
            </Button>
            <Button color="success" class="mb-3 w-100" on:click={saveReport} disabled={!isEditing}>
                💾 Save
            </Button>
            <Button color="danger" class="w-100" on:click={deleteReport}>
                🗑️ Delete
            </Button>
        </Col>
    </Row>
</Container>
