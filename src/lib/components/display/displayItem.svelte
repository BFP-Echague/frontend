<script lang="ts">
	import DataDisplay from "./dataDisplay.svelte";

    let { name, description, boolFlipColors = false } : {
        name: string;
        description: undefined | null | string | number | boolean | Date;

        boolFlipColors?: boolean
    } = $props();
</script>


<div class="d-flex flex-column mb-2">
    <dl class="m-0">
        <dt class="m-0">{ name }</dt>
        <DataDisplay data={description} { boolFlipColors } />
    </dl>
</div>