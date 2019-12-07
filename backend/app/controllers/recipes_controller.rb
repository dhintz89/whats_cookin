class RecipesController < ApplicationController

    def search
        @recipe_list = Recipe.search_collection(params[:keyword])
        render json: @recipe_list
        # use keyword param to call search recipes from recipesAPI
        # render back results data to frontend
        # no instance creation yet

        # "https://api.spoonacular.com/recipes/search?query=#{keyword}&number=5&instructionsRequired=true&apiKey=#{ENV["RecipeAPI_KEY"]}"
    end

    # def create
    #     # frontend send chosen recipe ID param, use it to call get recipe info from recipesAPI
    #     # create (or find) recipe instance
    #     @recipe = Recipe.find_by(id: params[:recipe_id])
    #     if @recipe
    #         redirect_to "recipe/#{id}"
    #     else
    #         @recipe_data = Recipe.get_details(params[:recipe_id])
    #         # redirect_to "recipe/#{id}"
    #         binding.pry
    #         render json: @recipe_data
    #     end

    # end

    def show
        # render recipe info based on passed ID param
    end
end
