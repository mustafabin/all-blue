class BannedIpsController < ApplicationController
    def ip_ban 
        # ip ban takes all the tokens generated under the user
        # and bans all the ips from the active tokens 
        tokens = SuperToken.where(user_id: params[:id])
        render json: tokens
    end
    private
end
