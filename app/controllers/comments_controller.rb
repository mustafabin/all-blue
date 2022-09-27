class CommentsController < ApplicationController

    def create
        new_comment = Comment.create!(content: params[:content], post_id: params[:post_id], user_id: @user.id)
        render json: new_comment
    end
end
