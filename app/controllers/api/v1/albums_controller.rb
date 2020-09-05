class Api::V1::AlbumsController < ApplicationController
  before_action :set_album, only: [:show, :edit, :update, :destroy]

  def index
    respond_with(@albums = Album.all)
  end

  def show
    respond_with(@album = Album.find(params[:id]))
  end

  def new
    @album = Album.new
    @picture = @album.pictures.build
  end

  def edit
  end

  def create
    @album = Album.new(album_params)

      if @album.save
        render json: @album, status: :created
      else
        render json: @album.errors, status: :unprocessable_entity
      end
  end

  def update

      if @album.update(album_params)
        render json: @album, status: :ok
      else
        render json: @album.errors, status: :unprocessable_entity
      end

  end

  def destroy
    @album.destroy
    head :no_content
  end

  private

    def set_album
      @album = Album.find(params[:id])
    end

    def album_params
      params.require(:album).permit(:title, :description, :user_id, picture_attributes: [:id, :album_id, :title, :image, :description])
    end
end


