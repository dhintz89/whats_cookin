Rails.application.routes.draw do

  resources :recipe_ingredients
  resources :ingredients
  resources :recipes
  post '/recipes/search' => 'recipes#search'
  resources :instructions
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :sessions, only: [:create, :destroy]

end
