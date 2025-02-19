<script lang="ts">
    import { Button, Modal } from "@sveltestrap/sveltestrap";

    let open = false;
    function toggle() {
        open = !open;
    }
</script>

<svelte:head>
    <style>
      body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f5f5f5;
      }
  
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #444;
        color: #fff;
      }
  
      .navbar a {
        color: #fff;
        text-decoration: none;
        padding: 5px 15px;
        border: 1px solid #fff;
        border-radius: 5px;
        background-color: #666;
        cursor: pointer;
      }
  
      .navbar a:hover {
        background-color: #888;
      }
  
      .content {
        display: flex;
        flex-direction: row;
        height: calc(100vh - 50px);
      }
  
      .left-panel {
        height: 100%;
        width: 35%;
        padding: 20px;
        background-color: #ce1717;
        box-shadow: 2px 0 5px rgba(255, 255, 255, 0.1);
      }
  
      .left-panel h1 {
        font-size: 4.3rem;
        font-weight: bold;
        text-align: center;
        color: #ffee06;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        letter-spacing: 2px;
      }
  
      .left-panel p {
        font-size: 1.5rem;
        color: #ffee06;
      }
  
      .right-panel {
        flex-grow: 2;
        height: 107%;
        background-image: url('background.png');
        background-size: cover;
        background-position: center;
        position: relative;
      }
  

      
  
      .close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 22px;
        cursor: pointer;
      }
  
      .input-box {
        position: relative;
        margin: 20px 0;
      }
  
      .input-box input {
        width: 90%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        outline: none;
        font-size: 1rem;
      }
  
      .input-box label {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        font-size: 1rem;
        color: #aaa;
        transition: 0.3s ease-in-out;
      }
  
      .input-box input:focus + label,
      .input-box input:valid + label {
        top: 0;
        font-size: 0.8rem;
        color: #ce1717;
      }
  
      .modal button {
        background-color: #ce1717;
        color: white;
        border: none;
        padding: 10px;
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
      }
  
      .modal button:hover {
        background-color: #a11212;
      }
  
      .modal-footer {
        margin-top: 15px;
      }
  
      .modal-footer a {
        text-decoration: none;
        color: #ce1717;
        font-size: 0.9rem;
        display: block;
        margin: 5px 0;
      }
  
      .contact div img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    </style>
  </svelte:head>
  
    <div class="navbar">
      <span>https://bfpechague.com.ph</span>
      <Button color="success" on:click={toggle}>LOG IN</Button>
    </div>
  
    <div class="content">
      <div class="left-panel">
        <h1>WELCOME TO BFP ECHAGUE!</h1>
        <hr>
        <p>FIRE MAPPING SYSTEM</p>
        <hr>
        <div class="contact">
          <p>CONTACT DEVELOPERS</p>
          <div>
            <img src="icon.png" alt="Phone Icon">
            <span>09679031671</span>
          </div>
          <div>
            <img src="icon.png" alt="Phone Icon">
            <span>09285908046</span>
          </div>
        </div>
      </div>
      <div class="right-panel"></div>
    </div>
  
    <!-- Login Modal -->
    <Modal isOpen={open} {toggle}>
      <div class="modal-content">
        <span class="close" id="closeBtn">&times;</span>
        <h2>Login</h2>
  
        <div class="input-box">
          <input type="text" required />
          <label>USERNAME</label>
        </div>
  
        <div class="input-box">
          <input type="password" required />
          <label>PASSWORD</label>
        </div>
  
        <button>Log In</button>
  
        <div class="modal-footer">
          <a>Forgot Password?</a>
        </div>
      </div>
    </Modal>