class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :measure, :onShopList
  has_one :recipe_type_id
  has_one :recipe_id
end
