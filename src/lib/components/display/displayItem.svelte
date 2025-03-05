<script lang="ts">
	import { Badge } from "@sveltestrap/sveltestrap";

    let { name, description } : {
        name: string;
        description: unknown | null | undefined;
    } = $props();
</script>


<div class="d-flex flex-column">
    <dl>
        <dt>{ name }</dt>
        {#if description !== null && description !== undefined && description !== ""}
            <dd>{ description }</dd>
        {:else}
            <Badge color="warning">Blank</Badge>
        {/if}
    </dl>
</div>