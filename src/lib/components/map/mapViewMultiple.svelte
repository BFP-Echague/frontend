<script lang="ts">
	import Map from "./map.svelte";
	import { mount, onMount, tick } from "svelte";
	import { CategoryAPIRoute, defaultLocation, importMapsLibrary, importMarkerLibrary, type CategoryGet, type IncidentGet, type Location } from "$lib";
	import MapIncidentInfoWindow from "./mapIncidentInfoWindow.svelte";
	import { Card, Icon } from "@sveltestrap/sveltestrap";
	import Vr from "../vr.svelte";
	import Loading from "../display/loading.svelte";
    import chroma from "chroma-js";

    const markerImg = "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi3_hdpi.png";


    let {
        centerLocation = defaultLocation,
        onReady = async () => {}
    }: {
        centerLocation: Location;
        onReady?: () => Promise<void>
    } = $props();

    let map: google.maps.Map | null = $state(null);

    let infoWindow: google.maps.InfoWindow | null = null;

    let categories: CategoryGet[] | null = $state(null);
    let categoryMappings = $derived.by(() => {
        const categoriesDerived = categories;
        if (categoriesDerived === null) return null;

        const colors = chroma.scale(["lime", "yellow", "red"]).colors(categoriesDerived.length)
        return categoriesDerived.map((x, idx) => ({
            color: colors[idx],
            id: x.id
        }))
    })

    let markers: google.maps.marker.AdvancedMarkerElement[] = [];



    export async function addIncident(incident: IncidentGet) {
        const mapsLibrary = await importMapsLibrary();
        const markerLibrary = await importMarkerLibrary();

        if (categoryMappings === null) throw new Error("please put stuff in the onReady function when using mapViewMultiple.");


        const categoryColor = categoryMappings.find(x => x.id === incident.categoryId)?.color ?? "blue";
        const categoryColorChroma = chroma(categoryColor);
        const categoryColorDarken = categoryColorChroma.set("hsl.l", categoryColorChroma.get("hsl.l") - 0.15).hex()

        const pinElement = new markerLibrary.PinElement({
            background: categoryColor,
            glyphColor: categoryColorDarken,
            borderColor: "black",
            scale: 1.25
        });


        const markerOptions: Omit<google.maps.marker.AdvancedMarkerElementOptions, "map"> = {
            position: { lat: incident.location.latitude.toNumber(), lng: incident.location.longitude.toNumber() },
            title: `Incident: ${incident.name}`,
            content: pinElement.element
        }

        const mapMarker = new markerLibrary.AdvancedMarkerElement({map, ...markerOptions});

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
            marker.map = null;
        });

        markers = [];
    }


    onMount(async () => {
        const categoriesResult = await CategoryAPIRoute.instance.getMany();
        if (!(await categoriesResult.isOK())) {
            alert("Failed to fetch categories.");
            return;
        }

        categories = (await categoriesResult.getMoreInfoParsed()).sort((a, b) => a.severity - b.severity);

        await onReady();
    });
</script>



<div class="position-relative w-100 h-100">
    <Map bind:map { centerLocation }/>
    <div class="position-absolute top-0 pointer-event-none d-flex w-100 h-100">
        <div class="d-flex flex-column w-100 h-100 justify-content-end align-items-center">
            <Card class="pointer-event-all d-flex flex-column mb-1 p-2 shadow-lg border-5">
                <div class="d-flex w-100 justify-content-center">
                    <h6 class="m-0">Legend</h6>
                </div>

                <div class="d-flex flex-row mt-2">
                    <div class="d-flex flex-row align-items-center">
                        <div class="d-flex flex-column align-items-center text-center">
                            <img src={markerImg} width="30" style="opacity: 0.25;" alt="Least Recent Icon" />
                            <p class="m-0">Least<br>Recent</p>
                        </div>

                        <div class="d-flex h-100 align-items-start">
                            - - - - -
                        </div>

                        <div class="d-flex flex-column align-items-center text-center">
                            <img src={markerImg} width="30" alt="Most Recent Icon" />
                            <p class="m-0">Most<br>Recent</p>
                        </div>
                    </div>

                    <Vr />

                    <div class="d-flex flex-column h-100 justify-content-center">
                        {#if categories === null}
                            <Loading />
                        {:else}
                            {#each categories as category}
                                <div class="d-flex flex-row">
                                    <p class="m-0" style={`color: ${categoryMappings?.find(x => x.id === category.id)?.color ?? "blue"}`}>
                                        <Icon name="square-fill" />
                                    </p>

                                    <p class="m-0 mx-2">{ category.name }</p>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>
            </Card>
        </div>
    </div>
</div>