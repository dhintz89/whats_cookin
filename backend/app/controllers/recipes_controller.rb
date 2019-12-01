class RecipesController < ApplicationController

    def search
        kw = params[:keyword]
        binding.pry
        render json: {id: 123, keyword: kw, image: 'blahblah.jpeg', ingredients: ['stuff1', 'stuff2']}
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
