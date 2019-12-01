class IngredientTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :dietType, :store_location
end
