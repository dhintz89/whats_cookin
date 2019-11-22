class ShoplistMailer < ApplicationMailer
    default from: 'from@example.com'
  
    def send_list_email
      @user = params[:user]
      @recipe = params[:recipe]
      mail(to: @user.email, subject: "What's Cookin Shopping List")
    end

end