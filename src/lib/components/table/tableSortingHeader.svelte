<script lang="ts">
	import { Button, Icon } from "@sveltestrap/sveltestrap";

    let {
        displayName,
        sortValue,
        currentSortValue = $bindable(),
        sortOrderAsc = $bindable(true),
        onClick = async () => {}
    }: {
        displayName: string,
        sortValue: string,
        currentSortValue: string,
        sortOrderAsc?: boolean,
        onClick?: () => Promise<void>
    } = $props();


    let selected = $derived(currentSortValue === sortValue);


    async function onClickEvent() {
        if (currentSortValue !== sortValue) {
            currentSortValue = sortValue;
            sortOrderAsc = true;
        } else {
            sortOrderAsc = !sortOrderAsc;
        }

        await onClick();
    }
</script>


<th class="p-1 m-0" scope="col">
    <Button color={selected ? "primary" : "secondary"} class="d-flex w-100 h-100 m-0" on:click={onClickEvent}>
        <div class="d-flex w-100 h-100 flex-row justify-content-between align-items-center">
            <h6 class="m-0 text-light text-bolder">{displayName}</h6>

            <div class="d-flex flex-column ms-2">
                {#if currentSortValue === sortValue}
                    {#if sortOrderAsc}
                        <Icon name="caret-up-fill" />
                    {:else}
                        <Icon name="caret-down-fill" />
                    {/if}
                {:else}
                    <div class="opacity-20">
                        <Icon name="dash-square-dotted" />
                    </div>
                {/if}
        </div>
    </Button>
</th>