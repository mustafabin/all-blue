class CreateSuperTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :super_tokens do |t|
      t.string :agent
      t.string :token
      t.integer :user_id

      t.timestamps
    end
  end
end
