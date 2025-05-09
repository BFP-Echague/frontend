<script lang="ts">
	import PasswordFormPart from "$lib/components/formParts/passwordFormPart.svelte";
    import { Form, FormGroup, Input, Label } from "@sveltestrap/sveltestrap";

    let result = $state({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
</script>

<Form>
    <FormGroup>
        <Label for="usernameForm">Username</Label>
        <Input type="text" id="usernameForm" bind:value={result.username} />
    </FormGroup>

    <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" id="email" bind:value={result.email} />
    </FormGroup>

    <PasswordFormPart toFor="passwordForm" label="Password" bind:password={result.password} />
    <PasswordFormPart toFor="confirmPassword" label="Confirm Password" bind:password={result.confirmPassword} />
</Form>