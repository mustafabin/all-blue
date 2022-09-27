class UserSerializer < ActiveModel::Serializer
  attributes :user
  def user
    {id:object.id, username:object.username, tag:object.tag, email:object.email, is_admin:object.is_admin}
  end
end
