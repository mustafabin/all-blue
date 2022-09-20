class BannedIpsController < ApplicationController
    skip_before_action :authorize, only: %i[ testing ]
    def ip_ban 
        if @user.is_admin
            ip_array = SuperToken.where(user_id: params[:id]).pluck(:client_ip).uniq
            ip_array.map { |ip| BannedIp.create(client_ip: ip) }
            render json: {message:"Banned all ips listed below",ips: ip_array}
        else
            render json: {error: "403 FORBIDDEN NOT ADMIN"}, status:  403
        end
    end
    def testing
        render json: {agent:request.user_agent,ip:request.remote_ip}
    end
end
