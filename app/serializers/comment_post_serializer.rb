class CommentPostSerializer < ActiveModel::Serializer
  attributes :id, :user, :content, :comments
  def user
    {name: object.user.username, tag:object.user.tag}
  end
  def comments
    object.comments.collect do |comment|
      { id: comment.id, content: comment.content, user: {username: comment.user.username, tag: comment.user.tag, id: comment.user.id } }
    end
  end
end
