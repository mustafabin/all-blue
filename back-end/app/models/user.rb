class User < ApplicationRecord
    has_secure_password
    validates_uniqueness_of :email
    has_many :super_tokens
    has_many :trusted_ips
end
