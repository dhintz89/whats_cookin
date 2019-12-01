class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.string :dietType
      t.string :store_location

      t.timestamps
    end
  end
end