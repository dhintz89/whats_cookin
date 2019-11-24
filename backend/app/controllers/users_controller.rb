class UsersController < ApplicationController

    def create
        @user = User.new(username: params[:username], password: params[:password])
        if @user.save
            session[:user_id] = @user.id
        else
            head(:bad_request)
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password, :verifyPass, :name, :contactPref, :email, :phone, :carrier)
    end

end
