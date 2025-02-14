<script lang="ts">
  import { Navbar, NavbarBrand, Button, Icon} from '@sveltestrap/sveltestrap';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let showModal = false;
  let username = '';
  let password = '';
  let showPassword = false;


  const toggleModal = () => {
    showModal = !showModal;
  };

  const togglePassword = () => {
    showPassword = !showPassword;
  };
</script>



<style>
  .bg {
    background-image: url("background.png");
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
<!-- MAIN CONTENT -->
<div class="d-flex flex-column h-100">
  <Navbar color="secondary">
    <NavbarBrand href="https://bfpechague.com.ph">https://bfpechague.com.ph</NavbarBrand>
    <Button color="success" on:click={toggleModal}>LOG IN</Button>
  </Navbar>
  <div class="d-flex flex-row m-0 p-0 w-100 h-100 overflow-hidden bg-light">
    <div class="d-flex flex-column px-5">
      <h1 class="mt-4 text-emphasis">WELCOME TO BFP ECHAGUE!</h1>
      <hr class="bg-dark">
      <p>FIRE MAPPING SYSTEM</p>
      <hr class="bg-dark">
      <div class="contact">
        <p>CONTACT DEVELOPERS</p>
        <div>
          <Icon name="telephone-fill" />
          09679031671</div>
        <div><Icon name="telephone-fill" />09285908046</div>
      </div>
    </div>
    <div class="container-fluid w-100 h-100 bg"></div>
  </div>
</div>

<!-- LOGIN MODAL WITH SLIDE TRANSITION -->
{#if showModal}
  <div class="modal-overlay" transition:slide={{ duration: 300, easing: cubicOut }}>
    <div class="login-box" transition:slide={{ duration: 300 }}>
      <button class="close-btn" on:click={toggleModal}>&times;</button>
      <h2>Login</h2>
      <div class="input-group">
        <input type="text" bind:value={username} placeholder=" " required>
        <label>Username</label>
      </div>
      <div class="input-group">
        <input type={showPassword ? 'text' : 'password'} bind:value={password} placeholder=" " required>
        <label>Password</label>
        <span class="toggle-password" on:click={togglePassword}>
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </span>
      </div>
      <div class="forgot-password">
        <a href="#">Forgot Password?</a>
      </div>
      <Button color="primary" block on:click={toggleModal}>Login</Button>
    </div>
  </div>
{/if}