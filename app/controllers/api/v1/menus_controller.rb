class Api::V1::MenusController < ApplicationController
	before_action :set_menu, only: [:show, :edit, :update, :destroy]

  def index   
    render json: Menu.convert(0)
  end

  def show
   render json: @menu 
  end

  def create
    @menu = Menu.new(menu_params)
    if @menu.save
      render json: @menu
    else
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  def update
    if @menu.update(menu_params)
      render json: @menu, status: :created
    else
      render json: @menu.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @menu.destroy
    head :no_content
  end

  private

  def set_menu
    @menu = Menu.find(params[:id])
  end


  def menu_params
    params.require(:menu).permit(:parent_id, :name, :url)
  end

end
