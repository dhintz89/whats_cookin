class RecipesController < ApplicationController

    def search
        # use keyword param to call search recipes from recipesAPI
        @recipe_list = Recipe.search_collection(params[:keyword])
        render json: @recipe_list
    end

    def create
        # frontend send chosen recipe ID param, use it to call get recipe info from recipesAPI
        # create (or find) recipe instance
        @recipe = Recipe.find_by(id: params[:recipe_id])
        if @recipe
            redirect_to "recipe/#{@recipe.id}"
        else
            @recipe_data = Recipe.get_details(params[:recipe_id])
            # redirect_to "recipe/#{id}"
            render json: @recipe_data
        end

    end

    def show
        # render recipe info based on passed ID param
    end
end
