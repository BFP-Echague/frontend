<script lang="ts">
	import { defaultLocation, OptionHelper, type ClusterResult, type FinalResult, type IncidentGet } from "$lib";
	import DisplayItem from "$lib/components/display/displayItem.svelte";
	import MapViewMultiple from "$lib/components/map/mapViewMultiple.svelte";
	import { Card, CardBody, CardHeader, CardTitle, Input } from "@sveltestrap/sveltestrap";

    let {
        finalClusteringResult = $bindable(null)
    }: {
        finalClusteringResult: FinalResult | null
    } = $props();


    let mapViewMultiple: MapViewMultiple | undefined = $state();


    let clusterCountOptions = $derived(finalClusteringResult?.clusterResults.map(
        clusterResult => new OptionHelper(
            clusterResult.clusterCount,
            `${clusterResult.clusterCount} Clusters` + (
                clusterResult.clusterCount === finalClusteringResult?.optimalClusterCount
                ? " (optimal)"
                : ""
            )
        )
    ) ?? null);

    let maxClusterNumber: number | null = $derived(
        finalClusteringResult !== null
        ? Math.max(...finalClusteringResult.clusterResults.map(clusterResult => clusterResult.clusterCount))
        : null
    );
    let minClusterNumber: number | null = $derived(
        finalClusteringResult !== null
        ? Math.min(...finalClusteringResult.clusterResults.map(clusterResult => clusterResult.clusterCount))
        : null
    );



    let selectedClusterCount: number | null = $state(null);

    let clusterNumberOptions = $derived.by(() => {
        if (finalClusteringResult === null || selectedClusterCount === null) {
            return null;
        }

        const clusterResult = finalClusteringResult.clusterResults.find(
            clusterResult => clusterResult.clusterCount === selectedClusterCount
        );

        if (clusterResult === undefined) {
            return null;
        }

        const clusterNumbers = []
        for (let i = 0; i < clusterResult.labels.length; i++) {
            clusterNumbers.push(i);
        }

        return clusterNumbers.map(clusterNumber => new OptionHelper(
            clusterNumber,
            `Cluster #${clusterNumber + 1} (${clusterResult.labels[clusterNumber].length})`
        ));
    })


    let selectedClusterCountResult: ClusterResult | null = $derived.by(() => {
        if (
            finalClusteringResult === null ||
            selectedClusterCount === null ||
            selectedClusterNumber === null
        ) {
            return null;
        }

        return finalClusteringResult.clusterResults.find(
            clusterResult => clusterResult.clusterCount === selectedClusterCount
        ) ?? null
    })



    let selectedClusterNumber: number | null = $state(null);

    let selectedClusterNumberResult: number[] | null = $derived.by(() => {
        if (
            selectedClusterCountResult === null ||
            selectedClusterNumber === null ||
            finalClusteringResult === null
        ) {
            return null;
        }

        return selectedClusterCountResult.labels[selectedClusterNumber];
    })



    let selectedIncidents: IncidentGet[] | null = $derived.by(() => {
        if (selectedClusterNumberResult === null || finalClusteringResult === null) {
            return null;
        }

        return finalClusteringResult.incidents.filter(
            incident => selectedClusterNumberResult.includes(incident.id)
        )
    })



    $effect(() => {
        const selectedIncidentsEffect = selectedIncidents
        mapViewMultiple?.deleteAllMarkers();

        if (selectedIncidentsEffect === null) return;

        selectedIncidentsEffect.forEach(incident => {
            mapViewMultiple?.addIncident(incident);
        })
    })

    $effect(() => {
        const _ = selectedClusterCount;
        selectedClusterNumber = null;
    })

    $effect(() => {
        const _ = finalClusteringResult;
        mapViewMultiple?.deleteAllMarkers();
    })
</script>


{#if finalClusteringResult !== null && clusterCountOptions !== null}
    <div class="d-flex flex-column w-100 h-100">
        <div class="d-flex flex-row">
            <div class="d-flex flex-column">
                <h6>Amount of Clusters</h6>
                <Input type="select" id="clusterCount" bind:value={selectedClusterCount}>
                    <option value={null} selected>Select cluster count...</option>
                    {#each clusterCountOptions as clusterCountOption}
                        <option value={clusterCountOption.value}>{clusterCountOption.label}</option>
                    {/each}
                </Input>
            </div>

            {#if selectedClusterCount !== null && clusterNumberOptions !== null}
                <div class="d-flex flex-column ms-2">
                    <h6>Cluster Number</h6>
                    <Input type="select" id="clusterNumber" bind:value={selectedClusterNumber}>
                        <option value={null} selected>Select cluster number...</option>
                        {#each clusterNumberOptions as clusterNumberOption}
                            <option value={clusterNumberOption.value}>{clusterNumberOption.label}</option>
                        {/each}
                    </Input>
                </div>
            {/if}
        </div>

        {#if selectedClusterNumber !== null}
            <div class="d-flex flex-row w-100 vh-100 mt-2">
                <div class="d-flex w-100 h-100">
                    <MapViewMultiple bind:this={mapViewMultiple} centerLocation={defaultLocation}/>
                </div>

                {#if selectedClusterCountResult !== null && selectedClusterNumberResult !== null}
                    <div class="d-flex flex-column w-30 h-100 ms-2">
                        <Card class="d-flex flex-column h-100 shadow border">
                            <CardHeader>
                                <CardTitle>Clustering Information</CardTitle>
                            </CardHeader>

                            <CardBody>
                                <div class="d-flex flex-column">
                                    <h3>{ `${selectedClusterCount} Clusters Statistics`}</h3>
                                    <DisplayItem name="Silhouette Score (Clustering Score)" description={selectedClusterCountResult.score.toPrecision(6)} />
                                    <DisplayItem 
                                        name={`Is optimal (when checking clusters between ${minClusterNumber} and ${maxClusterNumber})`}
                                        description={selectedClusterCountResult.clusterCount === finalClusteringResult.optimalClusterCount}
                                    />
                                </div>

                                <div class="d-flex flex-column mt-2">
                                    <h3>{ `Cluster #${selectedClusterNumber + 1} Statistics`}</h3>
                                    <DisplayItem name="Incident Count" description={selectedClusterNumberResult.length} />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{/if}