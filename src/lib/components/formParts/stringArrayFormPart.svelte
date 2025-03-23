<script lang="ts">
	import { InputGroup, Button, Icon, Input } from "@sveltestrap/sveltestrap";
    import { z } from "zod";

    let result: string[] = $state([]);

    const validateSchema = z.string().nonempty({ message: "Required" }).array();

    function addResult() {
        result = [...result, ""];
    }

    function removeResult(idx: number) {
        result = result.filter((x, n_idx) => n_idx !== idx);
    }


    export function getResult() {
        return validateSchema.parse(result);
    }

    export function setResult(input: string[]) {
        result = input;
    }
</script>


<div class="d-flex flex-column">
    <div class="d-flex flex-column">
        {#each result as item, idx}
            <div class="d-flex flex-row align-items-center mb-2">
                <Input
                    class="h-100"
                    type="text"
                    required
                    bind:value={result[idx]}
                    placeholder="Enter value"
                />

                <Button
                    class="d-flex m-0 ms-2 h-100"
                    color="secondary"
                    on:click={() => removeResult(idx)}
                    aria-label="Remove value"
                >
                    <Icon name="trash" />
                </Button>
            </div>
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