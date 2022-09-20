class User < ApplicationRecord
    has_secure_password
    validates_uniqueness_of :email
    has_many :super_tokens, dependent: :destroy
    has_many :trusted_ips, dependent: :destroy
end
