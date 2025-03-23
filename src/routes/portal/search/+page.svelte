<script lang="ts">
	import { goto } from '$app/navigation';
	import { IncidentAPIRoute, type IncidentGet } from '$lib';
	import DataDisplay from '$lib/components/display/dataDisplay.svelte';
	import Loading from '$lib/components/display/loading.svelte';
	import TableSortingHeader from '$lib/components/table/tableSortingHeader.svelte';
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
	import { cubicOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';

	let incidents: IncidentGet[] | null = $state(null);

	let pageSize: number = 5;
	let cursorNext: number | null = $state(null);
	let loadingNextPage: boolean = $state(false);

	let search: string = $state('');
	let includeArchived: boolean = $state(false);

	let currentSortValue: string = $state('reportTime');
	let sortOrderAsc: boolean = $state(true);

	let params = $derived.by(() => {
		const paramsInitial = new URLSearchParams();

		paramsInitial.set('pageSize', pageSize.toString());

		const searchDerived = search;
		if (searchDerived.length !== 0) paramsInitial.set('search', searchDerived);

		const includeArchivedDerived = includeArchived;
		if (includeArchivedDerived) paramsInitial.set('includeArchived', 'true');

		const currentSortValueDerived = currentSortValue;
		paramsInitial.set('sortBy', currentSortValueDerived);
		const sortOrderAscDerived = sortOrderAsc;
		paramsInitial.set('sortAsc', sortOrderAscDerived.toString());

		return paramsInitial;
	});

	let searchDebounceTimer: NodeJS.Timeout;
	function debouncedSearchUpdate() {
		clearTimeout(searchDebounceTimer);
		searchDebounceTimer = setTimeout(() => {
			loadRecords();
		}, 500);
	}

	async function loadRecords() {
		incidents = null;

		const result = await IncidentAPIRoute.instance.getMany(params);
		if (!(await result.isOK())) {
			alert('Loading records failed.');
			incidents = [];
			return;
		}

		const moreInfo = await result.getMoreInfoParsed();
		incidents = moreInfo.data;

		cursorNext = moreInfo.pageInfo.cursorNext;
	}

	async function nextPage() {
		if (cursorNext === null) {
			alert('No other pages!');
			return;
		}

		loadingNextPage = true;

		const paramsInitial = params;
		paramsInitial.set('pageSize', pageSize.toString());
		paramsInitial.set('cursorId', cursorNext.toString());

		const result = await IncidentAPIRoute.instance.getMany(params);
		if (!(await result.isOK())) {
			alert('Loading further records failed.');
			return;
		}

		const moreInfo = await result.getMoreInfoParsed();
		incidents = [...(incidents ?? []), ...moreInfo.data];

		cursorNext = moreInfo.pageInfo.cursorNext;

		loadingNextPage = false;
	}

	function gotoIncidentView(id: number) {
		goto(`./report/${id}/view`);
	}

	onMount(() => {
		loadRecords();
	});
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
				<div class="d-flex flex-row w-100">
					<Input
						type="text"
						bind:value={search}
						on:input={debouncedSearchUpdate}
						placeholder="Enter search term..."
						class="h-100"
					/>
				</div>

				<div class="d-flex flex-row align-items-center w-25 ms-3">
					<Input type="checkbox" bind:checked={includeArchived} on:change={loadRecords} />
					<span class="m-0">Include Archived</span>
				</div>
			</div>
		</CardBody>
	</Card>

	<Card class="mt-3 shadow border">
		<CardHeader>
			<CardTitle>Report List</CardTitle>
			<CardSubtitle>
				<i>Click on a column name to sort by that column.</i>
			</CardSubtitle>
		</CardHeader>
		<CardBody>
			<Table bordered striped hover responsive>
				<thead>
					<tr class="table-primary align-items-center">
						<th>Action</th>

						{#if includeArchived}
							<TableSortingHeader
								displayName="Archived"
								sortValue="archived"
								bind:currentSortValue
								bind:sortOrderAsc
								onClick={loadRecords}
							/>
						{/if}
						<TableSortingHeader
							displayName="Name"
							sortValue="name"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
						<TableSortingHeader
							displayName="Category"
							sortValue="category"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
						<TableSortingHeader
							displayName="Barangay"
							sortValue="barangay"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
						<TableSortingHeader
							displayName="Report Time"
							sortValue="reportTime"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
						<TableSortingHeader
							displayName="Response Time"
							sortValue="responseTime"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
						<TableSortingHeader
							displayName="Fire Out Time"
							sortValue="fireOutTime"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
						<th>Causes</th>
						<th>Structures Involved</th>
						<TableSortingHeader
							displayName="Notes"
							sortValue="notes"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
						<TableSortingHeader
							displayName="Created By"
							sortValue="createdBy"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
						<TableSortingHeader
							displayName="Updated By"
							sortValue="updatedBy"
							bind:currentSortValue
							bind:sortOrderAsc
							onClick={loadRecords}
						/>
					</tr>
				</thead>

				{#if incidents === null}
					<Loading />
				{:else if incidents.length === 0}
					<h5>No results.</h5>
				{:else}
					<tbody transition:fly={{ y: 100, duration: 1000, easing: cubicOut }}>
						{#each incidents as incident}
							<tr class:table-danger={incident.archived}>
								<td class="text-center">
									<Button
										color="primary"
										class="m-0"
										on:click={() => gotoIncidentView(incident.id)}
									>
										<Icon name="arrow-up-right-square" />
									</Button>
								</td>

								{#if includeArchived}
									<td><DataDisplay data={incident.archived} boolFlipColors /></td>
								{/if}
								<td><DataDisplay data={incident.name} /></td>
								<td
									><DataDisplay
										data={`${incident.category.name} (${incident.category.severity})`}
									/></td
								>
								<td><DataDisplay data={incident.barangay.name} /></td>
								<td><DataDisplay data={incident.reportTime} /></td>
								<td><DataDisplay data={incident.responseTime} /></td>
								<td><DataDisplay data={incident.fireOutTime} /></td>
								<td><DataDisplay data={incident.causes.join(', ')} /></td>
								<td><DataDisplay data={incident.structuresInvolved.join(', ')} /></td>
								<td><DataDisplay data={incident.notes} /></td>
								<td><DataDisplay data={incident.createdBy.username} /></td>
								<td><DataDisplay data={incident.updatedBy.username} /></td>
							</tr>
						{/each}
					</tbody>
				{/if}
			</Table>

			{#if cursorNext !== null}
				<Button color="secondary" class="w-100" on:click={nextPage} disabled={loadingNextPage}>
					{#if loadingNextPage}
						<Loading />
					{:else}
						<Icon name="arrow-down-circle" />
						Load More
						<Icon name="arrow-down-circle" />
					{/if}
				</Button>
			{/if}
		</CardBody>
	</Card>
</div>
