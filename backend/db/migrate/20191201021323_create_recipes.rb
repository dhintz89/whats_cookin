class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :image
      t.integer :mins_to_complete

      t.timestamps
    end
  end
end
