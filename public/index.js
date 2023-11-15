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

//to test the database connection
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

testConnection();