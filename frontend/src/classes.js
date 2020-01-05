// ### MODEL CLASSES ###
class User {
    constructor(userData) {
        this.id = userData.user.id;
        this.username = userData.user.username;
        this.name = userData.user.name;
        this.contactPreference = userData.user.contactPreference;
        this.email = userData.user.email;
        this.phone = userData.user.phone;
        this.carrier = userData.user.carrier;
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