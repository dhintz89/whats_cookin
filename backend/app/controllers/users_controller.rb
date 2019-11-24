class UsersController < ApplicationController

    def create
        if params[:password] === params[:verifyPass]
            @user = User.new(user_params)
            if @user.save 
                session[:user_id] = @user.id
            else
                head(:bad_request)
            end
        else
            head(:bad_request)
        end
    end

    private
    def user_params
        params.permit(:username, :password, :name, :contactPreference, :email, :phone, :carrier)
    end

end
