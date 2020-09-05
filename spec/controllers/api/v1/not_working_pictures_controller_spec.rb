require 'rails_helper'
RSpec.describe Api::V1::PicturesController, type: :controller do
  describe 'GET #index' do
    it 'responds with status ok' do
      @album = create(:album)
      get :index, album_id: @album.id, format: :json
      expect(response).to have_http_status(:ok)
    end
  end
  describe 'GET #show' do
    before :each do
      @picture = create(:picture)
    end
    it 'responds with status success' do
      get :show, id: @picture.id, format: :json
      expect(response).to have_http_status(:success)
    end
    it 'render picture' do
      get :show, id: @picture.id, format: :json
      expect(assigns(:picture)).to eq(@picture)

      content = response.body
      expect(content).to include 'title'
      expect(content).to include 'description'
      expect(content).to include 'image'
      expect(content).to include 'album_id'
    end
  end
  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates picture successfully' do
        @album = create(:album)
        post :create, {picture: attributes_for(:picture, album_id: @album.id)}, format: :json
        expect(response).to have_http_status(:created)
        expect(response).to be_success
      end
    end
    context 'with bad attributes ' do
      it 'picture responds with status unprocessable_entity' do
        post :create, {picture: attributes_for(:picture, :without_album)}, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it 'image file size responds with status unprocessable_entity' do
        post :create, {picture: attributes_for(:picture, :oversized_file)}, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
  describe 'PATCH #update' do
    before :each do
      @picture = create(:picture)
      @album = build(:album)
    end
    context 'valid attributes' do
      it 'should update picture' do
        patch :update, {id: @picture.id, picture: {title: "new title", description: "new description"}}, format: :json
        @picture.reload
        expect(response).to have_http_status(:ok)
        expect(@picture.title).to eq('new title')
        expect(@picture.description).to eq('new description')

        content = response.body
        expect(content).to include 'title'
        expect(content).to include 'description'
        expect(content).to include 'image'
        expect(content).to include 'album_id'
      end
    end
    context 'invalid attributes' do
      it 'shouldn\'t update picture with no album associated' do
        patch :update, {id: @picture.id, picture: attributes_for(:picture, :without_album)}, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(assigns(:picture).album).to eq nil
      end
    end
  end
  describe 'DELETE #destroy' do
    it 'deletes picture' do
      picture = create(:picture)
      expect{
        delete :destroy, id: picture.id, format: :json
      }.to change(Picture,:count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
    it 'deletes picture but leaves album' do
      @picture = create(:picture)
      expect{
        delete :destroy, id: @picture.id, format: :json
      }.to change(Album,:count).by(0)
      expect(response).to have_http_status(:no_content)
    end
  end
end
