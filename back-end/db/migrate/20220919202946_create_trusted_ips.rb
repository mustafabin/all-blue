class CreateTrustedIps < ActiveRecord::Migration[7.0]
  def change
    create_table :trusted_ips do |t|
      t.string :client_ip
      t.integer :user_id

      t.timestamps
    end
  end
end
