module Api
  module V1
    class PagesController < ApplicationController
      before_action :set_page, only: [:show, :edit, :update, :destroy]

      def index
        render json: Page.all
      end

      def show
        render json: @page
      end

      def create
        @page = Page.new(page_params)

        if @page.save
          render json: @page
        else
          render json: @page.errors, status: :unprocessable_entity
        end
      end

      def update
        if @page.update(page_params)
          render json: @page
        else
          render json: @page.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @page.destroy
        head :no_content
      end

      private

      def set_page
        @page = Page.find(params[:id])
      end

      def page_params
        params.require(:page).permit(:title, :body)
      end
    end
  end
end
