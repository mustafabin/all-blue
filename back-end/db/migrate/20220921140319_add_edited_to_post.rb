class AddEditedToPost < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :edited, :boolean, default: false
  end
end
