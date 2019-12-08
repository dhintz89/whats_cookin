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

    def self.get_details(recipe_id)
        # calls to recipe api by id and returns full recipe information for building new recipe
        conn = Faraday.new do |connection|
            connection.response :encoding
            connection.adapter Faraday.default_adapter
        end

        url = "https://api.spoonacular.com/recipes/#{recipe_id}/information?includeNutrition=false&apiKey=#{ENV["RecipeAPI_KEY"]}"
        resp = conn.get(url, {'Content-Type': 'application/json', 'Accept': 'application/json'})
        recipe_data = JSON.parse(resp.body.force_encoding('utf-8'))
        return recipe_data
    end

    def self.build_from_data(recipe_id)
        # creates new recipe and associated obects from returned api data
        @recipe = Recipe.get_details(recipe_id)

        @instructions = []
        @recipe_ingredients = []      
        @recipe = Recipe.create(id: @recipe_data["id"], name: @recipe_data["title"], image: @recipe_data["image"], mins_to_complete: @recipe_data["readyInMinutes"], like_count: @recipe_data["aggregateLikes"], rating: @recipe_data["spoonacularScore"], source_url: @recipe_data["sourceUrl"])

        @recipe["extendedIngredients"].each do |ing|
            #search/build Ingredient & associate to new recipe_ingredient

        end

    end
end
