<script lang="ts">
	import Map from "./map.svelte";
	import { defaultLocation, importMarkerLibrary, importPlacesLibrary, type Location } from "$lib";
	import Decimal from "decimal.js";
	import { Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Icon, Input, Label } from "@sveltestrap/sveltestrap";

    let {
        centerLocation = $bindable(defaultLocation),
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

    let placeSearch = $state("");
    let autocompletePredictions: google.maps.places.AutocompletePrediction[] | null = $state(null);
    let placeSearchResultDescription: string | null = $state(null);
    let sessionToken: google.maps.places.AutocompleteSessionToken | null = null;

    let searchDebounceTimer: NodeJS.Timeout;
    let dropdownIsOpen: boolean = $state(false);

    function onSearchFocus() { dropdownIsOpen = true; }
	function onSearchBlur() {
        if (placeSearch === "")
            dropdownIsOpen = false;
    }

    async function getSessionToken() {
        if (sessionToken === null) {
            const placesImport = await importPlacesLibrary();
            sessionToken = new placesImport.AutocompleteSessionToken();
        }
        return sessionToken;
    }

    function debouncedSearchUpdate() {
		clearTimeout(searchDebounceTimer);

        autocompletePredictions = null;

		searchDebounceTimer = setTimeout(() => {
			onAutocompleteFind();
		}, 100);
	}

    $effect(() => {
        const placeSearchDerived = placeSearch;
        if (placeSearchDerived === "") {
            autocompletePredictions = null;
            return;
        }

        debouncedSearchUpdate();
    })

    async function onAutocompleteFind() {
        const placesImport = await importPlacesLibrary();
        const service = new placesImport.AutocompleteService();

        const request: google.maps.places.AutocompleteRequest = {
            input: placeSearch,
            sessionToken: await getSessionToken()
        }

        await service.getPlacePredictions(request, (predictions, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.log("Places autocomplete cannot be accessed.");
                console.log(status);
                return;
            }

            autocompletePredictions = predictions;
        });
    }

    async function performPlaceSearch(placeId: string) {
        const placesImport = await importPlacesLibrary();
        const place = new placesImport.Place({
            id: placeId,
            requestedLanguage: "en"
        });

        await place.fetchFields({
            fields: ["location", "formattedAddress"]
        });

        if (place.location === null || place.location === undefined) {
            alert(`Cannot get location of place with placeId ${placeId}.`)
            return;
        }

        if (place.formattedAddress === null || place.formattedAddress === undefined) {
            alert(`Cannot get formattedAddress of place with placeId ${placeId}.`)
            return;
        }

        centerLocation = {
            latitude: new Decimal(place.location.lat()),
            longitude: new Decimal(place.location.lng())
        }
        placeSearchResultDescription = place.formattedAddress

        placeSearch = "";
        dropdownIsOpen = false;
    }


    async function onPlaceSubmit() {
        if (autocompletePredictions === null) return;
        await performPlaceSearch(autocompletePredictions[0].place_id)
    }



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
        centerLocation = location;
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
    <div class="position-relative d-flex w-100 h-100">
        <Map bind:map bind:centerLocation />

        <div class="position-absolute pointer-event-none w-100 h-100">
            <div class="d-flex flex-column w-100 h-100 justify-content-end align-items-center">
                <div class="pointer-event-all d-flex w-25 mb-2">
                    <Card class="w-100 p-2">
                        <Form on:submit={onPlaceSubmit}>
                            <FormGroup class="w-100">
                                <Label for="search">Search Map</Label>
                                <Dropdown isOpen={dropdownIsOpen} toggle={() => {}} direction="up">
                                    <DropdownToggle tag="div" class="d-inline-block w-100">
                                        <Input type="search" class="w-100" bind:value={placeSearch} on:focus={onSearchFocus} on:blur={onSearchBlur} />
                                    </DropdownToggle>
                                    <DropdownMenu class="z-98">
                                        {#if autocompletePredictions === null}
                                            <DropdownItem disabled>
                                                <i>Start typing to search the map</i>
                                            </DropdownItem>
                                        {:else}
                                            <DropdownItem header>Select a place to jump to that location. Enter to select the first place.</DropdownItem>
                                            {#each autocompletePredictions as prediction}
                                                <DropdownItem on:click={() => performPlaceSearch(prediction.place_id)}>
                                                    <Icon name="pin-map-fill" />
                                                    { prediction.description }
                                                </DropdownItem>
                                            {/each}
                                        {/if}
                                    </DropdownMenu>
                                </Dropdown>
                            </FormGroup>
                        </Form>
    
                        {#if placeSearchResultDescription !== null}
                            <div class="d-flex flex-row w-100">
                                <h6>{ placeSearchResultDescription }</h6>
                            </div>
                        {/if}
                    </Card>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex p-2 justify-content-center align-items-center bg-secondary">
        <strong class="m-0 text-light">Click on the map to select a location. Make sure that you are not on street view before selecting a location.</strong>
    </div>
</div>