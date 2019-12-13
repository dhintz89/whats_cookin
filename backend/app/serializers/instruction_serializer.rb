class InstructionSerializer < ActiveModel::Serializer
  attributes :id, :description, :complete, :recipe_id
  has_one :recipe_id
end
