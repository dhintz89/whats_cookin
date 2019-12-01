const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const SESSIONS_URL = `${BASE_URL}/sessions`
const RECIPES_URL = `${BASE_URL}/recipes`
const INGREDIENTS_URL = `${BASE_URL}/ingredients`
const INSTRUCTIONS_URL = `${BASE_URL}/instructions`
let currentUser = {}

// select signup or login and display correct form
document.getElementById('login-link').addEventListener("click", () => {
    document.querySelector('.choice').classList.add('hidden');
    document.querySelector('.login').classList.remove('hidden');
});

document.getElementById('signup-link').addEventListener("click", () => {
    document.querySelector('.choice').classList.add('hidden');
    document.querySelector('.signup').classList.remove('hidden');
});

// submit signup or login form data to backend
document.getElementById('login-submit-btn').addEventListener("click" || "keypress", () => {
    let url = SESSIONS_URL
    let username = document.querySelector('#login-form .username-input').value
    let password = document.querySelector('#login-form .password-input').value
    submitCredentials(url, username, password);
});

document.getElementById('signup-submit-btn').addEventListener("click", () => {
    let url = USERS_URL
    let name = document.querySelector('#signup-form .name-input').value
    let contactPreference = document.querySelector('#signup-form .contactPref-input').value
    let email = document.querySelector('#signup-form .email-input').value
    let phone = document.querySelector('#signup-form .phone-input').value
    let carrier = document.querySelector('#signup-form .carrier-input').value
    let username = document.querySelector('#signup-form .username-input').value
    let password = document.querySelector('#signup-form .password-input').value
    let verifyPass = document.querySelector('#signup-form .verify-password').value
    submitCredentials(url, username, password, verifyPass, name, contactPreference, email, phone, carrier);
});

// user logout
document.getElementById('logout-btn').addEventListener("click", () => {
    fetch(`${SESSIONS_URL}/${currentUser.id}`, {headers: {"Content-Type": "application/json", "Accept": "application/json"}, mode: 'cors', credentials: 'include', method: 'DELETE'})
    .then(currentUser = {})
    .catch(function(error) {
        alert("You are already signed out!");
        console.log(error.message);
    });
});

// callback function to submit user data to backend
function submitCredentials(url, username, password, verifyPass, name, contactPreference, email, phone, carrier) {
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
    fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(userData => currentUser = new User(userData))
    .then(displaySearchPage())  // change from logins to content upon success
    .catch(function(error) {
        alert("Incorrect or Missing Credentials, try again.");
        console.log(error.message);
    });
};

function displaySearchPage() {
    document.querySelector('.creds').classList.add('hidden')
    document.querySelector('.search').classList.remove('hidden')
    document.querySelector('#search_btn').addEventListener('click', () => {
        let keyword = document.querySelector('.search .recipe_search').value;
        fetch(`${RECIPES_URL}/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({keyword: keyword})
        })
        .then(resp => console.log(resp.json()))
        // .then(datalist => displaySearchResults(datalist.results))
    });
};

function displaySearchResults(search_results) {
    console.log(search_results);
}



// Model Classes

class User {
    constructor(userData) {
        this.id = userData.id;
        this.username = userData.username;
        this.name = userData.name;
        this.contactPreference = userData.contactPreference;
        this.email = userData.email;
        this.phone = userData.phone;
        this.carrier = userData.carrier;
    }
}