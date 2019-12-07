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
    console.log(formData)
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
    .then(console.log(currentUser))
    .then(displaySearchPage())  // change from logins to content upon success
    .catch(function(error) {
        alert("Incorrect or Missing Credentials, try again.");
        console.log(error.message);
    });
};

// Search functionality
function displaySearchPage() {
    console.log("displaying search page")
    document.querySelector('.creds').classList.add('hidden')
    document.querySelector('.search').classList.remove('hidden')
    document.querySelector('#search_btn').addEventListener('click', () => {
        let keyword = document.querySelector('.search .recipe_search').value;
        console.log(keyword)
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
        .then(resp => resp.json())
        .then(datalist => displaySearchResults(datalist))
        .catch(error => console.log(error.message))
    });
};

function displaySearchResults(search_results) {
    console.log("now displaying search results")
    let resultSection
    let recipeList
    let recipeCard

    document.querySelector('.search').classList.add('sendToTop')
    resultSection = document.createElement('div')    // need to add control flow for existing element
    resultSection.classList.add('resultSection')
    recipeList = search_results.results

    for (let i=0; i< recipeList.length; i++) {
        recipeCard = document.createElement('div')
        recipeCard.classList.add("recipeCard")
        recipeCard.innerHTML = `<h3>${recipeList[i].title}</h3><p>Ready in ${recipeList[i].readyInMinutes} minutes</p><img src=https://spoonacular.com/recipeImages/${recipeList[i].id}-240x150.jpg alt=${recipeList[i].image}>`
        recipeCard.addEventListener('click', () => {displayRecipePage(recipeList[i].id)})

        resultSection.appendChild(recipeCard)
    }

    document.querySelector('main').appendChild(resultSection)
}

// build & display recipe details
function displayRecipePage(recipeId) {
    fetch(`${RECIPES_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({recipe_id: recipeId})
    })
    .then(resp => resp.json())
    .then(recData => console.log(recData))
    .catch(error => console.log(error.message))
};



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

