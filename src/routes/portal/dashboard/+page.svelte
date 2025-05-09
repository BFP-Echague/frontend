<script lang="ts">
	import { defaultLocation, type IncidentGet } from "$lib";
	import { IncidentAPIRoute } from '$lib/api/incident';
	import MapViewMultiple from '$lib/components/map/mapViewMultiple.svelte';
	
	let mapViewMultiple: MapViewMultiple;
	let centerLocation = defaultLocation;


	async function loadIncidents() {
		const result = await IncidentAPIRoute.instance.getMany(new URLSearchParams({ pageSize: "100" }));
		if (!result.isOK()) {
			alert("Failed to load incidents");
			return;
		}

		let latestIncident: IncidentGet | null = null;

		const moreInfo = await result.getMoreInfoParsed();
		for (const incident of moreInfo.data) {
			await mapViewMultiple.addIncident(incident);

			if (incident.reportTime === null) continue;

			if (latestIncident === null || latestIncident.reportTime === null) {
				latestIncident = incident;
				continue;
			};

			if (incident.reportTime.getTime() > latestIncident.reportTime.getTime()) {
				latestIncident = incident;
			}
		}

		if (latestIncident === null) return;
		centerLocation = {
			latitude: latestIncident.location.latitude,
			longitude: latestIncident.location.longitude
		};
	}
</script>

<!-- Main Content -->
<div class="d-flex flex-column w-100 h-100">
	<div class="d-flex flex-column w-100 h-100">
		<MapViewMultiple bind:this={mapViewMultiple} { centerLocation } onReady={loadIncidents}/>
	</div>
</div>
