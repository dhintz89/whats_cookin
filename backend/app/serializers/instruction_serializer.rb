class InstructionSerializer < ActiveModel::Serializer
  attributes :id, :description, :complete
  has_one :recipe_id
end
