<script lang="ts">
	import { getCurrentUser, getZodErrorMessage, UserAPIRoute, type DeepPartial, type UserGet, type UserUpsert } from "$lib";
	import DataDisplay from "$lib/components/display/dataDisplay.svelte";
	import GeneralHr from "$lib/components/generalHr.svelte";
	import UserForm from "$lib/components/model/user/userForm.svelte";
	import { PrivilegeLevel } from "@prisma/client";
	import { Button, Card, CardBody, Icon, Modal, ModalBody, ModalHeader, Table } from "@sveltestrap/sveltestrap";
	import { onMount, tick } from "svelte";
	import { ZodError } from "zod";


    let users: UserGet[] | null = $state(null);

    async function loadUsers() {
        const result = await UserAPIRoute.instance.getMany();
        if (!result.isOK()) {
			alert("Failed to load users.");
			return;
		}

        users = (await result.getMoreInfoParsed());
    }



    let showCreateModal: boolean = $state(false);
    let createForm: UserForm;

	function openCreateModal() {
        showCreateModal = true;
        
        tick().then(() => {
            createForm.setResult({
                username: "",
                email: "",
                privilege: PrivilegeLevel.BASIC
            })
        })
    }
    function closeCreateModal() {
        showCreateModal = false;
    }
    async function submitCreate() {
        let formResult: Omit<UserUpsert, "password"> & { password: string | undefined };
        try {
            formResult = createForm.getResult();
        }
        catch (e) {
            if (e instanceof ZodError) {
                alert(getZodErrorMessage(e));
                return;
            }

            throw e;
        }

        if (formResult.password === undefined) {
            alert("Password is not set.");
            return;
        }

        const result = await UserAPIRoute.instance.post({
            username: formResult.username,
            email: formResult.email,
            password: formResult.password,
            privilege: formResult.privilege
        });
        if (!(await result.isOK())) {
            alert("An error occurred while processing your request.");
            return;
        }

        closeCreateModal();
        loadUsers();
        alert("User added.")
    }



    onMount(async () => {
        await loadUsers();
    })
</script>

<div class="d-flex flex-column mt-3 p-5">
	<div class="d-flex w-100 justify-content-center">
		<h1 class="text-primary">USERS</h1>
	</div>

    <div class="d-flex w-100 justify-content-center">
        <p class="text-center"><i>
            All users are shown here.<br>
            Users cannot be deleted to maintain data integrity.
        </i></p>
    </div>

	<Card class="w-75 shadow border w-100 mt-3">
		<CardBody>
            <div class="d-flex flex-column w-100 justify-content-center">
                <div class="d-flex w-100 justify-content-center">
                    <Button color="success" class="w-25" on:click={openCreateModal}>
                        Create User
                    </Button>
                </div>
                <div class="d-flex flex-column w-100 align-items-center">
                    <Table bordered striped size="sm" responsive>
                        <thead>
                            <tr class="table-primary align-items-center">
                                <th>Username</th>
                                <th>Email</th>
                                <th>Privilege</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if users !== null}
                                {#each users as user (user.id)}
                                {#key user.id}
                                    <tr>
                                        <td><DataDisplay data={user.username} /></td>
                                        <td><DataDisplay data={user.email} /></td>
                                        <td><DataDisplay data={user.privilege} /></td>
                                    </tr>
                                {/key}
                                {/each}
                            {/if}
                        </tbody>
                    </Table>
                </div>
            </div>
		</CardBody>
	</Card>
</div>

<Modal bind:isOpen={showCreateModal}>
    <div class="d-flex w-100 p-2 justify-content-between align-items-center">
        <div class="d-flex w-100 justify-content-center">
            <h2 class="m-0 text-primary">EDITING USER</h2>
        </div>
        <Button
            color="white"
            class="p-0 m-0"
            on:click={closeCreateModal}
        >
            <Icon name="x" class="h1" />
        </Button>
    </div>

	<ModalBody class="text-center position-relative">
		<UserForm bind:this={createForm}/>

        <GeneralHr />

        <Button color="primary" class="w-100" on:click={submitCreate}>Create User</Button>
	</ModalBody>
</Modal>