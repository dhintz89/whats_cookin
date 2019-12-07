class AddDataToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :like_count, :integer
    add_column :recipes, :rating, :integer
    add_column :recipes, :source_url, :string
  end
end
