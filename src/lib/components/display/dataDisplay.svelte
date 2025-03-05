<script lang="ts">
	import { formatDate } from "$lib";
	import { Badge, Button } from "@sveltestrap/sveltestrap";

    let { data } : { 
        data: undefined | null | string | number | boolean | Date
    } = $props();
</script>


<div class="d-flex flex-column">
    <Button on:click={() => console.log(data)} />
    {#if data === undefined || data === null}
        <Badge color="warning">Blank</Badge>
    {:else if data instanceof Date}
        <dd>{ formatDate(data) }</dd>
    {:else if typeof data === "string"}
        {#if data.length === 0}
            <Badge color="warning">Blank data</Badge>
        {:else}
            <dd>{ data }</dd>
        {/if}
    {:else if typeof data === "number"}
        <dd>{ data.toString() }</dd>
    {:else if typeof data === "boolean"}
        {#if data}
            <Badge color="success">YES</Badge>
        {:else}
            <Badge color="danger">NO</Badge>
        {/if}
    {/if}
</div>