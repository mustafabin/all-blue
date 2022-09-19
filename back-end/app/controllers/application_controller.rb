class ApplicationController < ActionController::API
    def expiry_time
        1000
    end
    def vaildate_super token
        super_token = SuperToken.find_by(token:token)
        if super_token
            if not BannedIp.find_by(client_ip: request.remote_ip)
                if is_expired super_token.updated_at.to_i
                    super_token.destroy 
                    false
                else
                    super_token.update(updated_at: Time.now)
                    super_token.user
                end
            else
                false
            end
        else
            false
        end
    end
    def is_expired time 
        age = Time.now.to_i - time
        puts age
        expiry_time < age ? true : false
    end
end
