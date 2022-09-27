class User < ApplicationRecord
    has_secure_password
    validates_uniqueness_of :email
    validates_uniqueness_of :username
    has_many :super_tokens, dependent: :destroy
    has_many :trusted_ips, dependent: :destroy
    has_many :posts
    has_many :comments, through: :posts
end
