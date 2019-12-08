Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/recipes/search' => 'recipes#search'
  resources :recipes do
    resources :recipe_ingredients
    resources :instructions
  end

  resources :recipe_ingredients
  resources :ingredients
  resources :instructions
  
  resources :users
  resources :sessions, only: [:create, :destroy]

end
