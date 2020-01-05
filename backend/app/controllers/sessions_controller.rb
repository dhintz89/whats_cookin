class SessionsController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create 
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            @token = encode_token({user_id: @user.id})
            render json: {user: UserSerializer.new(@user), jwt: @token}, status: :accepted
        else
            render json: {error: 'Invalid username or password'}, status: :unauthorized
        end
    end

    def destroy
        if !current_user
            head(:unauthorized)
        elsif current_user.id === params[:id].to_i
            head(:ok)
        else
            head(:unauthorized)
        end
    end

    private
    def session_params
        params.permit(:username, :password, session: [:username, :password, :user_id])
    end

end