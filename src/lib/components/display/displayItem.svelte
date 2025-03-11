<script lang="ts">
	import DataDisplay from "./dataDisplay.svelte";

    let { name, description } : {
        name: string;
        description: undefined | null | string | number | boolean | Date;
    } = $props();
</script>


<div class="d-flex flex-column mb-2">
    <dl class="m-0">
        <dt class="m-0">{ name }</dt>
        <DataDisplay data={description} />
    </dl>
</div>