class ShoplistMailer < ApplicationMailer
    default from: "dhintz89@gmail.com"
  
    def new_list_email
      @recipe_name = params[:recipe]
      @user = params[:user]
      @shoplist = params[:shoplist]
      mail(to: @user.email, subject: "What's Cookin' Shopping List")
    end

end