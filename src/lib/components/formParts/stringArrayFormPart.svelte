<script lang="ts">
	import { InputGroup, Button, Icon, Input } from "@sveltestrap/sveltestrap";
    import { z } from "zod";

    export let result: (string | undefined)[] = [];

    const validateSchema = z.string().array();

    function addResult() {
        result = [...result, undefined];

        console.log(result);
    }

    function removeResult(idx: number) {
        result = result.filter((x, n_idx) => n_idx !== idx);
    }


    export function getResult() {
        return validateSchema.parse(result);
    }
</script>


<div class="d-flex flex-column">
    <div class="d-flex flex-column">
        {#each result as item, idx}
            <InputGroup class="d-flex flex-row">
                <Input
                    class="h-100"
                    type="text"
                    bind:value={result[idx]}
                    placeholder="Enter value"
                />

                <Button
                    type="button"
                    color="secondary"
                    on:click={() => removeResult(idx)}
                    aria-label="Remove value"
                >
                    <Icon name="trash" />
                </Button>
            </InputGroup>
        {/each}
    </div>

    <Button
        type="button"
        on:click={addResult}
        class="d-flex justify-content-center space-x-1 mt-2 w-100"
    >

        <Icon name="plus" />
        <span>Add Item</span>
    </Button>
</div>