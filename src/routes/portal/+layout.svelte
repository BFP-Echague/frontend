<script lang="ts">
	import { goto } from '$app/navigation';
	import { getCurrentUser, makeLogoutRequest } from '$lib';
	import NavHr from '$lib/components/nav/navHr.svelte';
	import NavLinkCustom from '$lib/components/nav/navLinkCustom.svelte';
	import {
		Nav,
		NavItem,
		Button,

		Icon

	} from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';
	import { cubicOut, expoOut } from 'svelte/easing';
	import { fade, fly, slide, type TransitionConfig } from 'svelte/transition';

	let { children } = $props();


	let sidebarOpen: boolean = $state(true);
	let sidebarButtonColor: string = $derived(sidebarOpen ? "primary" : "light");

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function onLogout() {
		if (confirm('Are you sure you want to logout?')) {
			const result = makeLogoutRequest();
			if (!result) {
				alert('Failed to logout.');
				return;
			}

			goto('/');
		}
	}

	onMount(() => {
		if (getCurrentUser() === null) {
			alert('You need to login first.');
			goto('/');
			return;
		}

		sidebarOpen = false;
	});
</script>


<style>
	.sidebar {
		width: 350px;
	}


	.z-100 {
		z-index: 100;
	}
	.z-99 {
		z-index: 99;
	}

	.overlay {
		background-color: #00000047;
	}
</style>



<div class="d-flex flex-row w-100 h-100">
	<div class="position-absolute z-100 h-100 d-flex flex-row">
		{#if sidebarOpen}
			<div class="z-3 overflow-hidden bg-light" transition:slide={{ axis: "x", duration: 500, easing: expoOut }}>
				<div class="h-100 sidebar overflow-hidden" transition:fly={{ x: "-150%", duration: 500, easing: expoOut }}>
					<Nav vertical class="d-flex flex-column w-100 overflow-auto p-3">
						<div class="d-flex w-100 justify-content-center">
							<h1>BFP Fire Map</h1>
						</div>

						<NavHr />

						<NavItem>
							<NavLinkCustom route="/portal/dashboard" iconName="grid-1x2-fill" label="Dashboard" />
						</NavItem>
						<NavItem>
							<NavLinkCustom route="/portal/cluster" iconName="circle-square" label="Clustering" />
						</NavItem>
						<NavItem>
							<NavLinkCustom route="/portal/summary" iconName="file-earmark-bar-graph" label="Summary" />
						</NavItem>

						<NavHr />

						<NavItem>
							<NavLinkCustom route="/portal/report/create" iconName="pencil" label="Create Report" />
						</NavItem>
						<NavItem>
							<NavLinkCustom route="/portal/search" iconName="search" label="Search Report" />
						</NavItem>
					</Nav>
				</div>
			</div>
		{/if}

		<div class="d-flex flex-row">
			<div class="position-absolute">
				<Button color={sidebarButtonColor} class="m-0 mt-3 ms-3" on:click={toggleSidebar}>
					<h5 
						class="m-0"
						class:text-light={sidebarOpen}
						class:text-dark={!sidebarOpen}
					>
						<Icon name="list" />
					</h5>
				</Button>
			</div>
		</div>
	</div>


	<div class="d-flex w-100">
		{#if sidebarOpen}
			<div class="position-absolute d-flex flex-row w-100 h-100 z-99" transition:fade={{ duration: 500, easing: expoOut }}>
				<div class="overlay w-100 h-100" onclick={toggleSidebar} onkeyup={toggleSidebar} role="button" tabindex="0"></div>
			</div>
		{/if}

		<div class="d-flex flex-column w-100 h-100 overflow-auto">
			{@render children()}
		</div>
	</div>
</div>
