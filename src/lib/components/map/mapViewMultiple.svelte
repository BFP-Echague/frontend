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
        centerLocation = defaultLocation,
        referenceDate = new Date(),
        timeRange = 2 * 31 * 24 * 60 * 60 * 1000,
        onReady = async () => {}
    }: {
        centerLocation?: Location;
        referenceDate?: Date;
        timeRange?: number;
        onReady?: () => Promise<void>;
    } = $props();

    let map: google.maps.Map | null = $state(null);
    let infoWindow: google.maps.InfoWindow | null = null;
    let markers: google.maps.marker.AdvancedMarkerElement[] = [];

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


    let isLegendOpen = $state(true);


    export async function addIncident(incident: IncidentGet) {
        const mapsLibrary = await importMapsLibrary();
        const markerLibrary = await importMarkerLibrary();

        if (categoryMappings === null) throw new Error("please put stuff in the onReady function when using mapViewMultiple.");


        const reportTimeCloseness = incident.reportTime !== null 
            ? 1 - (
                Math.min(
                    Math.abs(incident.reportTime.getTime() - referenceDate.getTime()),
                    timeRange
                ) / timeRange
            )
            : 1;

        const categoryColorChroma = chroma(categoryMappings.find(x => x.id === incident.categoryId)?.color ?? "blue");
        const categoryColorDarken = categoryColorChroma.set("hsl.l", categoryColorChroma.get("hsl.l") - 0.15)

        const pinElement = new markerLibrary.PinElement({
            background: categoryColorChroma.hex(),
            glyphColor: categoryColorDarken.hex(),
            borderColor: "black",
            scale: cubicIn(reportTimeCloseness) * 2 + 1
        });


        const markerOptions: Omit<google.maps.marker.AdvancedMarkerElementOptions, "map"> = {
            position: { lat: incident.location.latitude.toNumber(), lng: incident.location.longitude.toNumber() },
            title: `Incident: ${incident.name}`,
            zIndex: Math.trunc(reportTimeCloseness * 2048),
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


    function toggleLegend() {
        isLegendOpen = !isLegendOpen;
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


{#snippet legendArrow()}
    <h4 class="m-0 mx-3 text-light">
        {#if isLegendOpen}
            <Icon name="chevron-down" />
        {:else}
            <Icon name="chevron-up" />
        {/if}
    </h4>
{/snippet}


<div class="position-relative w-100 h-100">
    <Map bind:map { centerLocation }/>
    <div class="position-absolute top-0 pointer-event-none d-flex w-100 h-100">
        <div class="d-flex flex-column w-100 h-100 justify-content-end align-items-center">
            <div class="pointer-event-all d-flex flex-column align-items-center">
                <Button color="secondary" class="d-flex flex-row justify-content-center align-items-center" on:click={toggleLegend}>
                    {@render legendArrow()} Legend {@render legendArrow()}
                </Button>

                {#if isLegendOpen}
                    <div class="d-flex" transition:slide={{ easing: expoOut, duration: 500, axis: "y"}}>
                        <Card class="d-flex flex-column mb-1 p-2 shadow-lg border-5">   
                            <div class="d-flex flex-row mt-2">
                                <div class="d-flex flex-row align-items-center">
                                    <div class="d-flex flex-column h-100 align-items-center text-center">
                                        <div class="d-flex h-100 align-items-center">
                                            <div style="height: 20px">
                                                <img src={markerImg} height="20" alt="Least Recent Icon" />
                                            </div>
                                        </div>
                                        <p class="m-0">Past</p>
                                    </div>
    
                                    <div class="d-flex h-100 pb-3 align-items-center">
                                        - - - - -
                                    </div>
    
                                    <div class="d-flex flex-column h-100 align-items-center text-center">
                                        <div class="d-flex h-100 align-items-center">
                                            <div style="height: 40px">
                                                <img src={markerImg} height="40" alt="Least Recent Icon" />
                                            </div>
                                        </div>
                                        <p class="m-0">Recent</p>
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
                {/if}
            </div>
        </div>
    </div>
</div>