<script lang="ts">
	import ResettableFormPart from "$lib/components/formParts/resettableFormPart.svelte";
	import type { ClusteringSettings } from "$lib";
	import { Form, FormGroup, Label } from "@sveltestrap/sveltestrap";
	import { z } from "zod";



    let featureCount: ResettableFormPart;
    let clusterCountStart: ResettableFormPart;
    let clusterCountEnd: ResettableFormPart;

    const parseSchema: z.ZodType<ClusteringSettings> = z.object({
        componentCount: z.number().int(),
        clusterCountStart: z.number().int(),
        clusterCountEnd: z.number().int()
    });



    export function getResult() {
        const result = {
            componentCount: featureCount.getResult(),
            clusterCountStart: clusterCountStart.getResult(),
            clusterCountEnd: clusterCountEnd.getResult()
        };

        return parseSchema.parse(result);
    }

    export function setResult(result: ClusteringSettings) {
        featureCount.setResult(result.componentCount);
        clusterCountStart.setResult(result.clusterCountStart);
        clusterCountEnd.setResult(result.clusterCountEnd);
    }
</script>


<Form>
    <h5>Feature Selection Settings</h5>

    <FormGroup>
        <Label for="featureCount">Feature Count</Label>
        <ResettableFormPart bind:this={featureCount} inputId="featureCount" placeholder="Feature Count" defaultValue={2}/>
    </FormGroup>

    <h5>Cluster Count</h5>

    <div class="d-flex flex-row">
        <FormGroup class="w-100">
            <Label for="clusterCountStart">Start</Label>
            <ResettableFormPart bind:this={clusterCountStart} inputId="clusterCountStart" placeholder="Starting Cluster Count" defaultValue={2} />
        </FormGroup>

        <FormGroup class="w-100 ms-5">
            <Label for="clusterName">End</Label>
            <ResettableFormPart bind:this={clusterCountEnd} inputId="featureCount" placeholder="Feature Count" defaultValue={2} />
        </FormGroup>
    </div>
</Form>