<script lang="ts">
	import { goto } from "$app/navigation";
	import { getZodErrorMessage, IncidentAPIRoute, type IncidentUpsert } from "$lib";
	import IncidentForm from "$lib/components/model/incident/incidentForm.svelte";
	import { Card, Icon, Button } from "@sveltestrap/sveltestrap";
	import { z } from "zod";


    let form: IncidentForm;

    async function onSubmit() {
        let upsert: IncidentUpsert;
        try {
            upsert = form.getResult();
        }
        catch (e) {
            if (e instanceof z.ZodError) {
                alert(getZodErrorMessage(e));
            }

            return;
        }

        const result = await IncidentAPIRoute.instance.post(upsert);
        if (await result.isOK()) {
            if (confirm("Incident logged! Would you like to go to the report page?")) {
				const moreInfo = await result.getMoreInfoParsed();
				goto(`./${moreInfo.id}/view`);
			}
        }
    }
</script>


<style>
    .top-card {
        left: 20%;
        z-index: 90;
    }
</style>


<div class="d-flex flex-column w-100 h-100">
    <div class="position-absolute d-flex flex-row flex-shrink top-card mt-2 justify-content-center align-items-center">
        <div class="d-flex flex-column">
            <Card class="px-4 py-3 shadow-lg">
                <h2 class="text-primary">CREATING NEW INCIDENT</h2>
            </Card>

            <div class="d-flex flex-row mt-2 w-100">
                <Button color="success" class="m-0 w-100 shadow-lg" on:click={onSubmit}>
                    <Icon name="check" />
                    <span>Submit New Report</span>
                </Button>
            </div>
        </div>
    </div>

    <div class="d-flex flex-row w-100 h-100">
        <IncidentForm bind:this={form} />
    </div>
</div>