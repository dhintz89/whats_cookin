const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const RECIPES_URL = `${BASE_URL}/recipes`
const INGREDIENTS_URL = `${BASE_URL}/ingredients`
const INSTRUCTIONS_URL = `${BASE_URL}/instructions`

document.getElementById('login-submit-btn').addEventListener("click", () => {
    let username = document.querySelector('#login-form .username-input').value
    let password = document.querySelector('#login-form .password-input').value
    submitCredentials(username, password);
});

document.getElementById('signup-submit-btn').addEventListener("click", () => {
    let name = document.querySelector('#signup-form .name-input').value
    let contactPreference = document.querySelector('#signup-form .contactPref-input').value
    let email = document.querySelector('#signup-form .email-input').value
    let phone = document.querySelector('#signup-form .phone-input').value
    let carrier = document.querySelector('#signup-form .carrier-input').value
    let username = document.querySelector('#signup-form .username-input').value
    let password = document.querySelector('#signup-form .password-input').value
    let verifyPass = document.querySelector('#signup-form .verify-password').value
    submitCredentials(username, password, verifyPass, name, contactPreference, email, phone, carrier);
});

function submitCredentials(username, password, verifyPass, name, contactPreference, email, phone, carrier) {
    let formData = {
        username: username,
        password: password,
        verifyPass: verifyPass,
        name: name,
        contactPreference: contactPreference,
        email: email,
        phone: phone,
        carrier: carrier
    };
    fetch(USERS_URL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    // .then(displaySearchPage())  // change from logins to content upon success
    .catch(function(error) {
        alert("Incorrect or Missing Credentials, try again.");
        console.log(error.message);
    });
};