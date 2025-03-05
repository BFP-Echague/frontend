<script lang="ts">
	import {
		Button,
		Input,
		Table,
		Alert,
		Row,
		Col,
		Container,
		Card,
		CardBody,
		CardHeader,
		CardTitle,
		CardSubtitle,
		FormGroup,
		Form,
		Styles
	} from '@sveltestrap/sveltestrap';

	interface Data {
		date: string;
		purok: string;
		barangay: string;
		year: number;
	}

	let searchTerm: string = '';
	let isOpen = false;

	function performSearch() {
		if (searchTerm.length === 0) return;

		
	}

	function getResultsSummary(data: Data[]) {
		if (data.length === 0) {
			return 'No results found. Please refine your search.';
		}

		const totalIncidents = data.length;
		const barangays = [...new Set(data.map((item) => item.barangay))];
		const mostCommonBarangay = barangays.reduce(
			(acc, barangay) => {
				const count = data.filter((item) => item.barangay === barangay).length;
				return count > acc.count ? { barangay, count } : acc;
			},
			{ barangay: '', count: 0 }
		);

		return `
        A total of <strong>${totalIncidents} fire incidents</strong> were found matching your search criteria. 
        The incidents occurred across <strong>${barangays.length} different barangays</strong>, with the majority 
        concentrated in <strong>${mostCommonBarangay.barangay}</strong> (${mostCommonBarangay.count} incidents). 
        <br><br>
        `;
	}
</script>


<Container class="mt-4">
	<Row>
		<Col>
			<Card>
				<CardHeader>
					<CardTitle class="text-primary">Search Fire Incident</CardTitle>
					<CardSubtitle>Enter your search criteria below</CardSubtitle>
				</CardHeader>
				<CardBody>
					<Form on:submit={performSearch}>
						<FormGroup>
							<Input
								type="text"
								bind:value={searchTerm}
								placeholder="Enter search term..."
								class="border-danger rounded"
							/>
						</FormGroup>
						<Button color="primary" type="submit">Search</Button>
					</Form>
				</CardBody>
			</Card>
		</Col>
	</Row>

	<Row class="mt-4">
		<Col md="8">
			<Card>
				<CardHeader>
					<CardTitle class="text-primary">Search Results</CardTitle>
				</CardHeader>
				<CardBody>
					<Table bordered striped hover>
						<thead>
							<tr class="table-primary">
								<th>Date</th>
								<th>Purok</th>
								<th>Barangay</th>
								<th>Year</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</Table>
				</CardBody>
			</Card>
		</Col>
		<Col md="4">
			<Card>
				<CardHeader>
					<CardTitle class="text-primary">Summary</CardTitle>
				</CardHeader>
				<CardBody>
					<Alert color="primary">
						<h3 class="text-light">Short Description of Results</h3>
						<p class="text-light"></p>
					</Alert>
				</CardBody>
			</Card>
		</Col>
	</Row>
</Container>
