<script lang="ts">
	import { goto } from '$app/navigation';
	import { IncidentAPIRoute, type IncidentGet } from '$lib';
	import DataDisplay from '$lib/components/display/dataDisplay.svelte';
	import Loading from '$lib/components/display/loading.svelte';
	import { Button, Input, Table, Card, CardBody, CardHeader, CardTitle, CardSubtitle, Form, InputGroup, Icon } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';


	let incidents: IncidentGet[] | null = $state(null);

	let pageSize: number = 5;
	let cursorNext: number | null = $state(null);
	let loadingNextPage: boolean = $state(false);

	let search: string = $state("");
	let includeArchived: boolean = $state(false);

	let params = $derived.by(() => {
		const searchDerived = search;
		const includeArchivedDerived = includeArchived;

		const paramsInitial = new URLSearchParams();

		if (searchDerived.length !== 0) paramsInitial.set("search", searchDerived);
		if (includeArchivedDerived) paramsInitial.set("includeArchived", "true");

		return paramsInitial;
	})



	$effect(() => {
		const __ = includeArchived;
		loadRecords();
	})

	async function loadRecords() {
		incidents = null;

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

		const paramsInitial = params;
		paramsInitial.set("pageSize", pageSize.toString());
		paramsInitial.set("cursorId", cursorNext.toString());

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


<div class="d-flex flex-column mt-3 p-5">
	<div class="d-flex w-100 justify-content-center">
		<h1 class="text-primary">FIRE INCIDENT DATABASE</h1>
	</div>

	<Card class="mt-3 shadow border">
		<CardHeader>
			<CardTitle>Filter Incidents</CardTitle>
		</CardHeader>
		<CardBody>
			<div class="d-flex flex-row w-100">
				<Form class="w-100" on:submit={loadRecords}>
					<InputGroup>
						<Input
							type="text"
							bind:value={search}
							placeholder="Enter search term..."
							class="h-100"
						/>
					</InputGroup>
				</Form>
	
				<div class="d-flex flex-row align-items-center w-25 ms-3">
					<Input type="checkbox" bind:checked={includeArchived} />
					<span class="m-0">Include Archived</span>
				</div>
			</div>
		</CardBody>
	</Card>


	<Card class="mt-3 shadow border">
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
								{#if includeArchived}
									<th>Archived</th>
								{/if}
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
									{#if includeArchived}
										<td><DataDisplay data={incident.archived} boolFlipColors/></td>
									{/if}
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
