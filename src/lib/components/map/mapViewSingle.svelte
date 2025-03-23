<script lang="ts">
	import Map from "./map.svelte";
	import { mount, onMount, tick } from "svelte";
	import { CategoryAPIRoute, defaultLocation, importMapsLibrary, importMarkerLibrary, type CategoryGet, type IncidentGet, type Location } from "$lib";
	import MapIncidentInfoWindow from "./mapIncidentInfoWindow.svelte";
	import { Button, Card, Icon } from "@sveltestrap/sveltestrap";
	import Vr from "../vr.svelte";
	import Loading from "../display/loading.svelte";
    import chroma from "chroma-js";
	import { fly, slide } from "svelte/transition";
	import { cubicIn, expoIn, expoOut } from "svelte/easing";

    const markerImg = "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi3_hdpi.png";


    let {
        onReady = async () => {}
    }: {
        onReady?: () => Promise<void>;
    } = $props();

    let map: google.maps.Map | null = $state(null);
    let marker: google.maps.marker.AdvancedMarkerElement | null = null;

    let centerLocation: Location = $state(defaultLocation);


    export async function updateIncident(incident: IncidentGet | null) {
        if (marker !== null) {
            marker.map = null;
        }
        marker = null;

        if (incident === null) return;


        const mapsLibrary = await importMapsLibrary();
        const markerLibrary = await importMarkerLibrary();


        const pinElement = new markerLibrary.PinElement({
            borderColor: "black",
            scale: 1.25
        });

        const markerOptions: Omit<google.maps.marker.AdvancedMarkerElementOptions, "map"> = {
            position: { lat: incident.location.latitude.toNumber(), lng: incident.location.longitude.toNumber() },
            title: `Incident: ${incident.name}`,
            content: pinElement.element
        }

        const mapMarker = new markerLibrary.AdvancedMarkerElement({map, ...markerOptions});
        centerLocation = incident.location;

        google.maps.event.addListener(mapMarker, "click", () => {
            const infoWindow = new mapsLibrary.InfoWindow({
                headerContent: `Incident: ${incident.name}`,
                minWidth: 300
            });

            infoWindow.open({ map }, mapMarker);
        });
    }

    onMount(async () => {
        await onReady();
    });
</script>


<div class="position-relative w-100 h-100">
    <Map bind:map { centerLocation }/>
</div>