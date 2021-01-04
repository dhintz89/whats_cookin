class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        if params[:password] === params[:verifyPass]
            binding.pry
            @user = User.create(user_params)
            if @user.valid? 
                @token = encode_token(user_id: @user.id)
                render json: {user: UserSerializer.new(@user), jwt: @token}, status: :created
            else
                render json: {error: "Incorrect or missing credentials, try again."}, status: :not_acceptable
            end
        else
            render json: {error: "Passwords don't match."}
        end
    end

    def show
        @user = User.find(params[:id])
        render json: @user
    end

    private
    def user_params
        params.permit(:username, :password, :name, :contactPreference, :email, :phone, :carrier)
    end

end
