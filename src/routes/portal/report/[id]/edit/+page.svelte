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

		const moreInfo = await response.getMoreInfo();


        incidentForm.setResult({
            barangayId: moreInfo.barangayId,
            categoryId: moreInfo.categoryId,
            causes: moreInfo.causes,
            location: {
                latitude: moreInfo.location.latitude.toString(),
                longitude: moreInfo.location.longitude.toString()
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
</script>

<div class="d-flex flex-column">
    <IncidentForm bind:this={incidentForm} />

    <Button color="success" class="w-100" on:click={onSubmit}>Submit</Button>
</div>