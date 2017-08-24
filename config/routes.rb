Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'home#index'
  mount ActionCable.server => '/gamecast'
  resources :users, only: [:create, :index]
  resources :games, only: [:create]
end
