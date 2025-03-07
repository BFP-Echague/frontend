<script lang="ts">
	import type { IncidentGet } from "$lib";
	import { Button, ButtonGroup, Icon } from "@sveltestrap/sveltestrap";
	import DisplayItem from "../display/displayItem.svelte";
	import { goto } from "$app/navigation";


    let { incident }: { incident: IncidentGet } = $props();

    function gotoView() {
        goto(`/portal/report/${incident.id}/view`);
    }

    function gotoEdit() {
        goto(`/portal/report/${incident.id}/edit`);
    }
</script>



<div class="d-flex flex-column w-100">
    <div class="d-flex flex-column justify-content-center">
        <h2>{ incident.name }</h2>
    </div>

    <ButtonGroup>
        <Button color="primary" on:click={gotoView}>
            <Icon name="arrow-up-right-square" /> View
        </Button>
        <Button color="secondary" on:click={gotoEdit}>
            <Icon name="pencil" /> Edit
        </Button>
    </ButtonGroup>

    <DisplayItem name="Category" description={incident.category.name} />
    <DisplayItem name="Report Time" description={incident.reportTime} />
    <DisplayItem name="Barangay" description={incident.barangay.name} />
    <DisplayItem name="Notes" description={incident.notes} />
</div>