<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { IncidentAPIRoute, parseIdParam } from "$lib";
	import IncidentForm from "$lib/components/model/incident/incidentForm.svelte";
	import { error } from "@sveltejs/kit";
	import { Button } from "@sveltestrap/sveltestrap";
	import { onMount } from "svelte";

    const id = parseIdParam(page.params.id);

    let incidentForm: IncidentForm;

    onMount(async () => {
        const response = await IncidentAPIRoute.instance.get(id);
		if (!(await response.isOK())) {
			alert(`Cannot find incident with ID ${id}.`);
			error(404);
		}

		const moreInfo = await response.getMoreInfoParsed();


        incidentForm.setResult({
            barangayId: moreInfo.barangayId,
            categoryId: moreInfo.categoryId,
            causes: moreInfo.causes,
            location: {
                latitude: moreInfo.location.latitude,
                longitude: moreInfo.location.longitude
            },
            name: moreInfo.name,
            structuresInvolved: moreInfo.structuresInvolved,
            fireOutTime: moreInfo.fireOutTime ? new Date(moreInfo.fireOutTime) : undefined,
            notes: moreInfo.notes ?? undefined,
            reportTime: moreInfo.reportTime ? new Date(moreInfo.reportTime) : undefined,
            responseTime: moreInfo.responseTime ? new Date(moreInfo.responseTime) : undefined
        });
    })


    async function onSubmit() {
        const result = await IncidentAPIRoute.instance.patch(id, incidentForm.getResult());
        if (!(await result.isOK())) {
            alert("An error occurred while processing your request.");
            return;
        }

        goto("./view");
    }


    async function onDelete() {
        if (!confirm("Are you sure you want to delete this incident?")) {
            return;
        }

        const result = await IncidentAPIRoute.instance.delete(id);
        if (!(await result.isOK())) {
            alert("An error occurred while processing your request.");
            return;
        }

        goto("../../dashboard");
    }
</script>

<div class="d-flex flex-column">
    <div class="d-flex flex-row justify-content-center">
        <h1>Editing Incident</h1>
    </div>

    <div class="d-flex flex-row justify-content-end">
        <Button color="danger" on:click={onDelete}>Delete</Button>
    </div>

    <IncidentForm bind:this={incidentForm} />

    <Button color="success" class="w-100" on:click={onSubmit}>Submit</Button>
</div>