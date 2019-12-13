class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :ingredientType, :quantity, :measure, :onShopList, :storeLocation, :recipe_id

  belongs_to :ingredient
  belongs_to :recipe

  def ingredientType
    object.ingredient.name
  end

  def storeLocation
    object.ingredient.store_location
  end

end
