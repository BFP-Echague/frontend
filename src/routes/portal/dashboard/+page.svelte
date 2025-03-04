<script lang="ts">
	import IncidentForm from '$lib/components/incidentForm.svelte';
	import {
		Container,
		Row,
		Col,
		Card,
		CardBody,
		CardTitle,
		Form,
		FormGroup,
		Label,
		Input,
		Button,
		Alert,
		Icon,

		InputGroup

	} from '@sveltestrap/sveltestrap';

	// Form input values
	let reportTime = '';
	let barangay = '';
	let category = '';
	let cause = '';
	let responseTime = '';
	let fireOutTime = '';
	let notes = '';
	let probableCauses = ['Stove', 'Electric Fan', 'Loose Wire', 'Electrical Overload', 'Candle'];
	let selectedCauses: string[] = [];
	let structuresInvolved = [''];

	// Function to toggle cause selection
	function toggleCause(cause: string) {
		if (selectedCauses.includes(cause)) {
			// Remove the cause if it's already selected
			selectedCauses = selectedCauses.filter((c) => c !== cause);
		} else {
			// Add the cause if it's not selected
			selectedCauses = [...selectedCauses, cause];
		}
	}

	// Function to add a new structure input
	function addStructure() {
		structuresInvolved = [...structuresInvolved, ' '];
	}

	// Function to remove a structure
	function removeStructure(index: number) {
		structuresInvolved = structuresInvolved.filter((_, i) => i !== index);
	}
</script>

<!-- Main Content -->
<Container fluid>
	<Row>
		<!-- Left Section: Map and Results -->
		<Col md="8">
			<Card class="mb-4 shadow">
				<CardBody>
					<CardTitle class="text-primary fs-3">
						<h3 class="d-inline">
							<Icon name="map" class="me-2" /> Fire Incident Map
						</h3>
					</CardTitle>
					<img
						src="/placeholder-map.jpg"
						alt="Map showing fire incidents in Echague"
						class="img-fluid rounded"
						style="height: 600px;"
					/>
				</CardBody>
			</Card>

			<Card class="shadow">
				<CardBody>
					<h3 class="text-primary">
						<Icon name="clipboard-data" class="me-2" /> Incident Results
					</h3>
					<div class="d-flex align-items-start gap-4">
						<img
							src="/placeholder-incident.jpg"
							alt="Incident details"
							class="rounded"
							style="width: 440px;"
						/>
						<div>
							<h5>Incident Details</h5>
							<p><strong>Location:</strong> {barangay}</p>
							<p><strong>Category:</strong> {category}</p>
							<p><strong>Selected Causes:</strong> {selectedCauses.join(', ')}</p>
							<p><strong>Time of Arrival:</strong> {responseTime}</p>
							<p><strong>Time Fire Out:</strong> {fireOutTime}</p>
							<p><strong>Affected Structures:</strong> {structuresInvolved}</p>
							<p><strong>Notes:</strong> {notes}</p>
						</div>
					</div>
				</CardBody>
			</Card>
		</Col>

		<!-- Right Section: Incident Report Form -->
		<Col md="4">
			<Card class="shadow">
				<CardBody>
					<h3 class="text-primary">
						<Icon name="exclamation-triangle" class="me-2" /> Incident Report
					</h3>
					
                    <IncidentForm />
				</CardBody>
			</Card>

			<!-- Alert Section -->
			<Alert color="danger" class="mt-4 shadow text-light">
				<Icon name="exclamation-circle" class="me-2" /> Ensure all fields are filled accurately before
				submitting.
			</Alert>
		</Col>
	</Row>
</Container>
