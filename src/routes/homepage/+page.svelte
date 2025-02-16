<script lang="ts">
  import { 
    Navbar, NavbarBrand, Button, Form, FormGroup, Label, Input, 
    Modal, ModalHeader, ModalBody, ModalFooter, Container, InputGroup, Icon 
  } from '@sveltestrap/sveltestrap';

  let showModal = false;
  let username = '';
  let password = '';
  let showPassword = false;

  const togglePassword = () => {
    showPassword = !showPassword;
  };

  const openModal = (event) => {
    event.preventDefault(); // Prevent default behavior
    showModal = true; 
  };

  const closeModal = () => {
    showModal = false;
  };

  const login = (event) => {
    event.preventDefault(); // Prevent default behavior
    console.log("Logging in with:", { username, password });
    closeModal(); // Close modal after login
  };
</script>

<!-- NAVIGATION BAR -->
<Navbar color="light" class="d-flex justify-content-between align-items-center px-3">
  <NavbarBrand href="https://bfpechague.com.ph">https://bfpechague.com.ph</NavbarBrand>
  <Button color="success" on:click={openModal}>LOG IN</Button>
</Navbar>

<!-- BACKGROUND IMAGE SECTION -->
<div class="bg-dark vh-100 position-relative d-flex align-items-center justify-content-center text-white text-center overflow-hidden">
  <img src="homepage-background.png" alt="Background" class="img-fluid w-100 h-100 object-fit-cover position-absolute top-0 start-0">
  <div class="position-absolute d-flex flex-column align-items-center p-3 bg-dark bg-opacity-75 rounded">
    <h1 class="display-4 text-warning text-center">WELCOME TO<br>BFP ECHAGUE!</h1>
    <hr class="bg-warning w-75">
    <p class="lead text-warning text-center">FIRE MAPPING SYSTEM</p>
    <hr class="bg-warning w-75">
    <h5 class="text-warning">CONTACT DEVELOPERS</h5>
    <p class="text-warning d-flex align-items-center gap-2">
      <Icon name="telephone-fill" /> 09123456789 | <Icon name="telephone-fill" /> 09246810123
    </p>
  </div>
</div>

<!-- LOGIN MODAL -->
<Modal isOpen={showModal} toggle={closeModal}>
  <ModalHeader toggle={closeModal}></ModalHeader>
  <ModalBody>
    <Form on:submit={login}>
      <FormGroup>
        <Label for="username" class="text-warning">Username</Label>
        <Input 
          type="text" 
          id="username" 
          bind:value={username} 
          required 
          placeholder="Enter your username"
        />
      </FormGroup>

      <FormGroup>
        <Label for="password" class="text-warning">Password</Label>
        <InputGroup class="position-relative">
          <Input 
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            bind:value={password} 
            required 
            placeholder="Enter your password"
            class="pr-5"
          />
          <Button 
            color="white" 
            on:click={togglePassword} 
            type="button" 
            class="position-absolute end-0 top-50 translate-middle-y me-2 p-1"
          >
            <Icon name={showPassword ? "eye-slash" : "eye"} />
          </Button>
        </InputGroup>
      </FormGroup>
      

      <ModalFooter class="d-flex justify-content-center w-100">
        <Button color="warning" class="w-50" type="submit">Login</Button>
      </ModalFooter>
    </Form>
  </ModalBody>
  <Container class="d-flex justify-content-center w-100">
    <Button color="link" class="text-warning">Forgot Password?</Button>
  </Container>
</Modal>
