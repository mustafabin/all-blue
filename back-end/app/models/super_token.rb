class SuperToken < ApplicationRecord
    validates_uniqueness_of :token
    belongs_to :user
    AUTO_REFRESH = false
    DAYS_TO_EXPIRE = 14
    def self.generate_token(user,request)
        if user && request
            all_tokens = SuperToken.where(user_id: user.id)
            # generate hash https://github.com/rails/rails/blob/main/activerecord/lib/active_record/secure_token.rb
            hash = SecureRandom.base58(36)
            # generate token based off user
            SuperToken.create!(token:hash, user_id: user.id, client_ip: request.remote_ip, agent: request.user_agent, expiry: Time.now)
        else 
            return {status: "400", error:"Bad request", message:"user and/or request arguments undefined"}
        end
    end
    def self.vaildate_super request
        token = request.headers["SuperToken"]
        if !token
            return {status: "400", error:"SuperToken Header Not Found", message:"Header needs to called SuperToken not anything else"}
        end
        super_token = SuperToken.find_by!(token:token)
        if super_token.agent == request.user_agent
            if is_expired(super_token.expiry.to_i)
                super_token.destroy 
                {status: "401", error:"401 not authorized", message:"EXPIRED TOKEN"}
            else
                if AUTO_REFRESH 
                    # updates lifespan of token
                    super_token.update(expiry: Time.now)
                else
                    # doesnt update lifespan but this is here b/c updated_at is how to track the lastest used token
                    super_token.update(updated_at: Time.now)
                end
                 {status: "200", user:super_token.user}
            end
        else
            {status: "403", error:"403 forbidden", message:"DIFFERENT DEVICE "}
        end
    end


    def self.expiry_time
        86400 * DAYS_TO_EXPIRE
    end

    def self.is_expired time
        age = Time.now.to_i - time
        expiry_time < age ? true : false
    end

end
