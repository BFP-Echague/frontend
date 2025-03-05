<script lang="ts">
	import { Button, Container, Row, Col, Card, CardBody, Input, CardHeader, Icon } from '@sveltestrap/sveltestrap'; // Sveltestrap Components
	import { page } from "$app/state";
	import { IncidentAPIRoute, parseIdParam, type IncidentGet } from '$lib';
	import IncidentView from '$lib/components/model/incident/incidentView.svelte';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import Loading from '$lib/components/display/loading.svelte';
	import { goto } from '$app/navigation';


	const id = parseIdParam(page.params.id);

	let incident: IncidentGet | undefined;
	onMount(async () => {
		const response = await IncidentAPIRoute.instance.get(id);
		if (!(await response.isOK())) {
			alert(`Cannot find incident with ID ${id}.`);
			error(404);
		}

		incident = await response.getMoreInfo();
	})

	function edit() {
		goto("./edit");
	}
</script>

<!-- Main Content -->
<Container class="mt-4">
	<Row>
		<!-- Map & Report Section -->
		<Col md="9">
			<Card>
				<CardBody>
					<img src="map.png" alt="Map" class="map" />
				</CardBody>
			</Card>

            <Card class="mt-3">
				<CardHeader>
					<h1 class="text-primary">Incident Report</h1>
				</CardHeader>
                <CardBody>
					{#if incident !== undefined}
                    	<IncidentView { incident } />
					{:else}
						<Loading />
					{/if}
                </CardBody>
            </Card>
		</Col>

		<!-- Buttons Section -->
		<Col md="3" class="d-flex flex-column align-items-end">
			<Button color="secondary" class="w-100" on:click={edit}>
				<Icon name="pencil" />
				Edit
			</Button>
		</Col>
	</Row>
</Container>