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
  .content {
    display: flex;
    height: calc(100vh - 50px);
    position: relative;
  }

  .left-panel {
    width: 35%;
    padding: 20px;
    background-color: #cc0000;
    color: #ffcc00;
    text-align: center;
  }

  .left-panel h1 {
    font-size: 65px;
    font-weight: bold;
    color: #ffee06;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .left-panel hr {
    border: none;
    height: 2px;
    background: #ffee06;
    width: 80%;
    margin: 10px auto;
  }

  .left-panel p {
    font-size: 18px;
    font-weight: bold;
  }

  .contact {
    margin-top: 20px;
  }

  .contact div {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .right-panel {
    flex-grow: 2;
    background: url('background.png') no-repeat center center;
    background-size: cover;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .login-box {
    position: relative;
    background: rgba(134, 9, 9, 0.9);
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    width: 320px;
    text-align: center;
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }

  .close-btn:hover {
    color: #ffcc00;
  }

  .input-group {
    position: relative;
    margin: 20px 0;
  }

  .input-group input {
    width: 100%;
    padding: 8px 0;
    background: transparent;
    border: none;
    border-bottom: 2px solid #fff;
    color: #fff;
    font-size: 16px;
    outline: none;
    transition: 0.3s;
  }

  .input-group input:focus {
    border-bottom: 2px solid #ff0;
  }

  .input-group label {
    position: absolute;
    left: 0;
    bottom: 8px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    transition: 0.3s ease-in-out;
    pointer-events: none;
  }

  .input-group input:focus ~ label,
  .input-group input:not(:placeholder-shown) ~ label {
    bottom: 30px;
    font-size: 12px;
    color: #ff0;
  }

  .toggle-password {
    cursor: pointer;
    color: #ccc;
    position: absolute;
    right: 0;
    bottom: 10px;
  }

  .forgot-password {
    margin-bottom: 10px;
  }

  .forgot-password a {
    color: #ffcc00;
    text-decoration: none;
    font-size: 14px;
  }

  .forgot-password a:hover {
    text-decoration: underline;
  }
</style>

<!-- NAVIGATION BAR -->
<Navbar color="secondary">
  <NavbarBrand href="https://bfpechague.com.ph">https://bfpechague.com.ph</NavbarBrand>
  <Button color="success" on:click={toggleModal}>LOG IN</Button>
</Navbar>

<!-- MAIN CONTENT -->
<div class="content">
  <div class="left-panel">
    <h1>WELCOME TO BFP ECHAGUE!</h1>
    <hr>
    <p>FIRE MAPPING SYSTEM</p>
    <hr>
    <div class="contact">
      <p>CONTACT DEVELOPERS</p>
      <div><Icon name="telephone-fill" />09679031671</div>
      <div><Icon name="telephone-fill" />09285908046</div>
    </div>
  </div>
  <div class="right-panel"></div>
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