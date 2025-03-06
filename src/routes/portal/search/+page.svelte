<script lang="ts">
	import { goto } from '$app/navigation';
	import { IncidentAPIRoute, type IncidentGet } from '$lib';
	import DataDisplay from '$lib/components/display/dataDisplay.svelte';
	import Loading from '$lib/components/display/loading.svelte';
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
		InputGroup,
		Icon
	} from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';


	interface Data {
		date: string;
		purok: string;
		barangay: string;
		year: number;
	}


	let incidents: IncidentGet[] | null = null;

	let pageSize: number = 5;
	let cursorNext: number | null = null;
	let loadingNextPage: boolean = false;

	let boundSearch: string = "";
	let currentSearch: string | null = null;
	async function loadRecords() {
		currentSearch = boundSearch.length !== 0 ? boundSearch : null;

		const params = new URLSearchParams();
		if (currentSearch !== null) params.set("search", currentSearch);
		params.set("pageSize", pageSize.toString());

		const result = await IncidentAPIRoute.instance.getMany(params);
		if (!await result.isOK()) {
			alert("Loading records failed.");
			incidents = [];
			return;
		}

		const moreInfo = await result.getMoreInfoParsed();
		incidents = moreInfo.data;

		cursorNext = moreInfo.pageInfo.cursorNext
	}


	async function nextPage() {
		if (cursorNext === null) {
			alert("No other pages!");
			return;
		}

		loadingNextPage = true;

		const params = new URLSearchParams();
		if (currentSearch !== null) params.set("search", currentSearch);
		params.set("pageSize", pageSize.toString());
		params.set("cursorId", cursorNext.toString());

		const result = await IncidentAPIRoute.instance.getMany(params);
		if (!await result.isOK()) {
			alert("Loading further records failed.");
			return;
		}


		const moreInfo = await result.getMoreInfoParsed();
		incidents = [...(incidents ?? []), ...moreInfo.data]

		cursorNext = moreInfo.pageInfo.cursorNext

		loadingNextPage = false;
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



	function gotoIncidentView(id: number) {
		goto(`./report/${id}/view`);
	}



	onMount(() => {
		loadRecords();
	})
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
					<Form on:submit={loadRecords}>
						<InputGroup>
							<Input
								type="text"
								bind:value={boundSearch}
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
					{#if incidents === null}
						<Loading />
					{:else}
						{#if incidents.length === 0}
							<h5>No results.</h5>
						{:else}
							<Table bordered striped hover responsive>
								<thead>
									<tr class="table-primary">
										<th>Name</th>
										<th>Report Time</th>
										<th>Barangay</th>
										<th>Category</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{#each incidents as incident}
										<tr>
											<td><DataDisplay data={incident.name} /></td>
											<td><DataDisplay data={incident.reportTime} /></td>
											<td><DataDisplay data={incident.barangay.name} /></td>
											<td><DataDisplay data={incident.category.name} /></td>
											<td class="text-center">
												<Button
													color="primary"
													class="m-0"
													on:click={() => gotoIncidentView(incident.id)}
												>
													<Icon name="arrow-up-right-square" />
												</Button>
											</td>
										</tr>
									{/each}
								</tbody>
							</Table>

							{#if cursorNext !== null}
								<Button color="secondary" class="w-100" on:click={nextPage}>
									<Icon name="arrow-down-circle" />
									Load More
									<Icon name="arrow-down-circle" />
								</Button>
							{/if}
						{/if}
					{/if}
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
