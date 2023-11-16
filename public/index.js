window.onload = async function() {
  const userName = localStorage.getItem('userName');
  if (userName) {
    document.getElementById('userName').textContent = userName;
    setDisplay('login/register', 'none');
    setDisplay('continue-form', 'block');
  } else {
    setDisplay('login/register', 'block');
    setDisplay('continue-form', 'none');
  }
}

// (async () => {
//   const userName = localStorage.getItem('userName');
//   if (userName) {
//     //document.querySelector('#userName').textContent = userName;
//     setDisplay('login/register', 'none');
//     setDisplay('continueControls', 'block');
//   } else {
//     setDisplay('login/register', 'block');
//     setDisplay('continueControls', 'none');
//   }
// })();

async function login() {
  const userName = document.querySelector("#name")?.value;
  const password = document.querySelector("#password")?.value;
  const response = await fetch('/api/auth/login', {
    method: 'post',
    body: JSON.stringify({username: userName, password: password}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem("userName", userName);
    window.location.href = "recipes.html";
  } else {
    const body = await response.json();
    alert(`⚠ Error: ${body.msg}`);
  }
}

async function register() {
  const username = document.querySelector("#reg_name")?.value;
  const password = document.querySelector("#reg_password")?.value;
  const email = document.querySelector("#reg_email")?.value;
  const response = await fetch('/api/auth/create', {
    method: 'post',
    body: JSON.stringify({username: username, email: email, password: password}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
 });

  if (response.ok) {
    localStorage.setItem("userName", username);
    window.location.href = "recipes.html";
  } else {
    const body = await response.json();
    alert(`⚠ Error: ${body.msg}`);
  }
}

function continueLogin() {
  window.location.href = "recipes.html";
}

function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
  // See if we have a user with the given email.
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.getElementById(controlId);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}

function myAnimate() {
    //$('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    $('#register').animate({ height: "toggle", opacity: "toggle" }, "slow");
    $('#login').animate({ height: "toggle", opacity: "toggle" }, "slow");

}