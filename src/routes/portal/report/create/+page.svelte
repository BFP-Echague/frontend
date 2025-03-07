<script lang="ts">
	import { goto } from "$app/navigation";
	import { defaultLocation, getZodErrorMessage, IncidentAPIRoute, type IncidentUpsert } from "$lib";
	import IncidentForm from "$lib/components/model/incident/incidentForm.svelte";
	import { Card, CardBody, Icon, Button, Alert } from "@sveltestrap/sveltestrap";
	import { z } from "zod";
    const centerLocation = defaultLocation;

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


<div class="d-flex flex-column">
    <Card class="shadow">
        <CardBody>
            <h3 class="text-primary">
                <Icon name="exclamation-triangle" class="me-2" /> Incident Report
            </h3>
            <IncidentForm bind:this={form}/>

            <Button color="primary" class="w-100" on:click={onSubmit}>
                <Icon name="send" class="me-2" /> Submit Report
            </Button>
        </CardBody>
    </Card>
</div>