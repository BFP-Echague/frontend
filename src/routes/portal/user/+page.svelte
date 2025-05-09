<script lang="ts">
	import { getCurrentUser, getZodErrorMessage, UserAPIRoute, type DeepPartial, type UserGet, type UserUpsert } from "$lib";
	import DataDisplay from "$lib/components/display/dataDisplay.svelte";
	import GeneralHr from "$lib/components/generalHr.svelte";
	import UserForm from "$lib/components/model/user/userForm.svelte";
	import { Button, Card, CardBody, Icon, Modal, ModalBody, ModalHeader, Table } from "@sveltestrap/sveltestrap";
	import { onMount, tick } from "svelte";
	import { ZodError } from "zod";


    let currentUser: UserGet | null = $state(null);
    let users: UserGet[] | null = $state(null);

    async function loadUsers() {
        const result = await UserAPIRoute.instance.getMany();
        if (!result.isOK()) {
			alert("Failed to load users.");
			return;
		}

        users = (await result.getMoreInfoParsed());
    }


    async function deleteUser(id: number) {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const result = await UserAPIRoute.instance.delete(id);
        if (!(await result.isOK())) {
            alert("Deleting user failed.");
            return;
        }

        loadUsers();
        alert("User deleted.");
    }



    onMount(async () => {
        currentUser = getCurrentUser();
        await loadUsers();
    })
</script>

<div class="d-flex flex-column mt-3 p-5">
	<div class="d-flex w-100 justify-content-center">
		<h1 class="text-primary">USERS</h1>
	</div>

	<Card class="w-75 shadow border w-100 mt-3">
		<CardBody>
			<div class="d-flex flex-column w-100 align-items-center">
                <Table bordered striped size="sm" responsive>
                    <thead>
                        <tr class="table-primary align-items-center">
                            <th>Action</th>
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
                                    <td class="text-center">
                                        <Button
                                            color="danger"
                                            class="m-0"
                                            on:click={() => deleteUser(user.id)}
                                            disabled={user.id === currentUser?.id}
                                        >
                                            <Icon name="trash" />
                                        </Button>
                                    </td>

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
		</CardBody>
	</Card>
</div>