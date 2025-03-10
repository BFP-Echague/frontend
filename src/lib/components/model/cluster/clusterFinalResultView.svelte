<script lang="ts">
	import { defaultLocation, OptionHelper, type FinalResult, type IncidentGet } from "$lib";
	import MapView from "$lib/components/map/mapView.svelte";
	import { Input } from "@sveltestrap/sveltestrap";

    let {
        finalClusteringResult = $bindable(null)
    }: {
        finalClusteringResult: FinalResult | null
    } = $props();


    let mapView: MapView | undefined = $state();


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
            `Cluster #${clusterNumber + 1}`
        ));
    })

    let selectedClusterNumber: number | null = $state(null);


    let selectedIncidents: IncidentGet[] | null = $derived.by(() => {
        if (
            finalClusteringResult === null ||
            selectedClusterCount === null ||
            selectedClusterNumber === null
        ) {
            return null;
        }


        const selectedIncidentIds = finalClusteringResult.clusterResults.find(
            clusterResult => clusterResult.clusterCount === selectedClusterCount
        )?.labels[selectedClusterNumber]

        if (selectedIncidentIds === undefined) return null;

        return finalClusteringResult.incidents.filter(
            incident => selectedIncidentIds.includes(incident.id)
        )
    })


    $effect(() => {
        const selectedIncidentsEffect = selectedIncidents
        mapView?.deleteAllMarkers();

        if (selectedIncidentsEffect === null) return;

        selectedIncidentsEffect.forEach(incident => {
            mapView?.addIncident(incident);
        })
    })

    $effect(() => {
        const _ = selectedClusterCount;
        selectedClusterNumber = null;
    })
</script>


{#if finalClusteringResult !== null && clusterCountOptions !== null}
    <div class="d-flex flex-column">
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
                    <Input type="select" id="clusterCount" bind:value={selectedClusterNumber}>
                        {#each clusterNumberOptions as clusterNumberOption}
                            <option value={clusterNumberOption.value}>{clusterNumberOption.label}</option>
                        {/each}
                    </Input>
                </div>
            {/if}
        </div>

        {#if selectedClusterNumber !== null}
            <div class="d-flex flex-column">
                <MapView bind:this={mapView} centerLocation={defaultLocation}/>
            </div>
        {/if}
    </div>
{/if}