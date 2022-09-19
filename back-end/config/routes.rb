Rails.application.routes.draw do
  resources :banned_ips
  resources :super_tokens
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  get "/testing", to: "users#testing"
  get "/login", to: "users#login"
  get "/profile", to: "users#profile"
end
