class Api::V1::CommentsController < ApplicationController
  before_action :check_authentification, only: [:create, :update, :destroy]
  before_action :set_commentable, only: [:index, :create]
  before_action :set_comment, only: [:update, :destroy]

  def index
    render json: @commentable.comments
  end

  def create
    @comment = @commentable.comments.build(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      render json: @comment
    else
      head :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      head :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def set_comment
    @comment = current_user.comments.find(params[:id])
  end

  def set_commentable
    params.each do |name, value|
      @commentable = $1.classify.constantize.find(value) if name =~ /(.+)_id$/
    end
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
