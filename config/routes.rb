Rails.application.routes.draw do

  root 'application#index'

  devise_for :users

  concern :commentable do
    resources :comments, except: [:show, :new, :edit]
  end

  namespace :api do
    namespace :v1 do
      resources :pages
      resources :albums do
        resources :pictures
      end
      resources :pictures
      resources :articles, except: [:new, :edit], concerns: :commentable do
        get :latest, on: :collection
      end
      resources :events
      resources :menus
      resources :books
    end
  end

  get '/manager', to: 'manager#index'
  get '/*path', to: 'application#index'

end
