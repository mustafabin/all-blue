class PostsController < ApplicationController
    skip_before_action :authorize, only: %i[ show index ]

    def create
        new_post = Post.create!(content: params[:content], user_id: @user.id, edited: false)
        render json: new_post
    end
    def index
        posts = Post.all
        render json: posts
    end
    def show 
        post = Post.find(params[:id])
        if post 
            render json: post, serializer: CommentPostSerializer
        else
            render json: {error: "404 NOT FOUND"}, status: 404
        end
    end
    def update 
        post = Post.find(params[:id])
        if post.user_id == @user.id
            post.update(content: params[:content])
            render json: post
        else
            render json:  {error:"403 forbidden", message:"NOT OWNER OF POST"}, status: 403
        end
    end
    def destroy 
        post = Post.find(params[:id])
        if post.user_id == @user.id
            post.destroy
            render json: post
        else
            render json:  {error:"403 forbidden", message:"NOT OWNER OF POST"}, status: 403
        end
    end
    def my_posts 
        posts = Post.where(user_id: @user.id)
        render json: posts
    end
end
