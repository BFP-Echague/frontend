<script lang="ts">
  import { 
    Navbar, NavbarBrand, Button, Form, FormGroup, Label, Input, InputGroup, 
    Modal, ModalHeader, ModalBody, ModalFooter 
  } from '@sveltestrap/sveltestrap';

  let showModal = false;
  let username = '';
  let password = '';
  let showPassword = false;

  const togglePassword = () => {
    showPassword = !showPassword;
  };
</script>

<style>
  .password-container {
    position: relative;
    width: 100%;
  }

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: yellow;
    cursor: pointer;
    font-size: 14px;
  }

  .toggle-password:hover {
    color: orange;
  }
</style>

<!-- NAVIGATION BAR -->
<Navbar color="light">
  <NavbarBrand href="https://bfpechague.com.ph">https://bfpechague.com.ph</NavbarBrand>
  <Button color="success" on:click={() => showModal = true}>LOG IN</Button>
</Navbar>

<!-- BACKGROUND IMAGE SECTION -->
<div class="bg-dark vh-100 position-relative d-flex align-items-center justify-content-center text-white text-center">
  <img src="homepage-background.png" alt="Background" class="img-fluid w-100 h-100 object-fit-cover position-absolute top-0 start-0">
  <div class="position-absolute">
    <h3 class="display-4 text-warning">WELCOME</h3>
    <h3 class="display-4 text-warning">TO</h3>
    <h3 class="display-4 text-warning">BFP ECHAGUE!</h3>
    <hr class="bg-warning">
    <p class="lead text-warning">FIRE MAPPING SYSTEM</p>
    <hr class="bg-warning">
    <h5 class="text-warning">CONTACT DEVELOPERS</h5>
    <p class="text-warning">📞 09123456789 | 📞 09246810123</p>
  </div>
</div>

<!-- LOGIN MODAL USING SVELTETRAP -->
<Modal isOpen={showModal} toggle={() => showModal = false} class="modal-content">
  <ModalHeader toggle={() => showModal = false} class="text-warning">Login</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="username" class="text-warning">Username</Label>
        <Input 
          type="text" 
          id="username" 
          bind:value={username} 
          required 
          class="input-field" 
          placeholder="Enter your username"
        />
      </FormGroup>

      <FormGroup>
        <Label for="password" class="text-warning">Password</Label>
        <div class="password-container">
          <Input 
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            bind:value={password} 
            required 
            class="input-field" 
            placeholder="Enter your password"
          />
          <button type="button" class="toggle-password" on:click={togglePassword}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </FormGroup>

      <p class="text-end">
        <a href="javascript:void(0)" class="text-warning">Forgot Password?</a>
      </p>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="warning" block on:click={() => showModal = false}>Login</Button>
  </ModalFooter>
</Modal>
