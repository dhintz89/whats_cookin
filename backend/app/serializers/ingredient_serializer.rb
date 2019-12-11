class IngredientTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :store_location
  has_many :recipe_ingredients
end
