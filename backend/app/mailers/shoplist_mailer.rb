class ShoplistMailer < ApplicationMailer
    default from: 'from@example.com'
  
    def send_list_email
      @user = params[:user]
      @url = 
      mail(to: @user.email, subject: "What's Cookin Shopping List")
    end

end