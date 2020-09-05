module Api
  module V1
    class EventsController < ApplicationController
      before_action :set_event, only: [:show, :update, :destroy]
      respond_to :json

      def index
        @events = Event.all
        respond_with @events
      end

      def show
        respond_with @event
      end

      def create
        @event = Event.new(event_params)

        if @event.save
          render json: @event, status: :created
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      def update
        if @event.update(event_params)
          render json: @event, status: :ok
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @event.destroy
        render json: {}, status: :ok
      end

      private
      def set_event
        @event = Event.find(params[:id])
      end

      def event_params
        params.require(:event).permit(:name, :description, :capacity, :date, :place, :latitude, :longitude)
      end
    end
  end
end
