<script lang="ts">
  import { 
    Navbar, NavbarBrand, Button, Form, FormGroup, Label, Input, 
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
  /* Password visibility button */
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

  /* Custom Modal Styling */
  :global(.modal-content) {
    background-color: red !important;
    color: yellow !important;
    border: 2px solid red;
  }

  :global(.modal-header),
  :global(.modal-footer) {
    background-color: red !important;
    color: yellow !important;
    border-bottom: 2px solid red;
  }

  :global(.modal-body) {
    background-color: red !important;
    color: yellow !important;
  }

  /* Forgot Password Styling */
  .forgot-password {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }

  .forgot-password a {
    text-decoration: none;
    color: yellow;
    font-weight: bold;
  }

  .forgot-password a:hover {
    color: yellow;
  }

  /* Centered Login Button */
  .button-container {
    display: flex;
    justify-content: center;
    width: 100%;
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

<!-- LOGIN MODAL -->
<Modal isOpen={showModal} toggle={() => showModal = false} class="custom-modal">
  <ModalHeader toggle={() => showModal = false}></ModalHeader>
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

      <!-- Centered Forgot Password -->
      <div class="forgot-password">
        <a href="javascript:void(0)">Forgot Password?</a>
      </div>
      
    </Form>
  </ModalBody>
  <ModalFooter>
    <div class="button-container">
      <Button color="warning" class="login-button" on:click={() => showModal = false}>Login</Button>
    </div>
  </ModalFooter>
</Modal>
