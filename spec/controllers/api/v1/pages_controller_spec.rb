require 'rails_helper'

RSpec.describe Api::V1::PagesController, type: :controller do
  describe 'GET #index' do
    it 'response with 200 status' do
      get :index
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET #show' do
    it 'should respond with success' do
      page = create(:page)
      get :show, id: page.id
      expect(response).to be_success
    end

    it 'assigns the requested page to @page' do
      page = create(:page)
      get :show, id: page
      expect(assigns(:page)).to eq page
    end

    it 'should render successfully' do
      page = create(:page)
      get :show, id: page.id, format: :json
      content = JSON.parse(response.body)

      expect(content).to include('title') && include('body')
    end
  end

  describe 'POST #create' do
    it 'should create a new page' do
      post :create, { page: FactoryGirl.attributes_for(:page) }, format: :json
      expect(response).to be_success

      content = JSON.parse(response.body)
      expect(content).to include('title') && include('body')
    end

    context 'when field is missing' do
      it 'should not create a page' do
        page = { page: { body: 'blablabla' } }
        post :create, page, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH #update' do
    it 'should update page' do
      page = create(:page)
      patch :update, { id: page.id, page: FactoryGirl.attributes_for(:page) }, format: :json
      expect(response).to be_success

      content = JSON.parse(response.body)
      expect(content).to include('title') && include('body')
    end

    context 'title is not empty' do
      it 'should not update page' do
        page = create(:page)
        patch :update, { id: page.id, page: FactoryGirl.attributes_for(:page, title: nil) }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
  #test

  describe 'DELETE #destroy' do
    before :each do
      @page = create(:page)
    end

    it 'deletes the page' do
      expect { delete :destroy, id: @page }.to change(Page, :count).by(-1)
    end

    it 'redirects to #index' do
      delete :destroy, id: @page
      expect(response).to be_success
    end
  end
end
