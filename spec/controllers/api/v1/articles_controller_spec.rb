require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :controller do
  describe 'GET #ndex' do
    before { create_pair(:article_with_author) }
    before { create_pair(:article_with_author, :restricted) }

    it 'responds successfully' do
      get :index
      expect(response).to be_success
    end

    context 'when logged in' do
      before { sign_in create(:user) }
      after { sign_out :user }

      it 'renders articles including private ones' do
        get :index

        content = JSON.parse(response.body)

        expect(content.count).to eq(4)
        expect(content.any? { |a| a['status'] == 'restricted' }).to be(true)
      end
    end

    context 'when logged out' do
      before { sign_out :user }

      it 'renders only public articles' do
        get :index

        content = JSON.parse(response.body)

        expect(content.count).to eq(2)
        expect(content.all? { |a| a['status'] == 'shared' }).to be(true)
      end
    end
  end

  describe 'GET #latest' do
    before { create_list(:article_with_author, 10) }
    before { create_list(:article_with_author, 2, :restricted) }

    it 'responds successfully' do
      get :latest
      expect(response).to be_success
    end

    context 'when logged in' do
      before { sign_in create(:user) }
      after { sign_out :user }

      it 'renders 10 latest articles including private ones' do
        get :latest

        content = JSON.parse(response.body)

        expect(content.count).to eq(10)
        expect(content.any? { |a| a['status'] == 'restricted' }).to be(true)
      end
    end

    context 'when logged out' do
      before { sign_out :user }

      it 'renders 10 latest only public articles' do
        get :latest

        content = JSON.parse(response.body)

        expect(content.count).to eq(10)
        expect(content.all? { |a| a['status'] == 'shared' }).to be(true)
      end
    end
  end

  describe 'GET #show' do
    let(:article) { create(:article_with_author) }

    it 'assigns @article' do
      get :show, id: article.id, format: :json
      expect(assigns(:article)).to eq(article)
    end

    it 'responds with success' do
      get :show, id: article.id
      expect(response).to be_success
    end

    context 'when logged in' do
      before { sign_in create(:user) }
      after { sign_out :user }

      it 'renders private article successfully' do
        article = create(:article_with_author, :restricted)

        get :show, id: article.id, format: :json

        content = JSON.parse(response.body)

        expect(content).to include('title')
        expect(content).to include('body')
        expect(content).to include('status')
        expect(content['status']).to eq('restricted')
        expect(content).to include('users')
      end
    end

    context 'when logged out' do
      before { sign_out :user }

      it 'renders public article successfully' do
        get :show, id: article.id, format: :json

        expect(response).to be_success

        content = JSON.parse(response.body)

        expect(content).to include('title')
        expect(content).to include('body')
        expect(content).to include('status')
        expect(content['status']).to eq('shared')
        expect(content).to include('users')
      end

      it 'does not render private article' do
        article = create(:article_with_author, :restricted)
        get :show, id: article.id, format: :json
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'POST #create' do
    let(:params) { { article: FactoryGirl.attributes_for(:article) } }

    context 'when logged in' do
      before { sign_in create(:user) }

      it 'creates a new article' do
        post :create, params, format: :json

        expect(response).to be_success

        content = JSON.parse(response.body)
        expect(content).to include('title')
        expect(content).to include('body')
        expect(content).to include('status')
      end

      context 'when params are missed' do
        it 'respond with unprocessable_entity' do
          params = { article: { title: 'title' } }
          post :create, params, format: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context 'when logged out' do
      before { sign_out :user }

      it 'responds with forbidden' do
        post :create, params, format: :json
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'PATCH #update' do
    let(:article) { create(:article_with_author) }
    let(:params) do
      { id: article.id,
        article: FactoryGirl.attributes_for(:article, :modified) }
    end

    context 'when author is logged in' do
      let(:author) { article.users.first }

      before { sign_in author }
      after { sign_out author }

      it 'update an article' do
        patch :update, params, format: :json

        expect(response).to be_success

        content = JSON.parse(response.body)
        expect(content).to include('title')
        expect(content).to include('body')
        expect(content).to include('status')
      end

      it 'does not update an article without title' do
        patch :update, { id: article.id, article: { title: '' } }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'when logged out' do
      before { sign_out :user }

      it 'responds with forbidden status' do
        patch :update, params, format: :json
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:article) { create(:article_with_author) }
    let(:drop) { ->(id = article.id) { delete :destroy, id: id } }

    context 'when author is logged in' do
      let(:author) { article.users.first }

      before { sign_in author }
      after { sign_out :user }

      it 'destroys article' do
        drop.call
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when resource is not found' do
      it 'respond with forbidden' do
        drop.call(article.id + 1)
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when resource is not owned' do
      it 'raise RecordNotFound exception' do
        sign_out :user
        sign_in create(:user)
        expect(&drop).to raise_exception(ActiveRecord::RecordNotFound)
      end
    end

    context 'when logged out' do
      before { sign_out :user }

      it 'responds with forbidden' do
        drop.call
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
