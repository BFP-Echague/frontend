<script lang="ts">
	import type { IncidentUpsert } from '$lib';
	import IncidentForm from '$lib/components/model/incident/incidentForm.svelte';
	import {
		Container,
		Row,
		Col,
		Card,
		CardBody,
		CardTitle,
		Button,
		Alert,
		Icon
	} from '@sveltestrap/sveltestrap';
	import { z } from 'zod';
	import { defaultLocation, getZodErrorMessage } from "$lib";
	import { IncidentAPIRoute } from '$lib/api/incident';
	import { goto } from '$app/navigation';
	import MapView from '$lib/components/map/mapView.svelte';
	import { onMount } from 'svelte';


    let form: IncidentForm;

	let mapView: MapView;
	let centerLocation = defaultLocation;



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
				goto(`./report/${moreInfo.id}/view`);
			}
        }
    }


	onMount(async () => {
		const result = await IncidentAPIRoute.instance.getMany(new URLSearchParams({ pageSize: "100" }));
		if (!result.isOK()) {
			alert("Failed to load incidents");
			return;
		}

		const moreInfo = await result.getMoreInfoParsed();
		for (const incident of moreInfo.data) {
			await mapView.addIncident(incident);
		}
	});
</script>

<!-- Main Content -->
<Container fluid>
	<Row>
		<!-- Left Section: Map and Results -->
		<Col md="8">
			<Card class="mb-4 shadow">
				<CardBody>
					<CardTitle class="text-primary fs-3">
						<h3 class="d-inline">
							<Icon name="map" class="me-2" /> Fire Incident Map
						</h3>
					</CardTitle>
					<MapView bind:this={mapView} { centerLocation }/>
				</CardBody>
			</Card>
		</Col>

		<!-- Right Section: Incident Report Form -->
		<Col md="4">
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

			<!-- Alert Section -->
			<Alert color="danger" class="mt-4 shadow text-light">
				<Icon name="exclamation-circle" class="me-2" /> Ensure all fields are filled accurately before
				submitting.
			</Alert>
		</Col>
	</Row>
</Container>
