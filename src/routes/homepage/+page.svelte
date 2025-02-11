<script>
    let showModal = false;
</script>

<!-- Navbar -->
<nav class="navbar">
    <span>https://bfpechague.com.ph</span>
    <button type="button" class="login-btn" on:click={() => showModal = true}>LOG IN</button>
</nav>

<!-- Main Content -->
<div class="content">
    <div class="left-panel">
        <h1>WELCOME TO BFP ECHAGUE!</h1>
        <hr/>
        <p>FIRE MAPPING SYSTEM</p>
        <hr/>
        <div class="contact">
            <p>CONTACT DEVELOPERS</p>
            <div>
                <img src="icon.png" alt="Phone Icon" />
                <span>09679031671</span>
            </div>
            <div>
                <img src="icon.png" alt="Phone Icon" />
                <span>09285908046</span>
            </div>
        </div>
    </div>

    <div class="right-panel"></div>
</div>

<!-- Login Modal -->
{#if showModal}
<div 
    class="modal" 
    role="dialog" 
    aria-modal="true" 
    on:click={() => showModal = false} 
    on:keydown={(e) => e.key === "Escape" && (showModal = false)}
    tabindex="0"
>
    <div class="modal-content" on:click|stopPropagation>
        <button class="close" on:click={() => showModal = false}>&times;</button>
        <h2>Login</h2>

        <div class="input-box">
            <input type="text" id="username" required class="name-input" />
            <label for="username" class="name-label">USERNAME</label>
        </div>

        <div class="input-box">
            <input type="password" id="password" required class="name-input" />
            <label for="password" class="name-label">PASSWORD</label>
        </div>

        <button type="button" class="login-btn">Log In</button>

        <div class="modal-footer">
            <button class="forgot-password-btn" type="button">Forgot Password?</button>
        </div>
    </div>
</div>
{/if}

<!-- Styles -->
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: "Poppins", sans-serif;
        letter-spacing: 0.1rem;
        gap: 2rem;
    }

    /* Navbar */
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

    /* Main Content */
    .content {
        display: flex;
        flex-direction: row;
        height: calc(100vh - 50px);
    }

    /* Left Panel */
    .left-panel {
        height: 110%;
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

    /* Right Panel */
    .right-panel {
        flex-grow: 2;
        height: 100vh;
        background-image: url('background.png');
        background-size: cover;
        background-position: center;
        position: relative;
    }

    /* Modal */
    .modal {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal-content {
        background: #fff;
        width: 350px;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        position: relative;
    }
    .close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 22px;
        cursor: pointer;
    }
    .modal-footer {
        margin-top: 10px;
    }

    /* New Styles */
    .input-box {
        position: relative;
        width: 300px;
    }

    .name-input {
        width: 100%;
        padding: 5px;
        border: none;
        border-bottom: 2px solid #ccc;
        outline: none;
        background: transparent;
        color: #333;
        font-size: 1.8rem;
    }

    .name-label {
        position: absolute;
        left: 0;
        padding: 10px 5px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 1.4rem;
        pointer-events: none;
        transition: 0.5s;
    }

    .name-input:valid ~ .name-label,
    .name-input:focus ~ .name-label {
        transform: translateY(-1.5rem);
        color: rgb(162, 162, 198);
        font-size: 0.75rem;
    }

    .login-btn {
        background: none;
        border: none;
        color: #333;
        font-size: 1rem;
        cursor: pointer;
        text-decoration: underline;
    }

    .login-btn:hover {
        text-decoration: none;
    }
</style>
