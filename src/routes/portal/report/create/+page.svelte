<script lang="ts">
	import { env } from "$lib";
    import { Loader } from "@googlemaps/js-api-loader";
	import { onMount } from "svelte";


    let mapElement: HTMLDivElement;
    let mapsLoader: Loader | null = null;

    onMount(async () => {
        mapsLoader = new Loader({
            apiKey: env.GOOGLEMAPS_API_KEY_PUBLIC,
            version: "weekly"
        })

        const google = window.google;
        const { Map, InfoWindow } = await mapsLoader.importLibrary("maps");
        const { AdvancedMarkerElement } = await mapsLoader.importLibrary("marker");

        const map = new Map(mapElement, {
            zoom: 12,
            center: { lat: 34.84555, lng: -111.8035 },
            mapId: "4504f8b37365c3d0"
        });

        const marker = new AdvancedMarkerElement({
            map,
            position: { lat: 34.84555, lng: -111.8035 },
            title: "Binluan"
        });

        const infoWindow = new InfoWindow({
            content: "Hello World"
        });

        map.addListener("click", (event: google.maps.MapMouseEvent) => {
            marker.position = event.latLng;
        })

        marker.addListener("click", () => {
            infoWindow.open({ map }, marker);
        })
    })
</script>


<div class="d-flex flex-row w-100" style="position: relative; height: 50vh">
    <div class="w-100" bind:this={mapElement} style="height: 100%"></div>
</div>