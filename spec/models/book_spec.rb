require 'rails_helper'

describe Book, :type => :model  do
  it "should create valid book" do
    expect(FactoryGirl.create(:book)).to be_valid
  end

  it "is invalid without a title" do
    expect(FactoryGirl.build(:book, title: nil)).to_not be_valid
  end

  it "is invalid without a description" do
    expect(FactoryGirl.build(:book, description: nil)).to_not be_valid
  end

  it "booklist is empty" do
    expect(Book.count).to eq 0
  end
end

describe "attachment checks" do
  let(:book) {  mock_model(Book, attachment: nil, presense: false) }

  it "should save with attachment" do
    expect(book).to be_valid
  end
end
