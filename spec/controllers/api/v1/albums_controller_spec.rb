require 'rails_helper'
RSpec.describe Api::V1::AlbumsController, type: :controller do
  describe 'GET #index' do
    it 'responds with status ok' do
      get :index, format: :json
      expect(response).to have_http_status(:ok)
    end
  end
  describe 'GET #show' do
    before :each do
      @album = create(:album)
    end
    it 'responds with status success' do
      get :show, id: @album.id, format: :json
      expect(response).to have_http_status(:success)
    end
    it 'render album' do
      get :show, id: @album.id, format: :json
      expect(assigns(:album)).to eq(@album)

      content = response.body
      expect(content).to include 'title'
      expect(content).to include 'description'
      expect(content).to include 'pictures'
    end
  end
  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates album successfully' do
        post :create, {album: attributes_for(:album)}, format: :json
        expect(response).to be_success
      end
    end
    context 'with bad attribute ' do
      it 'title responds with status unprocessable_entity' do
        post :create, {album: attributes_for(:album, :without_title)}, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
      it 'description responds with status unprocessable_entity' do
        post :create, {album: attributes_for(:album, :too_long_description)}, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
  describe 'PATCH #update' do
    before :each do
        @album = create(:album)
    end
    context 'valid attributes' do
      it 'should update album' do
        patch :update, {id: @album.id, album: {title: "new title", description: "new description"}}, format: :json
        @album.reload
        expect(response).to have_http_status(:ok)
        expect(@album.title).to eq('new title')
        expect(@album.description).to eq('new description')

        content = response.body
        expect(content).to include 'title'
        expect(content).to include 'description'
        expect(content).to include 'pictures'
      end
    end
    context 'invalid attributes' do
      it 'shouldn\'t update album with no title' do
        patch :update, {id: @album.id, album: attributes_for(:album, :without_title)}, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(assigns(:album).title).to eq('')
      end
      it 'shouldn\'t update album with too long description' do
        patch :update, {id: @album.id, album: attributes_for(:album, :too_long_description)}, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(assigns(:album).description.length).to eq(602)
      end
    end
  end
   describe 'DELETE #destroy' do
    it 'deletes album' do
      album = create(:album)
      expect{
        delete :destroy, id: album.id, format: :json
      }.to change(Album,:count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end

end
