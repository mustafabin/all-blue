class ApplicationController < ActionController::API
    def expiry_time
        10000
    end
    def vaildate_super token
        super_token = SuperToken.find_by(token:token)
        if super_token
            if is_expired super_token.updated_at.to_i
                super_token.destroy 
                false
            else
                # this might be redudant since
                super_token.updated_at = Time.now
                super_token.save
                super_token.user
            end
        else
            false
        end
    end
    def is_expired time 
        age = Time.now.to_i - time
        puts age
        if expiry_time < age
            true
        else
            false
        end
    end
end
