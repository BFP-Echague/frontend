<script lang="ts">
	import { page } from "$app/state";
	import { IncidentAPIRoute, parseIdParam, type IncidentGet } from '$lib';
	import { error } from '@sveltejs/kit';
	import Loading from '$lib/components/display/loading.svelte';
	import { goto } from '$app/navigation';
	import IncidentView from "$lib/components/model/incident/incidentView.svelte";
	import { Button, Icon } from "@sveltestrap/sveltestrap";
	import MapViewSingle from "$lib/components/map/mapViewSingle.svelte";
	import GeneralHr from "$lib/components/generalHr.svelte";


	const id = parseIdParam(page.params.id);

	let incident: IncidentGet | null = $state(null);

	let mapViewSingle: MapViewSingle | null = $state(null);


	function edit() {
		goto("./edit");
	}

	async function onMapLoad() {
		const response = await IncidentAPIRoute.instance.get(id);
		if (!(await response.isOK())) {
			alert(`Cannot find incident with ID ${id}.`);
			error(404);
		}

		incident = await response.getMoreInfoParsed();
		if (mapViewSingle === null) return;
		await mapViewSingle.updateIncident(incident);
	}
</script>



<div class="d-flex flex-column w-100 h-100">
	<div class="d-flex flex-row w-100 px-4 py-3 justify-content-between align-items-center shadow-lg" style="height: 15%">
		<div class="d-flex w-100 justify-content-center">
			<h2 class="d-flex flex-row m-0 text-primary">
				<span>VIEWING INCIDENT:&MediumSpace;</span>
				{#if incident === null}
					<Loading />
				{:else}
					{ incident.name }
				{/if}
			</h2>
		</div>

		<div class="d-flex flex-row w-25">
			<Button color="secondary" class="m-0 w-100 shadow-lg" on:click={edit}>
				<Icon name="pencil" />
				<span class="ms-2"> Edit</span>
			</Button>
		</div>
	</div>

	<div class="d-flex flex-row w-100" style="height: 85%">
		<div class="d-flex flex-row w-100 h-100">
			<div class="d-flex w-100 h-100">
				<MapViewSingle bind:this={mapViewSingle} onReady={onMapLoad} />
			</div>

			<div class="w-30 h-100 ms-2 p-2 pt-4 overflow-auto">
				{#if incident === null}
					<Loading />
				{:else}
					<h2 class="text-center">Incident Details</h2>
					<GeneralHr />
					<IncidentView { incident } />
				{/if}
			</div>
		</div>
	</div>
</div>

