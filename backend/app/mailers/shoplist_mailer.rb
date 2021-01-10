class ShoplistMailer < ApplicationMailer
    default from: "noreply.whats.cookin@gmail.com"
  
    def new_list_email
      @recipe_name = params[:recipe]
      @user = params[:user]
      @shoplist = params[:shoplist]
      mail(to: params[:recipient], subject: "What's Cookin' Shopping List")
    end

end