<script lang="ts">
	import Map from "./map.svelte";
	import { mount, onMount } from "svelte";
	import { defaultLocation, importMapsLibrary, importMarkerLibrary, type IncidentGet, type Location } from "$lib";
	import MapIncidentInfoWindow from "./mapIncidentInfoWindow.svelte";

    let {
        centerLocation = defaultLocation
    }: {
        centerLocation: Location
    } = $props();

    let map: google.maps.Map | null = $state(null);

    let infoWindow: google.maps.InfoWindow | null = null;


    let markers: google.maps.Marker[] = [];

    export async function addIncident(incident: IncidentGet) {
        const mapsLibrary = await importMapsLibrary();
        const markerLibrary = await importMarkerLibrary();


        const markerOptions: Omit<google.maps.MarkerOptions, "map"> = {
            position: { lat: incident.location.latitude.toNumber(), lng: incident.location.longitude.toNumber() },
            title: `Incident: ${incident.name}`
        }

        const mapMarker = new markerLibrary.Marker({map, ...markerOptions});

        google.maps.event.addListener(mapMarker, "click", () => {
            if (infoWindow !== null) {
                infoWindow.close();
            }


            const content = document.createElement('div');
            mount(MapIncidentInfoWindow, { target: content, props: { incident: incident } })

            infoWindow = new mapsLibrary.InfoWindow({
                content,
                headerContent: `Incident: ${incident.name}`,
                minWidth: 300
            });

            infoWindow.open({ map }, mapMarker);
        });

        markers.push(mapMarker);
    }


    export async function deleteAllMarkers() {
        markers.forEach(marker => {
            marker.setMap(null);
        });

        markers = [];
    }
</script>

<div class="w-100 h-100">
    <Map bind:map { centerLocation }/>
</div>