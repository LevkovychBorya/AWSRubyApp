require 'rails_helper'

RSpec.describe Api::V1::MenusController, type: :controller do

  describe "GET #index" do

    it "responds successfully with an HTTP 200 status code" do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

  end

  describe "GET #show" do 

    it "assigns the requested menu to @menu" do
      menu = create(:menu) 
      get :show, id: menu
      expect(assigns(:menu)).to eq(menu)    
    end   
  end

  describe "POST create" do 

  	it "creates a new menu with valid attributes" do
  	  expect{ 
  	 	post :create, menu: FactoryGirl.attributes_for(:menu) 
  	  }.to change(Menu,:count).by(1) 
  	end  

  	it "does not save the new menu with invalid attributes" do
  	  expect{ 
  	    post :create, menu: FactoryGirl.attributes_for(:invalid_menu) 
  	  }.to_not change(Menu,:count) 
  	end    
  end

  describe 'PUT update' do 
  	before :each do 
  		@menu = create(:menu) 
  	end

  	context "valid attributes" do 

  	  it "located the requested @menu" do
  	    put :update, id: @menu,
  	    menu: FactoryGirl.attributes_for(:menu) 
  	    expect(assigns(:menu)).to eq(@menu) 
  	  end 

  	  it "changes @menu's attributes" do
  	    put :update, id: @menu, 
  	    menu: FactoryGirl.attributes_for(:menu, name: "School", url: "school") 
  	    @menu.reload
  	    expect(@menu.name).to eq("School") 
  	    expect(@menu.url).to eq("school") 
  	  end
  	 end

  	context "invalid attributes" do

  	  it "locates the requested @menu" do
  	    put :update, id: @menu,
  	    menu: FactoryGirl.attributes_for(:invalid_menu)
  	    expect(assigns(:menu)).to eq(@menu)
  	  end 

  	  it "does not change @menu's attributes" do
  	    put :update, id: @menu, 
  	    menu: FactoryGirl.attributes_for(:menu, name: "School", url: nil) 
  	    @menu.reload
  	    expect(@menu.name).to_not eq("School") 
  	    expect(@menu.url).to eq("#exams")
  	  end
  	end
  end

  describe 'DELETE destroy' do

    it "deletes the menu" do 
  	  @menu = create(:menu)
 	  expect{ 
 	    delete :destroy, id: @menu 
 	  }.to change(Menu,:count).by(-1) 
    end
  end 
end
