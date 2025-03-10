<script lang="ts">
	import { Button, Icon, Input, InputGroup } from "@sveltestrap/sveltestrap";

    let {
        inputId,
        placeholder,

        defaultValue
    }: {
        inputId: string,
        placeholder: string,

        defaultValue: number
    } = $props();


    let result = $state(defaultValue);
    let disableButton = $derived(result === defaultValue)

    function reset() {
        result = defaultValue;
    }


    export function getResult() {
        return result;
    }
    export function setResult(value: number | null) {
        if (value === null) {
            value = defaultValue;
            return;
        }

        result = value;
    }
</script>


<InputGroup>
    <Input type="number" id={inputId} placeholder={placeholder} bind:value={result} />

    <Button color="secondary" class="m-0" on:click={reset} disabled={disableButton}>
        <Icon name="arrow-counterclockwise"/>
    </Button>
</InputGroup>