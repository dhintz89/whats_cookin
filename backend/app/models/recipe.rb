class Recipe < ApplicationRecord
    has_many :instructions
    has_many :recipe_ingredients
    has_many :ingredients, through: :recipe_ingredients

    def self.search_collection(keyword)
        # searches api by keyword - returns 5 randomly selected results
        url = "https://api.spoonacular.com/recipes/search?query=#{keyword}&offset=#{rand(0..25)}&number=5&instructionsRequired=true&apiKey=#{ENV["RecipeAPI_KEY"]}"
        resp = Faraday.get(url, {'Accept': 'application/json'})
        resp.body
    end

end
