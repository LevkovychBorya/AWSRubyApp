require 'rails_helper'

RSpec.describe Api::V1::BooksController, type: :controller do
    describe "GET #index" do
        it "assigns @books" do
          book = create(:book)
          get :index, format: :json
          expect(assigns(:books)).to eq([book])
        end
        it "should get index" do
            get :index
            assert_response :success
        end
        it 'response with 200 status' do
          get :index
          expect(response).to have_http_status(:ok)
        end
    end

    describe "GET #show" do
      it "assigns the requested book to @book" do
        book = create(:book)
        get :show, id: book, format: :json
        expect(assigns(:book)).to eq(book)
      end
      it 'respond with success' do
       book = create(:book)
       get :show, id: book.id
       expect(response).to be_success
      end
      it 'render successfully' do
        book = create(:book)
        get :show, id: book.id, format: :json
        content = JSON.parse(response.body)

        expect(content).to include('title')
        expect(content).to include('description')
        expect(content).to include('attachment')
      end
    end

    describe "POST #create" do
      it 'create a new book' do
        post :create, { book: FactoryGirl.attributes_for(:book) }, format: :json
        expect(response).to be_success
     end
     context "with valid attributes" do
         it "creates a book" do
         expect{
            post :create, book: FactoryGirl.attributes_for(:book)
          }.to change(Book, :count).by(1)
      end
     end
     context "with invalid attributes" do
       it 'does not create the book' do
         post :create, book: FactoryGirl.attributes_for(:book, title: nil)
         expect(Book.count).to eq(0)
       end
     end
       it 'responds with 422' do
         post :create, book: FactoryGirl.attributes_for(:book, title: nil), format: :json
         expect(response).to have_http_status(422)
       end
    end

   describe 'PUT #update' do
  	context "valid attributes" do
    it "located the requested book" do
      book = create(:book)
      put :update, id: book.id, book: FactoryGirl.attributes_for(:book)
      expect(assigns(:book)).to eq(book)
    end
    end
    it "changes book's attributes" do
      book = create(:book)
      put :update, id: book.id,
        book: FactoryGirl.attributes_for(:book, title: "BBB", description: "AAA")
      book.reload
      expect(book.title).to eq("BBB")
      expect(book.description).to eq("AAA")
    end
    context 'invalid attributes' do
      it 'does not update book' do
        book = create(:book)
        put :update, { id: book.id, book: FactoryGirl.attributes_for(:book, title: nil) }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
   end

   describe 'DELETE #destroy' do
   it "deletes the book" do
   	book = create(:book)
     expect{
       delete :destroy, id: book.id, book: FactoryGirl.attributes_for(:book), format: :json
     }.to change(Book, :count).by(-1)
   end
   it 'redirects to #index' do
   	  book = create(:book)
      delete :destroy, id: book.id
      expect(response).to be_success
    end
end
end
