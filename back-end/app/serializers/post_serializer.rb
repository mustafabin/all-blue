class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :edited,  :user
  def user
    {name: object.user.username, tag:object.user.tag, id:object.user.id}
  end
end
