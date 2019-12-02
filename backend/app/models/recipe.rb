class Recipe < ApplicationRecord
    has_many :instructions
    has_many :recipe_ingredients
    has_many :ingredients, through: :recipe_ingredients

    def self.search_collection(keyword)
        # searches api by keyword - returns 6 randomly selected results
        conn = Faraday.new do |connection|
            connection.response :encoding
            connection.adapter Faraday.default_adapter
        end

        url = "https://api.spoonacular.com/recipes/search?query=#{keyword}&offset=#{rand(0..25)}&number=6&instructionsRequired=true&apiKey=#{ENV["RecipeAPI_KEY"]}"
        resp = conn.get(url, {'Content-Type': 'application/json', 'Accept': 'application/json'})
        resp.body.force_encoding('utf-8')
    end

end
