require 'rails_helper'

RSpec.describe Api::V1::EventsController, :type => :controller do

  describe 'GET #index' do
    it 'responds with status ok' do
      get :index, format: :json
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET #show' do
    it 'responds with status success' do
      event = create(:event)
      get :show, id: event.id, format: :json
      expect(response).to be_success
    end

    it 'should render successfully' do
      event = create(:event)
      get :show, id: event.id, format: :json
      content = JSON.parse(response.body)

      expect(content).to include 'name'
      expect(content).to include 'description'
      expect(content).to include 'capacity'
      expect(content).to include 'date'
      expect(content).to include 'place'
      expect(content).to include 'longitude'
      expect(content).to include 'latitude'
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates event successfully' do
        post :create, {event: attributes_for(:event)}, format: :json
        expect(response).to be_success
      end
    end

    context 'when field is missing' do
      it 'should not create an event' do
        event = { event: { name: 'qwerty' } }
        post :create, event, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH #update' do
    it 'should update event' do
      event = create(:event)
      patch :update, { id: event.id, event: FactoryGirl.attributes_for(:event) }, format: :json
      expect(response).to be_success

      content = JSON.parse(response.body)
      expect(content).to include 'name'
      expect(content).to include 'description'
      expect(content).to include 'capacity'
      expect(content).to include 'date'
      expect(content).to include 'place'
      expect(content).to include 'longitude'
      expect(content).to include 'latitude'
    end

    context 'name is not empty' do
      it 'should not update event' do
        event = create(:event)
        patch :update, { id: event.id, event: FactoryGirl.attributes_for(:event, name: nil) }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE #destroy' do
    before :each do
      @event = create(:event)
    end

    it 'deletes the event' do
      expect { delete :destroy, id: @event }.to change(Event, :count).by(-1)
    end

    it 'redirects to #index' do
      delete :destroy, id: @event
      expect(response).to be_success
    end
  end
end