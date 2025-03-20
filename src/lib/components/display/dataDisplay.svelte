<script lang="ts">
	import { formatDate } from "$lib";
	import { Badge, Button } from "@sveltestrap/sveltestrap";

    let { data, boolFlipColors = false }: {
        data: undefined | null | string | number | boolean | Date;

        boolFlipColors?: boolean
    } = $props();
</script>


<div class="d-flex flex-column">
    <div>
        {#if data === undefined || data === null}
            <Badge color="warning">Blank</Badge>
        {:else if data instanceof Date}
            <dd class="m-0">{ formatDate(data) }</dd>
        {:else if typeof data === "string"}
            {#if data.length === 0}
                <Badge color="warning">Blank data</Badge>
            {:else}
                <dd class="m-0">{ data }</dd>
            {/if}
        {:else if typeof data === "number"}
            <dd class="m-0">{ data.toString() }</dd>
        {:else if typeof data === "boolean"}
            {#if data}
                <Badge color={!boolFlipColors ? "success" : "danger"}>YES</Badge>
            {:else}
                <Badge color={!boolFlipColors ? "danger" : "success"}>NO</Badge>
            {/if}
        {/if}
    </div>
</div>