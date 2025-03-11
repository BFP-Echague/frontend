<script lang="ts">
	// Sveltestrap Components
	import { page } from "$app/state";
	import { defaultLocation, IncidentAPIRoute, parseIdParam, type IncidentGet } from '$lib';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import Loading from '$lib/components/display/loading.svelte';
	import { goto } from '$app/navigation';
	import MapView from '$lib/components/map/mapView.svelte';
	import IncidentView from "$lib/components/model/incident/incidentView.svelte";
	import { Card, CardHeader, CardTitle, CardBody, Button, Icon } from "@sveltestrap/sveltestrap";


	const id = parseIdParam(page.params.id);

	let incident: IncidentGet | null = $state(null);

	let mapView: MapView | null = $state(null);


	function edit() {
		goto("./edit");
	}

	onMount(async () => {
		const response = await IncidentAPIRoute.instance.get(id);
		if (!(await response.isOK())) {
			alert(`Cannot find incident with ID ${id}.`);
			error(404);
		}

		incident = await response.getMoreInfoParsed();
	})

	$effect(() => {
		const incidentDerived = incident;
		if (incidentDerived === null) return;

		if (mapView === null) return;

		mapView.deleteAllMarkers();
		mapView.addIncident(incidentDerived);
	})
</script>


{#if incident === null}
	<Loading />
{:else}
	<div class="d-flex flex-column w-100 h-100">
		<div class="position-absolute d-flex flex-row w-100 mt-2 justify-content-center align-items-center" style="z-index: 1000">
			<div>
				<Card class="px-4 py-3 shadow-lg">
					<h2 class="text-primary">VIEWING INCIDENT: { incident.name }</h2>
				</Card>
			</div>

			<div class="ms-2 h-100">
				<Button color="secondary" class="m-0 h-100 shadow-lg" size="lg" on:click={edit}>
					<Icon name="pencil" />
					<span> Edit</span>
				</Button>
			</div>
		</div>

		<div class="d-flex flex-row w-100 h-100">
			<div class="d-flex w-100 h-100">
				<MapView bind:this={mapView} centerLocation={incident?.location ?? defaultLocation}/>
			</div>

			<div class="d-flex w-20 h-100 ms-2 overflow-auto">
				<Card class="mt-3">
					<CardHeader>
						<CardTitle>Incident Report</CardTitle>
					</CardHeader>
					<CardBody>
						{#if incident === null}
							<Loading />
						{:else}
							<IncidentView { incident } />
						{/if}
					</CardBody>
				</Card>
			</div>
		</div>
	</div>
{/if}