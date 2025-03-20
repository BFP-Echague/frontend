<script lang="ts">
	import { goto } from '$app/navigation';
	import { IncidentAPIRoute, type IncidentGet } from '$lib';
	import DataDisplay from '$lib/components/display/dataDisplay.svelte';
	import Loading from '$lib/components/display/loading.svelte';
	import {
		Button,
		Input,
		Table,
		Card,
		CardBody,
		CardHeader,
		CardTitle,
		CardSubtitle,
		Form,
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



	function gotoIncidentView(id: number) {
		goto(`./report/${id}/view`);
	}



	onMount(() => {
		loadRecords();
	})
</script>


<div class="d-flex flex-column mt-3">
	<Card class="shadow border">
		<CardHeader>
			<CardTitle>Search Fire Incident</CardTitle>
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
					<Button color="primary" type="submit">
						<Icon name="search" />
						Search
					</Button>
				</InputGroup>
			</Form>
		</CardBody>
	</Card>


	<Card class="shadow border">
		<CardHeader>
			<CardTitle>Search Results</CardTitle>
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
</div>
