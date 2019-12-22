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
        recipeCard.addEventListener('click', () => {selectRecipe(recipeList[i].id)})

        resultSection.appendChild(recipeCard)
    }

    document.querySelector('main').appendChild(resultSection)
}

// build & display recipe details
function selectRecipe(recipeId) {
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
    .then(recId => fetch(`${RECIPES_URL}/${recId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: "cors",
        credentials: "include"
    })
        .then(resp => resp.json())
        .then(recipe => displayRecipe(recipe.recipe))
        .catch(error => console.log(error.message)))
    .catch(error => console.log(error.message))
};

function displayRecipe(recipeData) {
    console.log(recipeData)
    // create JS objects
    let recipe = new Recipe(recipeData)
    recipeData.recipe_ingredients.forEach(rec => new Ingredient(rec))
    recipeData.instructions.forEach(ins => new Instruction(ins))

    // switch views from recipe select list to recipe detail
    document.querySelectorAll('.recipeCard').forEach(rc => rc.classList.add('hidden'))
    let recipeDisplay = document.createElement('div')
    recipeDisplay.classList.add("recipeDisplay")
    recipeDisplay.innerHTML = `<h1>${recipe.name}</h1><br>`
    document.querySelector('.resultSection').appendChild(recipeDisplay)
    
    // display recipe
    let image = document.createElement('div')
    image.innerHTML = `<img src=${recipe.image} alt=recipeImage>`
    
    let ingredientSection= document.createElement('div')
    ingredientSection.id ="ingredientSection"
    ingredientSection.innerHTML = "<h2><u>Ingredients</u></h2><br>"
    let ingredientList = document.createElement('ul')
    recipe.ingredients().forEach(ing => {
        let line = document.createElement("li")
        line.innerHTML = `<p>${ing.quantity} ${ing.measure} - ${ing.type}</p><br>`
        ingredientList.appendChild(line)
    })
    ingredientSection.appendChild(ingredientList)
    
    let instructionSection = document.createElement('div')
    instructionSection.id = "instructionSection"
    instructionSection.innerHTML = "<h2><u>Instructions</u></h2><br>"
    let instructionList = document.createElement('ol')
    recipe.instructions().forEach(ins => {
        let line = document.createElement("li")
        line.innerHTML = `<p>${ins.description}</p><br>`
        instructionList.appendChild(line)
    })
    instructionSection.appendChild(instructionList)

    recipeDisplay.appendChild(image)
    recipeDisplay.appendChild(ingredientSection)
    recipeDisplay.appendChild(instructionSection)

    
    // create back button
    let backButton = document.createElement('button')
    backButton.id = "backButton"
    backButton.innerText = "Back To Results"
    backButton.addEventListener("click", () => {backToResultsPage()})
    document.querySelector("header").appendChild(backButton)
}

function backToResultsPage() {
    document.querySelector(".recipeDisplay").remove()
    document.querySelectorAll(".recipeCard").forEach(rc => rc.classList.remove("hidden"))
    document.querySelector("#backButton").remove()
}



// ### Model Classes ###
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

// store variable for object associations
let store = {recipes: [], ingredients: [], instructions: []}

class Recipe {
    constructor(recipeData) {
        this.id = recipeData.id;
        this.name = recipeData.name;
        this.image = recipeData.image;
        this.minsToComplete = recipeData.mins_to_complete;
        this.likeCount = recipeData.like_count;
        this.rating = recipeData.rating;
        this.sourceUrl = recipeData.source_url;
        store.recipes.push(this)
    }

    ingredients() {
        return store.ingredients.filter((ing) => ing.recipeId === this.id)
    }

    instructions() {
        return store.instructions.filter((ins) => ins.recipeId === this.id)
    }
}

class Ingredient {
    constructor(ingredientData) {
        this.id = ingredientData.id
        this.type = ingredientData.ingredientType
        this.quantity = ingredientData.quantity
        this.measure = ingredientData.measure
        this.onShopList = ingredientData.onShopList
        this.storeLocation = ingredientData.storeLocation
        this.recipeId = ingredientData.recipe_id
        store.ingredients.push(this)
    }
}

class Instruction {
    constructor(instructionData) {
        this.id = instructionData.id
        this.description = instructionData.description
        this.complete = instructionData.complete
        this.recipeId = instructionData.recipe_id
        store.instructions.push(this)
    }
}