class SessionsController < ApplicationController

    def create 
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id
            render json: @user
            binding.pry
        else
            head(:forbidden)
        end
    end

    def destroy
        if session[:user_id] === params[:id]
            session.clear()
            head(:ok)
        # else    # session does not currently persist
        #     head(:forbidden)
        end
    end

end