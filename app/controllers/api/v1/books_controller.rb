class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  
  def index
    @books = Book.all
    render json: @books
  end

  
  def show
    render json: Book.find(params[:id])
  end

  
  def create
    @book = Book.new(book_params)
    if @book.save
     render json: @book
      #redirect_to "#/books"
    else
      head :unprocessable_entity
    end
  end

  
  def update
    if @book.update(book_params)
      render json: @book
    else
      head :unprocessable_entity
    end
  end

  
  def destroy
    @book.destroy
    head :no_content
  end

  private
    
    def set_book
      @book = Book.find(params[:id])
    end

    
    def book_params
      params.require(:book).permit(:title, :description, :attachment)
    end
end

