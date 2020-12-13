const BASE_URL = "https://whats-cookin-api.herokuapp.com" // must change to "http://localhost:3000" for dev work
const USERS_URL = `${BASE_URL}/users`
const SESSIONS_URL = `${BASE_URL}/sessions`
const RECIPES_URL = `${BASE_URL}/recipes`
const INGREDIENTS_URL = `${BASE_URL}/ingredients`
const INSTRUCTIONS_URL = `${BASE_URL}/instructions`
let currentUser = {}

// ### LOGIN PAGE ###

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
    fetch(`${SESSIONS_URL}/${currentUser.id}`, {headers: {"Content-Type": "application/json", "Accept": "application/json", "Authorization": `Bearer ${window.localStorage.getItem("token")}`}, mode: 'cors', credentials: 'include', method: 'DELETE'})
    .then(currentUser = {})
    .then(localStorage.clear())
    .then(backToLogin())
    .catch(function(error) {
        console.log(error)
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
    .then(userData => {
        currentUser = new User(userData)
        window.localStorage.setItem("token", userData.jwt)
    })
    .then(displaySearchPage())  // change from logins to content upon success
    .catch(function(error) {
        alert("Incorrect user or login info");
        backToLogin()
        console.log(error)
    });
};

// ### SEARCH PAGE ###

// Search functionality
function displaySearchPage() {
    document.querySelector('.creds').classList.add('hidden')
    document.querySelector('.search').classList.remove('hidden')
    document.querySelector('#search_btn').addEventListener('click', () => {
        let keyword = document.querySelector('.search .recipe_search').value;
        console.log(keyword)
        fetch(`${RECIPES_URL}/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({keyword: keyword})
        })
        .then(resp => resp.json())
        .then(datalist => displaySearchResults(datalist))
        .catch(function(error) {
            alert("You must log in to perform that action");
            backToLogin()
            console.log(error)
        });
    });
};

function displaySearchResults(search_results) {
    console.log("now displaying search results")
    if(document.querySelector('.recipe_outer')) {
        document.querySelectorAll('.recipe_outer').forEach(card => card.remove())
    }
    if(document.querySelector('.resultSection')) {
        document.querySelector('.resultSection').remove()
    }
    let resultSection;
    let recipeList;
    let recipe_outer;
    let recipe_inner;

    document.querySelector('.search').classList.add('sendToTop')
    resultSection = document.createElement('div')    // need to add control flow for existing element
    resultSection.classList.add('resultSection')
    recipeList = search_results.results

    for (let i=0; i< recipeList.length; i++) {
        recipe_outer = document.createElement('div')
        recipe_outer.classList.add("recipe_outer")
        recipe_inner = document.createElement('span')
        recipe_inner.classList.add("recipe_inner")
        recipe_inner.innerHTML = `<h3>${recipeList[i].title}</h3><p>Ready in ${recipeList[i].readyInMinutes} minutes</p><img src=https://spoonacular.com/recipeImages/${recipeList[i].id}-240x150.jpg alt=${recipeList[i].image}>`
        recipe_outer.appendChild(recipe_inner)
        recipe_outer.addEventListener('click', () => {selectRecipe(recipeList[i].id)})

        resultSection.appendChild(recipe_outer)
    }

    document.querySelector('main').appendChild(resultSection)
}

// ### RECIPE DETAILS PAGE ###

// build & display recipe details
function selectRecipe(recipeId) {
    fetch(`${RECIPES_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
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
            "Accept": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        mode: "cors",
        credentials: "include"
    })
        .then(resp => resp.json())
        .then(recipe => displayRecipe(recipe.recipe))
        .catch(function(error) {
            alert("You must log in to perform that action");
            backToLogin()
            console.log(error)
        }))
    .catch(function(error) {
        alert("You must log in to perform that action");
        backToLogin()
        console.log(error)
    });
};

function displayRecipe(recipeData) {
    // find or create JS objects
    let recipe = store.recipes.find((recipe) => recipe.id === recipeData.id)
    if(recipe === undefined) {      
        recipe = new Recipe(recipeData)
        recipeData.recipe_ingredients.forEach(rec => new Ingredient(rec))
        recipeData.instructions.forEach(ins => new Instruction(ins))
    }

    // switch views from recipe select list to recipe detail
    document.querySelectorAll('.recipe_outer').forEach(rc => rc.classList.add('hidden'))
    let recipeDisplay = document.createElement('div')
    recipeDisplay.classList.add("recipeDisplay")
    recipeDisplay.innerHTML = `<h1>${recipe.name}</h1><br>`
    document.querySelector('.resultSection').appendChild(recipeDisplay)
    
    // display recipe on page
    let image = document.createElement('div')
    image.innerHTML = `<img src=${recipe.image} alt=recipeImage>`
    
    let ingredientSection= document.createElement('div')
    ingredientSection.id ="ingredientSection"
    ingredientSection.innerHTML = "<h2><u>Ingredients</u></h2><br>"
    let ingredientList = document.createElement('ul')
    ingredientList.classList.add("checkBoxList")
    recipe.ingredients().forEach(ing => {
        let line = document.createElement("li")
        line.innerHTML = `<input type="checkbox" name=${ing.id}>${ing.quantity} ${ing.measure} - ${ing.type}<br>`
        ingredientList.appendChild(line)
    })
    ingredientSection.appendChild(ingredientList)
    let shopListButton = document.createElement('button')
    shopListButton.classList.add("shopListButton")
    shopListButton.innerText = "Add Selected to Shoplist"
    shopListButton.addEventListener("click", () => {sendShopList()})
    ingredientSection.appendChild(shopListButton)
    
    let instructionSection = document.createElement('div')
    instructionSection.id = "instructionSection"
    instructionSection.innerHTML = "<h2><u>Instructions</u></h2><br>"
    let instructionList = document.createElement('ol')
    recipe.instructions().forEach(ins => {
        let line = document.createElement("li")
        line.innerHTML = `<button class="completeStep">complete</button>${ins.description}<br>`
        line.querySelector('button').addEventListener("click", (e) => {
            let targetText = e.target.parentElement
            if(targetText.style.textDecoration === "" || targetText.style.textDecoration === "none") {
                targetText.style.textDecoration = "line-through"
            } else {
                targetText.style.textDecoration = "none"
            }
        })
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
    document.querySelectorAll(".recipe_outer").forEach(rc => rc.classList.remove("hidden"))
    document.querySelector("#backButton").remove()
}

function sendShopList() {
    // returns the ids of each selected recipe-ingredient -> need to POST back to backend
    let selectedList = Array.prototype.slice.call(document.querySelectorAll('#ingredientSection li')).filter(line => line.querySelector('input').checked)
    document.querySelectorAll('#ingredientSection li input').forEach(box => box.checked = false)
    return selectedList.map(line => line.querySelector('input').name)
}

function backToLogin() {
    if(document.querySelector('.recipe_outer')) {
        document.querySelectorAll('.recipe_outer').forEach(card => card.remove())
    }
    if(document.querySelector('.resultSection')) {
        document.querySelector('.resultSection').remove()
    }
    document.querySelector('.search').classList.add('hidden')
    document.querySelector('.choice').classList.remove('hidden');
    document.querySelector('.login').classList.add('hidden');
    document.querySelector('.signup').classList.add('hidden');
    document.querySelector('#login-form .username-input').value = ""
    document.querySelector('#login-form .password-input').value = ""
    document.querySelector('.creds').classList.remove('hidden')
}