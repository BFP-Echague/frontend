<script lang="ts">
	import { Button, FormGroup, Icon, Input, InputGroup, Label } from "@sveltestrap/sveltestrap";
    import { z } from "zod";

    let {
        label = "Password",
        toFor,
        performValidation = true
    }: {
        label?: string;
        toFor: string;
        performValidation?: boolean
    } = $props();

    let result = $state("");

    let validateSchema = z.string()
			.min(8, { message: "Must be 8 or more characters" })
			.refine(x => /^.*[a-z].*$/g.test(x), { message: "Must have a lowercase letter" })
			.refine(x => /^.*[A-Z].*$/g.test(x), { message: "Must have a capital letter" })
			.refine(x => /^.*\d.*$/g.test(x), { message: "Must have a digit" })
			.refine(x => /^.*[^A-Za-z0-9].*$/g.test(x), { message: "Must have a symbol" })

    let showPassword = $state(false);

    function togglePassword() {
        showPassword = !showPassword;
    }


    export function getResultRaw() {
        return result;
    }

    export function getResult() {
        if (!performValidation) return result;
        return validateSchema.parse(result);
    }

    export function setResult(input: string) {
        result = input;
    }
</script>


<FormGroup>
    <Label for={ toFor }>{ label }</Label>
    <InputGroup>
        <Input
            type={showPassword ? 'text' : 'password'}
            id={ toFor }
            bind:value={result}
            required
            placeholder="Password"
        />
        <Button
            color="secondary"
            on:click={togglePassword}
            type="button"
            class="m-0 p-0 px-3"
        >
            <Icon name={showPassword ? 'eye-slash' : 'eye'} />
        </Button>
    </InputGroup>
</FormGroup>