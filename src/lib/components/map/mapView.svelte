<script lang="ts">
	import type { Loader } from "@googlemaps/js-api-loader";
	import Map from "./map.svelte";
	import { mount, onMount } from "svelte";
	import { defaultLocation, type IncidentGet, type Location } from "$lib";
	import MapIncidentInfoWindow from "./mapIncidentInfoWindow.svelte";

    let {
        centerLocation = defaultLocation
    }: {
        centerLocation: Location
    } = $props();

    let mapsLoader: Loader | null = $state(null);
    let map: google.maps.Map | null = $state(null);

    let AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement | null = null;
    let InfoWindow: typeof google.maps.InfoWindow | null = null;
    let infoWindow: google.maps.InfoWindow | null = null;

    export async function addIncident(incident: IncidentGet) {
        if (AdvancedMarkerElement === null) {
            throw new Error("AdvancedMarker is null");
        }

        const marker = new AdvancedMarkerElement({
            map,
            position: { lat: incident.location.latitude.toNumber(), lng: incident.location.longitude.toNumber() },
            title: `Incident: ${incident.name}`
        });

        google.maps.event.addListener(marker, "click", () => {
            if (InfoWindow === null) {
                throw new Error("InfoWindow is null");
            }

            if (infoWindow !== null) {
                infoWindow.close();
            }


            const content = document.createElement('div');
            mount(MapIncidentInfoWindow, { target: content, props: { incident: incident } })

            infoWindow = new InfoWindow({
                content,
                headerContent: `Incident: ${incident.name}`
            });

            infoWindow.open({ map }, marker);
        })
    }

    onMount(async () => {
        if (mapsLoader === null) {
            throw new Error("mapsLoader is null");
        }

        const mapsLoad = await mapsLoader.importLibrary("maps");
        const markerLoad = await mapsLoader.importLibrary("marker");

        InfoWindow = mapsLoad.InfoWindow;
        AdvancedMarkerElement = markerLoad.AdvancedMarkerElement;
    })
</script>

<Map bind:mapsLoader bind:map { centerLocation }/>