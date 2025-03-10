<script lang="ts">
	import { getZodErrorMessage, performClustering, type ClusteringSettings, type FinalResult } from "$lib";
	import ClusterFinalResultView from "$lib/components/model/cluster/clusterFinalResultView.svelte";
	import ClusterSettingsForm from "$lib/components/model/cluster/clusterSettingsForm.svelte";
	import { Button, Card, CardBody, CardHeader, Icon } from "@sveltestrap/sveltestrap";
	import { z } from "zod";


    let clusterSettingsForm: ClusterSettingsForm;

    let finalClusteringResult: FinalResult | null = $state(null);

    async function submit() {
        let clusteringSettings: ClusteringSettings;
        try {
            clusteringSettings = clusterSettingsForm.getResult();
        }
        catch (e) {
            if (e instanceof z.ZodError) {
                alert(getZodErrorMessage(e));
            }

            return;
        }

        const result = await performClustering(clusteringSettings);
        if (!(await result.isOK())) {
            alert("An error occurred while performing clustering.");
            return;
        }

        finalClusteringResult = await result.getMoreInfoParsed();
    }
</script>


<div class="d-flex flex-column">
    <div class="d-flex flex-column align-items-center">
        <h1 class="text-primary">CLUSTERING</h1>
    </div>

    <div class="d-flex flex-column align-items-center mt-3">
        <Card class="d-flex flex-column w-100">
            <CardHeader class="d-flex flex-column">
                <h2>Clustering Settings</h2>
            </CardHeader>

            <CardBody class="d-flex flex-column">
                <ClusterSettingsForm bind:this={clusterSettingsForm} />

                <div class="d-flex flex-column align-items-center mt-3">
                    <Button color="primary" size="lg" class="w-50" on:click={submit}>
                        <Icon name="play" />
                        Perform Clustering
                    </Button>
                </div>
            </CardBody>
        </Card>
    </div>

    <div class="d-flex flex-column mt-5">
        <ClusterFinalResultView bind:finalClusteringResult />
    </div>
</div>