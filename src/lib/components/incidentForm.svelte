<script lang="ts">
	import { Form, FormGroup, Label, Button, Icon, Input } from "@sveltestrap/sveltestrap";
	import StringArrayFormPart from "./formParts/stringArrayFormPart.svelte";
	import { onMount } from "svelte";
	import { BarangayAPIRoute, type BarangayGet } from "$lib/api/barangay";

    export const result = {
        name: undefined,
        reportTime: undefined,
        location: {
            longitude: undefined,
            latitude: undefined
        },
        barangayId: undefined,
        causes: [],
        responseTime: undefined,
        fireOutTime: undefined,
        structuresInvolved: [],
        notes: undefined,
        categoryId: undefined
    };

    let structuresFP: StringArrayFormPart;
    let causesFP: StringArrayFormPart;

    let barangays: BarangayGet[] = [];


    onMount(async () => {
        const result = await BarangayAPIRoute.instance.getMany();
        if (!result.isOK()) {
            alert("waaa");
        }

        barangays = await result.getMoreInfo();
    });

</script>


<Form>
    <FormGroup>
        <Label for="reportTime">Time Reported:</Label>
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
        <Label for="category">Incident Category:</Label>
        <Input type="select" id="category" bind:value={result.categoryId}>
            <option value="" disabled selected>Select Incident Category</option>
            <option value="Structural Fire">Structural Fire</option>
            <option value="Vehicular Fire">Vehicular Fire</option>
            <option value="Grass Fire">Grass Fire</option>
            <option value="Electrical Fire">Electrical Fire</option>
            <option value="Chemical Fire">Chemical Fire</option>
            <option value="Rescue Operation">Rescue Operation</option>
            <option value="Flood Assistance">Flood Assistance</option>
            <option value="Other">Other</option>
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
    <Button color="primary" class="w-100">
        <Icon name="send" class="me-2" /> Submit Report
    </Button>
</Form>