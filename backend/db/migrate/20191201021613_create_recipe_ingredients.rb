class CreateRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_ingredients do |t|
      t.references :ingredient, foreign_key: true
      t.references :recipe, foreign_key: true
      t.integer :quantity
      t.string :measure
      t.integer :onShopList, default: 0

      t.timestamps
    end
  end
end
