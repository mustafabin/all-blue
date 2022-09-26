class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    before_action :authorize 

    def expiry_time days
        86400 * days
    end
    def vaildate_super token
        super_token = SuperToken.find_by(token:token)
        if super_token
            if is_vaild_ip super_token
                if is_expired super_token.updated_at.to_i
                    super_token.destroy 
                    render json:  {error:"401 not authorized", message:"EXPIRED TOKEN"}, status: 401
                else
                    super_token.update(updated_at: Time.now)
                    return super_token.user
                end
            else
                render json:  {error:"403 forbidden", message:"INVAILD IP"}, status: 403
            end
        else
            render json:  {error:"401 not authorized", message:"TOKEN DOESNT EXISTS"}, status: 401
        end
    end
    def is_expired time
        age = Time.now.to_i - time
        expiry_time(14) < age ? true : false
    end
    def is_vaild_ip super_token
        banned = BannedIp.find_by(client_ip: request.remote_ip)
        not_same_device = super_token.client_ip != request.remote_ip
        banned || not_same_device ? false : true
    end

    private
    def render_not_found_response(exception)
        render json: { error: "#{exception.model} not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
    def authorize
        @user = vaildate_super(request.headers['token'])
    end
end
