<script lang="ts">
	import { Form, FormGroup, Label, Input, Container, Row, Col } from "@sveltestrap/sveltestrap";
	import StringArrayFormPart from "../../formParts/stringArrayFormPart.svelte";
	import { onMount } from "svelte";
	import { BarangayAPIRoute, type BarangayGet, CategoryAPIRoute, type CategoryGet } from "$lib/api";
	import { goto } from "$app/navigation";
	import { z } from "zod";
	import type { IncidentUpsert } from "@dbm/incident";
	import { formatFormDate } from "$lib/formatters";
	import type { DeepPartial } from "$lib";
	
	
    let result = {
        name: undefined as string | undefined,
        reportTime: undefined as string | undefined,
        location: {
            longitude: undefined as number | undefined,
            latitude: undefined as number | undefined
        },
        barangayId: undefined as number | undefined,
        responseTime: undefined as string | undefined,
        fireOutTime: undefined as string | undefined,
        notes: undefined as string | undefined,
        categoryId: undefined as number | undefined
    };

    const validateSchema: z.ZodType<IncidentUpsert> = z.object({
        name: z.string({description: "Name"}),
        reportTime: z.coerce.date().optional(),
        location: z.object({
            longitude: z.coerce.string(),
            latitude: z.coerce.string()
        }),
        barangayId: z.number().int(),
        causes: z.string().array(),
        responseTime: z.coerce.date().optional(),
        fireOutTime: z.coerce.date().optional(),
        structuresInvolved: z.string().array(),
        notes: z.string().optional(),
        categoryId: z.number().int()
    });

    let structuresFP: StringArrayFormPart;
    let causesFP: StringArrayFormPart;

    let barangays: BarangayGet[] = [];
    let categories: CategoryGet[] = [];


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
        const combinedResult = {
            ...result,
            structuresInvolved: structuresFP.getResult(),
            causes: causesFP.getResult()
        }

        return validateSchema.parse(combinedResult);
    }

    export function setResult(input: IncidentUpsert) {
        console.log(input.reportTime);
        result = {
            name: input.name,
            reportTime: input.reportTime ? formatFormDate(input.reportTime) : undefined,
            location: {
                latitude: parseFloat(input.location.latitude),
                longitude: parseFloat(input.location.longitude)
            },
            barangayId: input.barangayId,
            responseTime: input.responseTime ? formatFormDate(input.responseTime) : undefined,
            fireOutTime: input.fireOutTime ? formatFormDate(input.fireOutTime) : undefined,
            notes: input.notes,
            categoryId: input.categoryId
        };

        structuresFP.setResult(input.structuresInvolved);
        causesFP.setResult(input.causes);
    }
</script>


<Form>
    <FormGroup>
        <Label for="reportTime">Name of Incident:</Label>
        <Input type="text" id="reportTime" placeholder="Name of incident" bind:value={result.name} />
    </FormGroup>
    <div class="d-flex flex-row">
        <FormGroup class="me-3">
            <Label for="latitude">Latitude</Label>
            <Input type="number" id="latitude" placeholder="Latitude" bind:value={result.location.latitude} />
        </FormGroup>
        <FormGroup>
            <Label for="longitude">Longitude</Label>
            <Input type="number" id="longitude" placeholder="Longitude" bind:value={result.location.longitude} />
        </FormGroup>
    </div>
    
    
    <FormGroup>
        <Label for="reportTime">Report Time:</Label>
        <Input type="datetime-local" id="reportTime" bind:value={result.reportTime} />
    </FormGroup>
    <FormGroup>
        <Label for="barangay">Barangay:</Label>
        <Input type="select" bind:value={result.barangayId}>
            <option value={undefined} disabled selected>Select Barangay</option>
            {#each barangays as barangay}
                <option value={barangay.id}>{ barangay.name }</option>
            {/each}
        </Input>
    </FormGroup>
    <FormGroup>
        <Label for="category">Category of Incident:</Label>
        <Input type="select" id="category" bind:value={result.categoryId}>
            <option value={undefined} disabled selected>Select Category</option>
            {#each categories as category}
                <option value={category.id}>{ category.name }</option>
            {/each}
        </Input>
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