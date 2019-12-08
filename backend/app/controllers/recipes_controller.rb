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
            @recipe = Recipe.build_from_data(params[:recipe_id])
            redirect_to "recipe/#{@recipe.id}"
        end
    end

    def show
        render recipe info based on passed ID param
        @recipe = Recipe.find(params[:id])
        render json: @recipe
    end
end
