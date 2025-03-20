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


<div class="d-flex flex-column w-100 h-100">
    <div class="d-flex flex-row w-100 px-4 py-3 justify-content-between align-items-center shadow-lg" style="height: 15%">
        <div class="d-flex w-100 justify-content-center">
            <h2 class="m-0 text-primary">CREATING NEW INCIDENT</h2>
        </div>

        <Button color="success" class="m-0 shadow-lg" on:click={onSubmit}>
            <Icon name="check" />
            <span>Submit New Report</span>
        </Button>
    </div>
    <div class="d-flex flex-row w-100" style="height: 85%">
        <div class="d-flex flex-row w-100 h-100">
            <IncidentForm bind:this={form} />
        </div>
    </div>
</div>