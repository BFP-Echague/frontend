<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatDate, handlePossibleZodError, IncidentAPIRoute, zodDate, type CategoryGet, type IncidentGet } from '$lib';
	import DataDisplay from '$lib/components/display/dataDisplay.svelte';
	import Loading from '$lib/components/display/loading.svelte';
	import GeneralHr from '$lib/components/generalHr.svelte';
	import TableSortingHeader from '$lib/components/table/tableSortingHeader.svelte';
	import Vr from '$lib/components/vr.svelte';
	import {
		Button,
		Input,
		Table,
		Card,
		CardBody,
		CardHeader,
		CardTitle,
		CardSubtitle,
		Icon,
		Label,
		FormGroup
	} from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { z } from 'zod';
	import { jsPDF } from 'jspdf';
	import { autoTable } from 'jspdf-autotable';

	let incidents: IncidentGet[] | null = $state(null);

	let pageSize: number = $state(5);
	let cursorNext: number | null = $state(null);
	let loadingNextPage: boolean = $state(false);

	let search: string = $state('');
	let searchDebounceTimer: NodeJS.Timeout;

	let includeArchived: boolean = $state(false);

	let dateRangeValidateSchema = zodDate.optional();
	let dateMinRaw: string = $state("");
	let dateMin = $derived(dateMinRaw !== "" ? dateRangeValidateSchema.safeParse(dateMinRaw).data ?? null : null)
	let dateMaxRaw: string = $state("");
	let dateMax = $derived(dateMaxRaw !== "" ? dateRangeValidateSchema.safeParse(dateMaxRaw).data ?? null : null)

	let categoryChoices: CategoryGet[] | null = $state(null);
	let categoryChoice: CategoryGet | null = $state(null);


	let currentSortValue: string = $state('reportTime');
	let sortOrderAsc: boolean = $state(true);

	let params = $derived.by(() => {
		const paramsInitial = new URLSearchParams();

		paramsInitial.set('pageSize', pageSize.toString());

		const searchDerived = search;
		if (searchDerived.length !== 0) paramsInitial.set('search', searchDerived);

		const includeArchivedDerived = includeArchived;
		if (includeArchivedDerived) paramsInitial.set('includeArchived', 'true');

		const dateMinDerived = dateMin;
		if (dateMinDerived !== null) paramsInitial.set('dateMin', dateMinDerived.toISOString());
		const dateMaxDerived = dateMax;
		if (dateMaxDerived !== null) paramsInitial.set('dateMax', dateMaxDerived.toISOString());

		const currentSortValueDerived = currentSortValue;
		paramsInitial.set('sortBy', currentSortValueDerived);
		const sortOrderAscDerived = sortOrderAsc;
		paramsInitial.set('sortAsc', sortOrderAscDerived.toString());

		return paramsInitial;
	});

	let exportAmountOfIncidents: string | undefined = $state('');
	let exportValidateSchema = z.coerce.number().int().positive().min(1).max(500);

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

	async function getIncidentsExport() {
		let pageSize: number;
		try {
			pageSize = exportValidateSchema.parse(exportAmountOfIncidents);
		} catch (e) {
			if (handlePossibleZodError(e)) throw new Error('Invalid amount of incidents.');
			throw e;
		}

		const paramsDerived = params;
		paramsDerived.set('pageSize', pageSize.toString());

		const result = await IncidentAPIRoute.instance.getMany(paramsDerived);
		if (!(await result.isOK())) {
			alert('Finding records failed.');
			throw new Error('Finding records failed.');
		}

		return (await result.getMoreInfoParsed()).data;
	}

	async function getFormattedIncidentsExport() {
		const incidents = await getIncidentsExport();

		const headerCamel = [
			'no',
			'archived',
			'name',
			'category_name',
			'category_severity',
			'loc_latitude',
			'loc_longitude',
			'barangay_name',
			'report_time',
			'response_time',
			'fire_out_time',
			'causes',
			'structures_involved',
			'notes',
			'created_by_username',
			'updated_by_username'
		];

		const headerProper = [
			'No',
			'Archived',
			'Name',
			'Category Name',
			'Category Severity',
			'Latitude',
			'Longitude',
			'Barangay',
			'Report Time',
			'Response Time',
			'Fire Out Time',
			'Causes',
			'Structures Involved',
			'Notes',
			'Created By',
			'Updated By'
		];

		const none = '<No Value>';
		const rows = incidents.map((x, idx) => {
			return [
				idx + 1,
				x.archived,
				x.name,
				x.category.name,
				x.category.severity,
				x.location.latitude.toString(),
				x.location.longitude.toString(),
				x.barangay.name,
				x.reportTime ? formatDate(x.reportTime) : none,
				x.responseTime ? formatDate(x.responseTime) : none,
				x.fireOutTime ? formatDate(x.fireOutTime) : none,
				x.causes.length !== 0 ? x.causes.join(', ') : none,
				x.structuresInvolved.length !== 0 ? x.structuresInvolved.join(', ') : none,
				x.notes ?? none,
				x.createdBy.username,
				x.updatedBy.username
			];
		});

		return { headerCamel, headerProper, rows };
	}

	async function exportToCSV() {
		const incidentsExport = await getFormattedIncidentsExport();

		const rows = [incidentsExport.headerCamel, ...incidentsExport.rows];

		const content = 'data:text/csv;charset=utf-8,' + rows.map((x) => x.join(',')).join('\n');
		const encodedUri = encodeURI(content);
		window.open(encodedUri);
	}

	async function exportToPDF() {
		const incidentsExport = await getFormattedIncidentsExport();

		const docWidth = 297;
		const docHeight = 210;

		const doc = new jsPDF('landscape', 'mm', [docHeight, docWidth]);
		autoTable(doc, {
			styles: {
				fontSize: 7,
				cellWidth: 'auto'
			},
			head: [incidentsExport.headerProper],
			body: incidentsExport.rows,

			didDrawPage: (data) => {
				const pageCount = doc.getNumberOfPages();
				const x = 10;
				const y = docHeight - 10;
				doc.setFontSize(5);
				for (let i = 1; i <= pageCount; i++) {
					doc.setPage(i);
					doc.text(
						`Page ${i} of ${pageCount}\n` +
							`Sorted by: ${currentSortValue} | Ascending: ${sortOrderAsc}\n` +
							`Search Term: ${search.length !== 0 ? `"${search}"` : '<None>'} | Include Archived: ${includeArchived}\n` +
							`Requested Incidents: ${exportAmountOfIncidents} | Received incidents: ${incidentsExport.rows.length} | Date Generated: ${formatDate(new Date())}`,
						x,
						y
					);
				}
			}
		});

		doc.save('incidents.pdf');
	}

	onMount(() => {
		loadRecords();
	});
