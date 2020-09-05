require 'rails_helper'
RSpec.describe Album, :type => :model do
  before do
    Album.delete_all
    @album1 = build(:album)
  end
  it "has a valid factory" do
    expect(@album1).to be_valid
  end
  it "have empty array of pictures" do
    expect(@album1.pictures).to eq []
  end
end

context "validation" do
  before do
      @album2 = build(:album ,:without_title)
      @album3 = build(:album ,:too_long_description)
  end
  it "fails with no title" do
      expect(@album2).to be_invalid
  end
  it "fails if description is too long" do
      expect(@album3).to be_invalid
  end
 
end 

