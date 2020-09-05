class Api::V1::ArticlesController < ApplicationController
  before_action :check_authentification, only: [:create, :update, :destroy]
  before_action :set_article, only: [:update, :destroy]

  def index
    render json: user_signed_in? ? Article.all : Article.shared
  end

  def latest
    scope = Article.order(id: :desc)
    scope = scope.shared unless user_signed_in?
    render json: scope.limit(10), except: [:body, :created_at, :updated_at]
  end

  def show
    @article = Article.find(params[:id])

    if @article.restricted? && !user_signed_in?
      head :forbidden
    else
      render json: @article.as_json(include: {users: {only: :id}})
    end
  end

  def create
    @article = Article.new(article_params)
    @article.users = [current_user]

    if @article.save
      render json: @article
    else
      head :unprocessable_entity
    end
  end

  def update
    if @article.update(article_params)
      render json: @article
    else
      head :unprocessable_entity
    end
  end

  def destroy
    @article.destroy
    head :no_content
  end

  private

  def set_article
    @article = current_user.articles.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :body, :status)
  end
end
