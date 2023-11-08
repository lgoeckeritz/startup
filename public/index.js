function login() {
    const nameEl = document.querySelector("#name");
    const passwordEl = document.querySelector("#password")
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("userPassword", passwordEl.value);
    window.location.href = "recipes.html";
}

function register() {
    const nameEl = document.querySelector("#reg_name");
    const passwordEl = document.querySelector("#reg_password");
    const emailEl = document.querySelector("#reg_email");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("userPassword", passwordEl.value);
    localStorage.setItem("userEmail", emailEl.value);
    window.location.href = "recipes.html";
}

function myAnimate() {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
}