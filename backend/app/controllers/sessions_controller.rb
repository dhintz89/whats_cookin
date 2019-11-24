class SessionsController < ApplicationController

    def create 
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id
        else
            head(:forbidden)
        end
    end

    def destroy

    end
end