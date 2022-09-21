class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :tag, :email, :is_admin
end
