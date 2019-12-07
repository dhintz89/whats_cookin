class RecipesController < ApplicationController

    def search
        # use keyword param to call search recipes from recipesAPI
        @recipe_list = Recipe.search_collection(params[:keyword])
        render json: @recipe_list
    end

    def create
        # create (or find) Recipe instance based on chosen recipe ID param
        @recipe = Recipe.find_by(id: params[:recipe_id])
        if @recipe
            redirect_to "recipe/#{@recipe.id}"
        else
            @recipe_data = Recipe.get_details(params[:recipe_id])
            @recipe = Recipe.create(name: @recipe_data["title"], image: @recipe_data["image"], mins_to_complete: @recipe_data["readyInMinutes"], like_count: @recipe_data["aggregateLikes"], rating: @recipe_data["spoonacularScore"], source_url: @recipe_data["sourceUrl"])
            # redirect_to "recipe/#{@recipe.id}"
        end

    end

    def show
        # render recipe info based on passed ID param
        # @recipe = Recipe.find(params[:id])
        # render json: @recipe
    end
end
