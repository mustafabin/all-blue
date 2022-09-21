class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user
  def user
    {name: object.user.username, tag:object.user.tag}
  end
end
