const BASE_URL = "http://localhost:8000"
const USERS_URL = `${BASE_URL}/users`
const RECIPES_URL = `${BASE_URL}/recipes`
const INGREDIENTS_URL = `${BASE_URL}/ingredients`
const INSTRUCTIONS_URL = `${BASE_URL}/instructions`

document.getElementById('login-submit-btn').addEventListener("click", (e) => {
    let username = document.querySelector('#login-form .username-input').value
    let password = document.querySelector('#login-form .password-input').value
    console.log(`${username} ${password}`);
});