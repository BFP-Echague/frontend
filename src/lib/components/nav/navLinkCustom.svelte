<script lang="ts">
	import { page } from "$app/state";
	import { Card, Icon, NavLink } from "@sveltestrap/sveltestrap";


    let {
        route,
        iconName,
        label
    }: {
        route: string;
        iconName: string;
        label: string;
    } = $props();

    let active: boolean = $derived(page.url.pathname.includes(route));
</script>


<style>
    .square {
        height: 2em;
        width: 2em;
    }
</style>


{#snippet link()}
    <NavLink href={route} active>
        <div class="d-flex flex-row align-items-center">
            <div 
                class="d-flex square justify-content-center align-items-center rounded-3"
                class:bg-primary={active}
                class:bg-secondary={!active}
            >
                <Icon name={iconName} class="text-light" />
            </div>

            <span
                class="ms-2"
                class:text-primary={active}
                class:text-secondary={!active}
            >
                { label }
            </span>
        </div>
    </NavLink>
{/snippet}



<div>
    {#if active}
        <Card class="shadow">
            {@render link()}
        </Card>
    {:else}
        {@render link()}
    {/if}
</div>