</script>

<div class="d-flex flex-column mt-3 p-5">
	<div class="d-flex w-100 justify-content-center">
		<h1 class="text-primary">FIRE INCIDENT DATABASE</h1>
	</div>

	<div class="d-flex flex-row justify-content-center w-100 mt-3">
		<Card class="w-75 shadow border">
			<CardHeader>
				<CardTitle>Filter Settings</CardTitle>
			</CardHeader>
			<CardBody>
				<div class="d-flex flex-column w-100">
					<div class="d-flex flex-column w-100">
						<div class="d-flex flex-row w-100">
							<div class="d-flex flex-row w-100">
								<FormGroup class="w-100">
									<Label for="search">Search</Label>
									<Input
										type="text"
										bind:value={search}
										on:input={debouncedSearchUpdate}
										placeholder="Enter search term..."
									/>
								</FormGroup>
							</div>

							<div class="d-flex flex-row justify-content-center align-items-center w-25 ms-3">
								<Input type="checkbox" bind:checked={includeArchived} on:change={loadRecords} />
								<span class="m-0">Include Archived</span>
							</div>
						</div>
					</div>

					<GeneralHr />

					<div class="d-flex flex-row w-100">
						<div class="d-flex flex-column w-100">
							<h3>Date Filter</h3>
							<div class="d-flex flex-row">
								<FormGroup>
									<Label for="dateMin">From</Label>
									<Input type="datetime-local" bind:value={dateMinRaw} on:change={loadRecords} />
								</FormGroup>

								<FormGroup class="ms-2">
									<Label for="dateMax">To</Label>
									<Input type="datetime-local" bind:value={dateMaxRaw} on:change={loadRecords} />
								</FormGroup>
							</div>
						</div>
						
						<div class="d-flex w-100">
							<FormGroup>
								<Label for="category">Category</Label>
								<Input type="datetime-local" bind:value={dateMinRaw} on:change={loadRecords} />
							</FormGroup>
						</div>
					</div>
					
					<div class="d-flex flex-column w-30">
						<FormGroup>
							<Label for="pageSize">Page Size</Label>
							<Input type="select" bind:value={pageSize} on:change={loadRecords}>
								{#each [5, 10, 15, 20, 30, 40, 50] as size}
									<option value={size}>{size}</option>
								{/each}
							</Input>
						</FormGroup>
					</div>
				</div>
			</CardBody>
		</Card>
	</div>

	<Card class="mt-3 shadow border">
		<CardHeader>
			<CardTitle>Report List</CardTitle>
			<CardSubtitle>
				<i>Click on a column name to sort by that column.</i>
			</CardSubtitle>
		</CardHeader>
		<CardBody>
			<Table bordered striped size="sm" responsive>
				<thead>
					<tr class="table-primary align-items-center">
						<th class="p-0"></th>
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
						{#each incidents as incident, idx}
							<tr class:table-danger={incident.archived}>
								<td>{idx + 1}</td>

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
								<td class="text-bold"><DataDisplay data={incident.name} /></td>
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

	<div class="d-flex flex-row justify-content-center">
		<Card class="mt-3 w-50 shadow border">
			<CardHeader>
				<CardTitle>Export</CardTitle>
				<CardSubtitle>
					<i
						>Use the filters to filter the results and click on column headers to set the sorting
						order.</i
					>
				</CardSubtitle>
			</CardHeader>
			<CardBody>
				<div class="d-flex flex-column w-100">
					<FormGroup>
						<Label for="reportAmount">Amount of Reports</Label>
						<Input
							type="number"
							id="reportAmount"
							placeholder="Input amount of reports to export..."
							bind:value={exportAmountOfIncidents}
						/>
					</FormGroup>

					<div class="d-flex flex-row w-100">
						<Button color="success" class="w-100" on:click={exportToCSV}>
							<Icon name="file-code" />
							Export to CSV
						</Button>
						<Button color="primary" class="w-100 ms-2" on:click={exportToPDF}>
							<Icon name="file-bar-graph" />
							Export to PDF
						</Button>
					</div>
				</div>
			</CardBody>
		</Card>
	</div>
</div>

<style>
	td {
		word-break: break-word;
	}
</style>
