<script lang="ts">
	import PasswordFormPart from "$lib/components/formParts/passwordFormPart.svelte";
	import type { UserUpsert } from "@dbm/user";
	import { PrivilegeLevel } from "@prisma/client";
    import { Form, FormGroup, Input, Label } from "@sveltestrap/sveltestrap";
	import { z } from "zod";

    let result = $state({
        username: "",
        email: "",
        privilege: PrivilegeLevel.BASIC as PrivilegeLevel
    })

    let passwordForm: PasswordFormPart;
    let confirmPasswordFormPart: PasswordFormPart;


    const validateSchema: z.ZodType = z.object({
        username: z.string().nonempty(),
        email: z.string().email(),
        privilege: z.nativeEnum(PrivilegeLevel)
    });

    export function getResult() {
        const password = passwordForm.getResult();
        const confirmPassword = confirmPasswordFormPart.getResult();

        if (password !== confirmPassword) throw new z.ZodError([{
            code: "custom",
            path: ["password + confirmPassword"],
            message: "Password and Confirmation doesn't match."
        }]);

        const parsedResult: { username: string, email: string, privilege: PrivilegeLevel } = validateSchema.parse(result);
        return {
            ...parsedResult,
            password: password
        };
    }

    export function setResult(input: UserUpsert) {
        result = {
            username: input.username,
            email: input.email,
            privilege: input.privilege
        }

        passwordForm.setResult(input.password);
        confirmPasswordFormPart.setResult("");
    }
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

    <FormGroup>
        <Label for="privilege">Privilege</Label>
        <Input type="select" id="privilege" bind:value={result.privilege}>
            {#each Object.values(PrivilegeLevel) as privilegeLevel}
                <option value={privilegeLevel}>{privilegeLevel}</option>
            {/each}
        </Input>
    </FormGroup>

    <PasswordFormPart toFor="passwordForm" label="Password" bind:this={passwordForm}/>
    <PasswordFormPart toFor="confirmPassword" label="Confirm Password" bind:this={confirmPasswordFormPart} />
</Form>