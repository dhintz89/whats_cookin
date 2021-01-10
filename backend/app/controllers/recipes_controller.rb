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
            render json: @recipe.id.to_json
        else
            @recipe = Recipe.build_from_data(params[:recipe_id])
            render json: @recipe.id
        end
    end

    def show
        # render recipe info based on passed ID param
        recipe = Recipe.find(params[:id])
        render json: recipe, serializer: RecipeSerializer
    end

    def send_shoplist
        # send selected recipe-ingredients as shoplist
        @shoplist = params[:shoplist]
        @recipe = params[:recipe]

        # send shoplist via chosen contact preference
        case current_user.contactPreference
        when 'email'
            ShoplistMailer.with(recipe: @recipe, shoplist: @shoplist, user: current_user, recipient: current_user.email).new_list_email.deliver_now
            render json: "Shopping List Successfully Delivered".to_json
        when 'text'
            recipient = SMSEasy::Client.sms_address(current_user.phone, current_user.carrier)
            ShoplistMailer.with(recipe: @recipe, shoplist: @shoplist, user: current_user, recipient: recipient).new_list_email.deliver_now
            render json: "Shopping List Successfully Delivered".to_json
        when 'both'
            recipient = SMSEasy::Client.sms_address(current_user.phone, current_user.carrier)
            ShoplistMailer.with(recipe: @recipe, shoplist: @shoplist, user: current_user, recipient: current_user.email).new_list_email.deliver_now
            ShoplistMailer.with(recipe: @recipe, shoplist: @shoplist, user: current_user, recipient: recipient).new_list_email.deliver_now
            render json: "Shopping List Successfully Delivered".to_json
        else
            render json: "Shopping List Could Not Be Sent - No Valid Contact Preference Selected".to_json
        end
    end
end