<script lang="ts">
	import {
		Card,
		CardBody,
		CardTitle,
		Icon
	} from '@sveltestrap/sveltestrap';
	import { defaultLocation } from "$lib";
	import { IncidentAPIRoute } from '$lib/api/incident';
	import MapView from '$lib/components/map/mapView.svelte';
	import { onMount } from 'svelte';

	let mapView: MapView;
	let centerLocation = defaultLocation;


	onMount(async () => {
		const result = await IncidentAPIRoute.instance.getMany(new URLSearchParams({ pageSize: "100" }));
		if (!result.isOK()) {
			alert("Failed to load incidents");
			return;
		}

		const moreInfo = await result.getMoreInfoParsed();
		for (const incident of moreInfo.data) {
			await mapView.addIncident(incident);
		}
	});
</script>

<!-- Main Content -->
<div class="d-flex flex-column">
	<!-- Left Section: Map and Results -->
	<Card class="mb-4 shadow">
		<CardBody>
			<CardTitle class="text-primary fs-3">
				<h3 class="d-inline">
					<Icon name="map" class="me-2" /> Fire Incident Map
				</h3>
			</CardTitle>
			<MapView bind:this={mapView} { centerLocation }/>
		</CardBody>
	</Card>
</div>
