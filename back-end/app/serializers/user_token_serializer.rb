class UserTokenSerializer < ActiveModel::Serializer
    attributes :user, :token
    def token
        object.super_tokens.order('id DESC')[0].token
    end
    def user 
        {id: object.id,profile_image:object.profile_image, username: object.username, tag: object.tag, email: object.email, is_admin: object.is_admin}
    end
  end