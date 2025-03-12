<script lang="ts">
	import {
		Navbar,
		NavbarBrand,
		Button,
		Form,
		FormGroup,
		Input,
		Modal,
		ModalBody,
		Container,
		Icon
	} from '@sveltestrap/sveltestrap';
	import { makeLoginRequest } from '$lib';
	import { goto } from '$app/navigation';

	let showModal = false;
	let username = '';
	let password = '';
	let showPassword = false;

	function togglePassword() {
		showPassword = !showPassword;
	};


	async function login() {
		const result = await makeLoginRequest({
			username: username,
			password: password
		});

		if (result) {
			goto("./portal/dashboard");
		}
	}
</script>

<!-- Fixed Navbar -->
<Navbar
	color="dark"
	class="d-flex justify-content-between align-items-center px-3 position-fixed top-0 w-100 shadow"
	style="z-index: 1050;"
>
	<NavbarBrand href="https://bfpechague.com.ph" class="text-warning fw-bold"
		>https://bfpechague.com.ph</NavbarBrand
	>
	<Button color="warning" class="m-0" on:click={() => (showModal = true)}>LOG IN</Button>
</Navbar>

<!-- Fixed Background & Centered Content -->
<div class="vh-100 w-100 position-fixed top-0 start-0 overflow-hidden">
	<img
		src="homepage-background.png"
		alt="Background"
		class="img-fluid w-100 h-100 object-fit-cover position-fixed top-0 start-0"
	/>
	<div
		class="position-absolute top-50 start-50 translate-middle text-white text-center bg-dark bg-opacity-75 p-4 rounded"
	>
		<h1 class="display-4 text-warning">WELCOME TO<br />BFP ECHAGUE!</h1>
		<hr class="border border-warning w-100 my-2" style="height: 3px;" />
		<p class="lead text-warning">FIRE MAPPING SYSTEM</p>
		<hr class="border border-warning w-100 my-2" style="height: 3px;" />
		<h5 class="text-warning">CONTACT DEVELOPERS</h5>
		<p class="text-warning d-flex align-items-center gap-2 justify-content-center m-0">
			<Icon name="telephone-fill" class="fs-3" /> 09123456789 | <Icon
				name="telephone-fill"
				class="fs-3"
			/> 09246810123
		</p>
	</div>
</div>

<!-- Login Modal -->
<Modal bind:isOpen={showModal}>
	<ModalBody class="text-center position-relative">
		<Button
			color="white"
			class="position-absolute top-0 end-0 m-2 p-0 border-0"
			on:click={() => (showModal = false)}
		>
			<Icon name="x" class="h1" />
		</Button>
		<Icon name="person-circle" class="fs-1" />
		<div class="mt-2 mb-3">
			<h3 class="fw-bold">ADMIN</h3>
		</div>
		<Form on:submit={login}>
			<FormGroup>
				<Input type="text" id="username" bind:value={username} required placeholder="Username" />
			</FormGroup>

			<FormGroup>
				<div class="d-flex align-items-center position-relative">
					<Input
						type={showPassword ? 'text' : 'password'}
						id="password"
						bind:value={password}
						required
						placeholder="Password"
						class="w-100"
					/>
					<Button
						color="white"
						on:click={togglePassword}
						type="button"
						class="position-absolute end-0 me-2 top-50 translate-middle-y p-1"
					>
						<Icon name={showPassword ? 'eye-slash' : 'eye'} class="fs-5" />
					</Button>
				</div>
			</FormGroup>

			<Button color="dark" class="w-50 mt-3" type="submit">Log In</Button>
		</Form>
		<Container class="text-center mt-2">
			<Button color="link">Forgot password?</Button>
		</Container>
	</ModalBody>
</Modal>
