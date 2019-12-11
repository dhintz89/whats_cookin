class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :mins_to_complete, :like_count, :rating, :source_url
  has_many :recipe_ingredients
  has_many :instructions

end
