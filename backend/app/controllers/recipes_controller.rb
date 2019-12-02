class RecipesController < ApplicationController

    def search
        @recipe_list = Recipe.search_collection(params[:keyword]).to_json
        render json: @recipe_list
        # use keyword param to call search recipes from recipesAPI
        # render back results data to frontend
        # no instance creation yet

        # "https://api.spoonacular.com/recipes/search?query=#{keyword}&number=5&instructionsRequired=true&apiKey=#{ENV["RecipeAPI_KEY"]}"
    end

    def create
        # frontend send chosen recipe ID param, use it to call get recipe info from recipesAPI
        # create (or find) recipe instance
    end

    def show
        # render recipe info based on passed ID param
    end
end
