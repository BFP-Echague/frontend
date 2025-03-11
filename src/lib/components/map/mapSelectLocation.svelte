<script lang="ts">
	import { Loader } from "@googlemaps/js-api-loader";
    import Map from "./map.svelte";
	import { defaultLocation, importMapsLibrary, importMarkerLibrary, type DeepPartial, type Location } from "$lib";
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

    let map: google.maps.Map | null = $state(null);

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


    async function changeMarkerPosition(location: Location) {
        const markerLibrary = await importMarkerLibrary();
        const pinElement = new markerLibrary.PinElement({
            glyph: "+",
            glyphColor: "white"
        });

        if (marker === null) {
            marker = new markerLibrary.AdvancedMarkerElement({
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


    export function setCenterLocation(location: Location) {
        if (map === null) {
            throw new Error("Map is null");
        }

        map.setCenter({
            lat: location.latitude.toNumber(),
            lng: location.longitude.toNumber()
        });
    }


    $effect(() => {
        if (map === null) {
            return
        }

        map.addListener("click", (event: google.maps.MapMouseEvent) => {
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
    })
</script>


<div class="d-flex flex-column w-100 h-100">
    <Map bind:map { centerLocation }/>
    <div class="d-flex p-2 justify-content-center align-items-center bg-secondary">
        <strong class="m-0 text-light">Click on the map to select a location. Make sure that you are not on street view before selecting a location.</strong>
    </div>
</div>