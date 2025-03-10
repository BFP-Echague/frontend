<script lang="ts">
	import { Loader } from "@googlemaps/js-api-loader";
    import Map from "./map.svelte";
	import { defaultLocation, type DeepPartial, type Location } from "$lib";
	import { onMount } from "svelte";
	import Decimal from "decimal.js";

    let {
        centerLocation = defaultLocation,
        pickedLocation = $bindable({ latitude: undefined, longitude: undefined })
    }: {
        centerLocation: Location,
        pickedLocation: {
            latitude: number | undefined,
            longitude: number | undefined
        }
    } = $props();

    let mapsLoader: Loader | null = $state(null);
    let map: google.maps.Map | null = $state(null);


    let AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement | null = null;
    let PinElement: typeof google.maps.marker.PinElement | null = null;
    let marker: google.maps.marker.AdvancedMarkerElement | null = null;



    $effect(() => {
        const resultDerived = pickedLocation;
        if (resultDerived.latitude === undefined || resultDerived.longitude === undefined) {
            clearMarker();
            return;
        }

        changeMarkerPosition({
            latitude: new Decimal(resultDerived.latitude),
            longitude: new Decimal(resultDerived.longitude)
        });
    })

    function clearMarker() {
        if (marker !== null) {
            marker.remove();
            marker = null;
        }
    }


    function changeMarkerPosition(location: Location) {
        if (AdvancedMarkerElement === null || PinElement === null) {
            throw new Error("AdvancedMarkerElement or PinElement is null");
        }

        const pinElement = new PinElement({
            glyph: "+",
            glyphColor: "white"
        });

        if (marker === null) {
            marker = new AdvancedMarkerElement({
                map,
                position: {
                    lat: location.latitude.toNumber(),
                    lng: location.longitude.toNumber()
                },
                content: pinElement.element
            });
        }
        else {
            marker.position = {
                lat: location.latitude.toNumber(),
                lng: location.longitude.toNumber()
            };
        }
    }


    async function load(mapsLoaderDerived: Loader, mapDerived: google.maps.Map) {
        const markerLoad = await mapsLoaderDerived.importLibrary("marker");

        AdvancedMarkerElement = markerLoad.AdvancedMarkerElement;
        PinElement = markerLoad.PinElement;

        mapDerived.addListener("click", (event: google.maps.MapMouseEvent) => {
            if (event.latLng === null) {
                return;
            }

            changeMarkerPosition({
                latitude: new Decimal(event.latLng.lat()),
                longitude: new Decimal(event.latLng.lng())
            });

            pickedLocation = {
                latitude: event.latLng.lat(),
                longitude: event.latLng.lng()
            };
        })
    }

    $effect(() => {
        const mapsLoaderDerived = mapsLoader;
        const mapDerived = map;

        if (mapsLoaderDerived === null || mapDerived === null) {
            return;
        }

        load(mapsLoaderDerived, mapDerived).then();
    })


    export function setCenterLocation(location: Location) {
        if (map === null) {
            throw new Error("Map is null");
        }

        map.setCenter({
            lat: location.latitude.toNumber(),
            lng: location.longitude.toNumber()
        });
    }
</script>


<Map bind:map { centerLocation }/>