class ApplicationController < ActionController::API
    before_action :authorized

    def encode_token(payload)
        JWT.encode(payload, ENV["JWT_Secret"])
    end

    def auth_header
        request.headers['Authorization']
    end
    
    def decoded_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                return JWT.decode(token, ENV["JWT_Secret"])
            rescue JWT::DecodeError
                return nil
            end
        end
    end

    def current_user
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
            puts @user
            return @user
        end
    end

    def logged_in?
        !!current_user
    end

    def authorized
        render json: {error: 'You must log in to perform that action'}, status: :unauthorized unless logged_in?
    end

end
