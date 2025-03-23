<script lang="ts">
	import { Form, FormGroup, Label, Input, Alert, Icon } from "@sveltestrap/sveltestrap";
	import StringArrayFormPart from "../../formParts/stringArrayFormPart.svelte";
	import { onMount } from "svelte";
	import { BarangayAPIRoute, type BarangayGet, CategoryAPIRoute, type CategoryGet } from "$lib";
	import { goto } from "$app/navigation";
	import { z } from "zod";
	import type { IncidentUpsert } from "@dbm";
	import { formatFormDate } from "$lib/formatters";
	import { defaultLocation, zodDate, zodDecimal, type RawJSON } from "$lib";
	import MapSelectLocation from "$lib/components/map/mapSelectLocation.svelte";
	import Loading from "$lib/components/display/loading.svelte";


    let mapSelectLocation: MapSelectLocation;
	
    let result = $state({
        name: undefined as string | undefined,
        reportTime: undefined as string | undefined,
        barangayId: undefined as number | undefined,
        responseTime: undefined as string | undefined,
        fireOutTime: undefined as string | undefined,
        notes: undefined as string | undefined,
        categoryId: undefined as number | undefined,
        archived: false
    });

    let resultLocation = $state({
        latitude: undefined as number | undefined,
        longitude: undefined as number | undefined
    });

    let archivedInitial = $state(false);



    const validateSchema: z.ZodType<IncidentUpsert, z.ZodTypeDef, RawJSON<IncidentUpsert>> = z.object({
        name: z.string({description: "Name"}),
        reportTime: zodDate.optional(),
        location: z.object({
            longitude: zodDecimal,
            latitude: zodDecimal
        }),
        barangayId: z.number().int(),
        causes: z.string().array(),
        responseTime: zodDate.optional(),
        fireOutTime: zodDate.optional(),
        structuresInvolved: z.string().array(),
        notes: z.string().optional(),
        categoryId: z.number().int(),
        archived: z.boolean()
    });

    let structuresFP: StringArrayFormPart;
    let causesFP: StringArrayFormPart;

    let barangays: BarangayGet[] | null = $state(null);
    let categories: CategoryGet[] | null = $state(null);

    let attemptedSubmit: boolean = $state(false);


    onMount(async () => {
        const resultBarangay = await BarangayAPIRoute.instance.getMany();
        if (!resultBarangay.isOK()) {
            goto("/");
        }

        barangays = await resultBarangay.getMoreInfoParsed();


        const resultCategory = await CategoryAPIRoute.instance.getMany();
        if (!resultCategory.isOK()) {
            goto("/");
        }

        categories = await resultCategory.getMoreInfoParsed();
    });


    export function getResult() {
        attemptedSubmit = true;

        const combinedResult = {
            ...result,
            location: {
                latitude: resultLocation.latitude?.toString(),
                longitude: resultLocation.longitude?.toString()
            },
            structuresInvolved: structuresFP.getResult(),
            causes: causesFP.getResult()
        }

        return validateSchema.parse(combinedResult);
    }

    export function setResult(input: IncidentUpsert) {
        const archived = input.archived ?? false;

        archivedInitial = archived;

        result = {
            name: input.name,
            reportTime: input.reportTime ? formatFormDate(input.reportTime) : undefined,
            barangayId: input.barangayId,
            responseTime: input.responseTime ? formatFormDate(input.responseTime) : undefined,
            fireOutTime: input.fireOutTime ? formatFormDate(input.fireOutTime) : undefined,
            notes: input.notes,
            categoryId: input.categoryId,
            archived: archived
        };

        resultLocation = {
            latitude: input.location.latitude.toNumber(),
            longitude: input.location.longitude.toNumber()
        };
        mapSelectLocation.setCenterLocation(input.location);

        structuresFP.setResult(input.structuresInvolved);
        causesFP.setResult(input.causes);
    }
</script>

<div class="d-flex flex-column mb-5 w-100 h-100">
    <div class="d-flex flex-row w-100 h-100">
        <div class="d-flex flex-column w-100 h-100">
            <MapSelectLocation bind:this={mapSelectLocation} bind:pickedLocation={resultLocation} centerLocation={defaultLocation} />
        </div>

        <div class="d-flex flex-column ms-2 mt-2 w-40 overflow-y-scroll">
            <div class="d-flex">
                <Alert color="danger" class="shadow text-light">
                    <Icon name="exclamation-circle" class="me-2" /> Ensure all fields are filled accurately before
                    submitting.
                </Alert>
            </div>

            <div class="d-flex flex-column mt-2 p-2">
                <h2>Incident Details</h2>
                <Form validated={attemptedSubmit}>
                    <FormGroup>
                        <div class="d-flex flex-row p-2 align-items-center rounded" class:bg-danger={result.archived}>
                            <Input type="checkbox" id="archived" bind:checked={result.archived} />
                            <span class:text-light={result.archived}>Archive incident (excluded in search results)</span>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="reportTime">Name of Incident:</Label>
                        <Input type="text" id="reportTime" placeholder="Name of incident" required bind:value={result.name} />
                    </FormGroup>
                    <div class="d-flex flex-row">
                        <FormGroup class="me-3">
                            <Label for="latitude">Latitude</Label>
                            <Input type="number" id="latitude" placeholder="Latitude" required bind:value={resultLocation.latitude} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label for="longitude">Longitude</Label>
                            <Input type="number" id="longitude" placeholder="Longitude" required bind:value={resultLocation.longitude} disabled />
                        </FormGroup>
                    </div>


                    <FormGroup>
                        <Label for="reportTime">Report Time:</Label>
                        <Input type="datetime-local" id="reportTime" required bind:value={result.reportTime} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="barangay">Barangay:</Label>
                        {#if barangays === null}
                            <Loading />
                        {:else}
                            <Input type="select" required invalid={result.barangayId === undefined} bind:value={result.barangayId}>
                                <option value={undefined} disabled selected>Select Barangay</option>
                                {#each barangays as barangay}
                                    <option value={barangay.id}>{ barangay.name }</option>
                                {/each}
                            </Input>
                        {/if}
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category of Incident:</Label>
                        {#if categories === null}
                            <Loading />
                        {:else}
                            <Input type="select" id="category" bind:value={result.categoryId}>
                                <option value={undefined} disabled selected>Select Category</option>
                                {#each categories as category}
                                    <option value={category.id}>{ category.name }</option>
                                {/each}
                            </Input>
                        {/if}
                    </FormGroup>
                    <FormGroup>
                        <Label for="cause">Causes:</Label>
                        <StringArrayFormPart bind:this={causesFP}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="responseTime">Time of Arrival:</Label>
                        <Input type="datetime-local" bind:value={result.responseTime} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fireOutTime">Time Fire Out:</Label>
                        <Input type="datetime-local" bind:value={result.fireOutTime} />
                    </FormGroup>
                    <div>
                        <label for="structuresInvolved">Structures Involved:</label>
                        <StringArrayFormPart bind:this={structuresFP}/>
                    </div>
                    <FormGroup>
                        <Label for="notes">Notes:</Label>
                        <Input
                            type="textarea"
                            id="notes"
                            bind:value={result.notes}
                            rows={5}
                            placeholder="Enter notes"
                        />
                    </FormGroup>
                </Form>
            </div>
        </div>
    </div>
</div>