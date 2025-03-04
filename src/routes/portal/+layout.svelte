<script lang="ts">
	import { goto } from '$app/navigation';
	import { getCurrentUser, makeLogoutRequest } from '$lib';
	import { Navbar, Container, Nav, NavItem, NavLink, Icon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Styles } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';

	let { children } = $props();

    onMount(() => {
        if (getCurrentUser() === null) {
            alert("You need to login first.");
            goto('/');
        }
    })


    function onLogout() {
        if (confirm("Are you sure you want to logout?")) {
            const result = makeLogoutRequest();
            if (!result) {
                alert("Failed to logout.");
                return;
            }

            goto('/');
        }
    }
</script>

<Styles />

<div class="d-flex flex-column">
	<!-- Navbar -->
	<Navbar dark color="danger" expand="md" class="mb-4 shadow justify-content-between">
		<Container class="d-flex align-items-center justify-content-between">
			<!-- Left-aligned Dashboard link -->
			<Nav navbar>
				<NavItem>
					<NavLink href="#" class="text-white fs-5 fw-bold">
						<i class="bi bi-house-door me-1"></i>Dashboard
					</NavLink>
				</NavItem>
			</Nav>

			<!-- Center-aligned Title with Larger and Bolder Font -->
			<span
				class="navbar-brand text-white text-center"
				style="font-size: 1.8rem; font-weight: 700;"
			>
				<i class="bi bi-fire me-2"></i>BFP Fire Map System - Echague
			</span>

			<!-- Right-aligned Search and Profile Icon -->
			<Nav navbar class="d-flex align-items-center">
				<NavItem>
					<NavLink href="#" class="text-white fs-5 fw-bold me-3">
						<Icon name="search" class="me-1" />Search
					</NavLink>
				</NavItem>
				<NavItem>
					<Dropdown>
						<DropdownToggle caret>
                            <Icon name="person-circle" class="me-1" />
                        </DropdownToggle>
						<DropdownMenu end>
							<DropdownItem header>User Actions</DropdownItem>
							<DropdownItem on:click={onLogout}>Logout</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavItem>
			</Nav>
		</Container>
	</Navbar>

	<div class="mx-5 mb-5 p-0 d-flex flex-column">
		{@render children()}
	</div>
</div>
