Rails.application.routes.draw do
  resources :comments
  resources :posts
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "/", to: "banned_ips#testing"
  get "/profile", to: "users#profile"
  delete "/destroy_self", to: "users#destroy_self"
  get "/signout", to: "users#signout"
  post "/login", to: "users#login"
  post "/ip_ban/:id", to: "banned_ips#ip_ban"
end
