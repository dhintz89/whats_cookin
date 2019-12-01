class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :mins_to_complete
end
