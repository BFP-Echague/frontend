<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { getZodErrorMessage, IncidentAPIRoute, parseIdParam, type IncidentGet, type IncidentUpsert } from "$lib";
	import Loading from "$lib/components/display/loading.svelte";
	import IncidentForm from "$lib/components/model/incident/incidentForm.svelte";
	import { error } from "@sveltejs/kit";
	import { Button, Card, Icon } from "@sveltestrap/sveltestrap";
	import { onMount } from "svelte";
	import { ZodError } from "zod";

    const id = parseIdParam(page.params.id);

    let incident: IncidentGet | null = $state(null);
    let incidentForm: IncidentForm | null = $state(null);



    $effect(() => {
        const incidentDerived = incident;

        if (incidentDerived === null) return;
        if (incidentForm === null) return;

        incidentForm.setResult({
            barangayId: incidentDerived.barangayId,
            categoryId: incidentDerived.categoryId,
            causes: incidentDerived.causes,
            location: {
                latitude: incidentDerived.location.latitude,
                longitude: incidentDerived.location.longitude
            },
            name: incidentDerived.name,
            structuresInvolved: incidentDerived.structuresInvolved,
            fireOutTime: incidentDerived.fireOutTime ? new Date(incidentDerived.fireOutTime) : undefined,
            notes: incidentDerived.notes ?? undefined,
            reportTime: incidentDerived.reportTime ? new Date(incidentDerived.reportTime) : undefined,
            responseTime: incidentDerived.responseTime ? new Date(incidentDerived.responseTime) : undefined
        });
    })



    onMount(async () => {
        const response = await IncidentAPIRoute.instance.get(id);
		if (!(await response.isOK())) {
			alert(`Cannot find incident with ID ${id}.`);
			error(404);
		}

		const moreInfo = await response.getMoreInfoParsed();

        incident = moreInfo;
    })


    async function onSubmit() {
        if (incidentForm === null) throw new Error("incidentForm is null.");

        let formResult: IncidentUpsert;
        try {
            formResult = incidentForm.getResult();
        }
        catch (e) {
            if (e instanceof ZodError) {
                alert(getZodErrorMessage(e));
                return;
            }

            throw e;
        }


        const result = await IncidentAPIRoute.instance.patch(id, formResult);
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

    async function onDiscard() {
        if (!confirm("Are you sure you want to discard your changes?")) {
            return;
        }

        goto("./view")
    }
</script>


<style>
    .top-card {
        left: 20%;
        z-index: 90;
    }
</style>


{#if incident === null}
	<Loading />
{:else}
	<div class="d-flex flex-column w-100 h-100">
		<div class="position-absolute d-flex flex-row flex-shrink top-card mt-2 justify-content-center align-items-center">
            <div class="d-flex flex-column">
				<Card class="px-4 py-3 shadow-lg">
					<h2 class="text-primary">EDITING INCIDENT: { incident.name }</h2>
				</Card>

                <div class="d-flex flex-row mt-2 w-100">
                    <Button color="secondary" class="m-0 w-100 shadow-lg" on:click={onDiscard}>
                        <Icon name="x-octagon" />
                        <span>Discard Changes</span>
                    </Button>

                    <Button color="danger" class="m-0 ms-2 w-100 shadow-lg" on:click={onDelete}>
                        <Icon name="trash" />
                        <span>Delete Incident</span>
                    </Button>

                    <Button color="success" class="m-0 ms-2 w-100 shadow-lg" on:click={onSubmit}>
                        <Icon name="check" />
                        <span>Submit Edits</span>
                    </Button>
                </div>
			</div>
		</div>

		<div class="d-flex flex-row w-100 h-100">
			<IncidentForm bind:this={incidentForm} />
		</div>
	</div>
{/if}