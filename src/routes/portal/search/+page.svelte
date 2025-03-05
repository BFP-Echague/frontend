<script lang="ts">
	import { IncidentAPIRoute, type IncidentGet } from '$lib';
	import DataDisplay from '$lib/components/display/dataDisplay.svelte';
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
		Styles,

		InputGroup

	} from '@sveltestrap/sveltestrap';

	interface Data {
		date: string;
		purok: string;
		barangay: string;
		year: number;
	}

	let searchTerm: string = '';

	let incidents: IncidentGet[] = [];

	async function performSearch() {
		console.log("beans");
		if (searchTerm.length === 0) return;

		console.log("beans");

		const result = await IncidentAPIRoute.instance.getMany(new URLSearchParams({ search: searchTerm }));
		if (!await result.isOK()) {
			alert("Search failed.");
			return;
		}

		console.log("beans");

		const moreInfo = await result.getMoreInfo();
		incidents = moreInfo.data;

		console.log(moreInfo);
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
						<InputGroup>
							<Input
								type="text"
								bind:value={searchTerm}
								placeholder="Enter search term..."
								class="h-100"
							/>
							<Button color="primary" type="submit">Search</Button>
						</InputGroup>
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
								<th>Name</th>
								<th>Report Time</th>
								<th>Barangay</th>
								<th>Category</th>
							</tr>
						</thead>
						<tbody>
							{#each incidents as incident}
								<tr>
									<td><DataDisplay data={incident.name} /></td>
									<td><DataDisplay data={incident.reportTime} /></td>
									<td><DataDisplay data={incident.barangay.name} /></td>
									<td><DataDisplay data={incident.categoryId} /></td>
								</tr>
							{/each}
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
