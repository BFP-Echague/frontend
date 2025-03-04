<script lang="ts">
	import { Button, Container, Row, Col, Card, CardBody, Input } from '@sveltestrap/sveltestrap'; // Sveltestrap Components

	let isEditing = false; // Toggles Edit Mode

	let incident = {
		location: 'Sample Street, City',
		reportTime: '2025-02-12T10:30',
		barangay: 'Barangay 123',
		cause: 'Electrical Fault',
		responseTime: '2025-02-12T10:45',
		fireOutTime: '2025-02-12T11:00',
        affectedStructures: 'wawa',
        notes: 'wawa'
	};

	function toggleEdit() {
		isEditing = !isEditing;
	}

	function saveReport() {
		alert('Incident Report has been updated.');
		isEditing = false;
	}

	function deleteReport() {
		if (confirm('Are you sure you want to delete this report?')) {
			// Hides the Incident Report
		}
	}
</script>

<!-- Main Content -->
<Container class="mt-4">
	<Row>
		<!-- Map & Report Section -->
		<Col md="9">
			<Card>
				<CardBody>
					<img src="map.png" alt="Map" class="map" />
				</CardBody>
			</Card>

            <Card class="mt-3">
                <CardBody>
                    <h5 class="incident-title">Incident Report</h5>

                    {#if isEditing}
                        <div class="d-flex flex-column">
                            <strong>Location:</strong>
                            <Input bind:value={incident.location} />
                        </div>
                        <div class="d-flex flex-column">
                            <strong>Report Time:</strong>
                            <Input type="datetime-local" bind:value={incident.reportTime} />
                        </div>
                        <div class="d-flex flex-column">
                            <strong>Barangay:</strong>
                            <Input bind:value={incident.barangay} />
                        </div>
                        <div class="d-flex flex-column">
                            <strong>Cause of Fire:</strong>
                            <Input bind:value={incident.cause} />
                        </div>
                        <div class="d-flex flex-column">
                            <strong>Response Time:</strong>
                            <Input type="datetime-local" bind:value={incident.responseTime} />
                        </div>
                        <div class="d-flex flex-column">
                            <strong>Fire Out Time:</strong>
                            <Input type="datetime-local" bind:value={incident.fireOutTime} />
                        </div>
                        <div class="d-flex flex-column">
                            <strong>Affected Structures:</strong>
                            <Input type="datetime-local" bind:value={incident.affectedStructures} />
                        </div>
                        <div class="d-flex flex-column">
                            <strong>Notes:</strong>
                            <Input type="datetime-local" bind:value={incident.notes} />
                        </div>
                    {:else}
                        <p><strong>Location:</strong> {incident.location}</p>
                        <p><strong>Report Time:</strong> {incident.reportTime}</p>
                        <p><strong>Barangay:</strong> {incident.barangay}</p>
                        <p><strong>Cause of Fire:</strong> {incident.cause}</p>
                        <p><strong>Response Time:</strong> {incident.responseTime}</p>
                        <p><strong>Fire Out Time:</strong> {incident.fireOutTime}</p>
                        <p><strong>Affected Structures:</strong> {incident.affectedStructures}</p>
                        <p><strong>Notes:</strong> {incident.notes}</p>
                    {/if}
                </CardBody>
            </Card>
		</Col>

		<!-- Buttons Section -->
		<Col md="3" class="d-flex flex-column align-items-end">
			<Button color="secondary" class="mb-3 w-100" on:click={toggleEdit}>
				{isEditing ? 'Cancel' : '✏️ Edit'}
			</Button>
			<Button color="success" class="mb-3 w-100" on:click={saveReport} disabled={!isEditing}>
				💾 Save
			</Button>
			<Button color="danger" class="w-100" on:click={deleteReport}>🗑️ Delete</Button>
		</Col>
	</Row>
</Container>

<style>
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
