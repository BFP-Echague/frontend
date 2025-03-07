<script lang="ts">
	import { env } from "$lib/env";
	import { defaultLocation, type Location } from "$lib";
	import { Loader } from "@googlemaps/js-api-loader";
	import Decimal from "decimal.js";
	import { onMount } from "svelte";


    let {
        mapsLoader = $bindable(null),
        map = $bindable(null),
        centerLocation = defaultLocation
    }: {
        mapsLoader: Loader | null,
        map: google.maps.Map | null,
        centerLocation: Location
    } = $props();
    let mapElement: HTMLDivElement | null = null;

    onMount(async () => {
        mapsLoader = new Loader({
            apiKey: env.GOOGLEMAPS_API_KEY_PUBLIC,
            version: "weekly"
        })

        const { Map } = await mapsLoader.importLibrary("maps");


        if (mapElement === null) {
            throw new Error("mapElement is null");
        }

        map = new Map(mapElement, {
            zoom: 15,
            center: { lat: centerLocation.latitude.toNumber(), lng: centerLocation.longitude.toNumber() },
            mapId: env.GOOGLEMAPS_MAPID
        });
    })
</script>



<div class="d-flex flex-row w-100 position-relative" style="height: 90vh">
    <div class="w-100 h-100" bind:this={mapElement}></div>
</div>