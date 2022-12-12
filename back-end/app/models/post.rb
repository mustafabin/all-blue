class Post < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy

    def index 
        posts = Post.all
        render json: posts
    end
end
