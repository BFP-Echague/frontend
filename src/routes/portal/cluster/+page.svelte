<script lang="ts">
	import { getZodErrorMessage, performClustering, type ClusteringSettings, type FinalResult } from "$lib";
	import Loading from "$lib/components/display/loading.svelte";
	import ClusterFinalResultView from "$lib/components/model/cluster/clusterFinalResultView.svelte";
	import ClusterSettingsForm from "$lib/components/model/cluster/clusterSettingsForm.svelte";
	import { Button, Card, CardBody, CardHeader, CardTitle, Icon } from "@sveltestrap/sveltestrap";
	import { z } from "zod";


    let clusterSettingsForm: ClusterSettingsForm;

    let finalClusteringResult: FinalResult | null = $state(null);
    let loading: boolean = $state(false);


    let clusteringResultsDivElement: HTMLDivElement;



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

        clusteringResultsDivElement.scrollIntoView({ behavior: "smooth" });

        loading = true;
        const result = await performClustering(clusteringSettings);
        loading = false;

        if (!(await result.isOK())) {
            alert("An error occurred while performing clustering.");
            return;
        }

        finalClusteringResult = await result.getMoreInfoParsed();
    }
</script>


<div class="d-flex flex-column mt-3 p-5">
    <div class="d-flex flex-column align-items-center">
        <h1 class="text-primary">CLUSTERING</h1>
    </div>

    <div class="d-flex flex-column align-items-center mt-3">
        <Card class="d-flex flex-column w-100 shadow border">
            <CardHeader class="d-flex flex-column">
                <CardTitle>Clustering Settings</CardTitle>
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

    <div class="d-flex flex-column mt-5" bind:this={clusteringResultsDivElement}>
        <Card class="d-flex flex-column w-100 shadow border">
            <CardHeader>
                <CardTitle>Clustering Results</CardTitle>
            </CardHeader>
            <CardBody>
                {#if loading}
                    <Loading />
                {:else}
                    {#if finalClusteringResult === null}
                        <p>No result yet. Perform clustering before viewing results.</p>
                    {:else}
                        <ClusterFinalResultView bind:finalClusteringResult />
                    {/if}
                {/if}
            </CardBody>
        </Card>
    </div>
</div>