class Api::V1::PicturesController < ApplicationController
  before_action :set_picture, only: [:show, :edit, :update, :destroy]
  respond_to :json
  skip_before_action :verify_authenticity_token

  def index
    @album = Album.find(params[:album_id])
    # select only those pictures which belongs to the specified album
    respond_with(@pictures = Picture.select{|picture| picture.album_id == @album.id})
  end

  def show
    respond_with(@picture = Picture.find(params[:id]))
  end

  def new
    @album = Album.find(params[:album_id])
    respond_with(@picture = Picture.new(:album_id => @album.id)) #@album.pictures.build
  end

  def edit
  end

  def create
    @picture = Picture.new(picture_params)
      if @picture.save
        render json: @picture, status: :created
      else
        render json: @picture.errors, status: :unprocessable_entity
      end
  end

  def update
    if @picture.update(picture_params)
      render json: @picture, status: :ok
    else
      render json: @picture.errors, status: :unprocessable_entity
    end

  end

  def destroy
   @picture.destroy
     head :no_content
  end

  private
  
    def set_picture
      @picture = Picture.find(params[:id])
    end

    def picture_params
      params.require(:picture).permit(:title, :description, :image, :album_id)
    end
end
