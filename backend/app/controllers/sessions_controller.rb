class SessionsController < ApplicationController

    def create 
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id
            render json: @user
        else
            head(:forbidden)
        end
    end

    def destroy
        binding.pry
        if session[:user_id] === params[:id]
            session.clear() # session.delete(:user_id)
            binding.pry
            head(:ok)
        # else    # session does not currently persist
        #     head(:forbidden)
        end
    end

    private
    def session_params
        params.permit(:username, :password, session: [:username, :password, :user_id])
    end

end