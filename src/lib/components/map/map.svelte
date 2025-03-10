<script lang="ts">
	import { env } from "$lib/env";
	import { defaultLocation, importMapsLibrary, type Location } from "$lib";
	import { Loader } from "@googlemaps/js-api-loader";
	import { onMount } from "svelte";


    let {
        map = $bindable(null),
        centerLocation = defaultLocation
    }: {
        map?: google.maps.Map | null,
        centerLocation: Location
    } = $props();

    let mapElement: HTMLDivElement | null = null;

    onMount(async () => {
        if (mapElement === null) {
            throw new Error("mapElement is null");
        }

        const mapsLibrary = await importMapsLibrary();

        map = new mapsLibrary.Map(mapElement, {
            zoom: 15,
            center: { lat: centerLocation.latitude.toNumber(), lng: centerLocation.longitude.toNumber() },
            mapId: env.GOOGLEMAPS_MAPID
        });
    })
</script>


<div class="d-flex flex-row w-100 position-relative" style="height: 90vh">
    <div class="w-100 h-100" bind:this={mapElement}></div>
</div>