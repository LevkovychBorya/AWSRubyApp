require 'rails_helper'
RSpec.describe Picture, :type => :model do
  before do
    Picture.delete_all
    @picture1 = build(:picture)
    @picture2 = build(:picture, :without_album)
  end
  it "has a valid factory" do
    expect(@picture1).to be_valid
  end
  it "belongs to album" do
      expect(@picture1.album.class).to eq Album
  end
end
  context 'validation' do
  it "invalid without album" do
    @picture = build(:picture, :without_album)
    expect(@picture).to be_invalid
  end
  it "invalid with oversized file" do
    expect(build(:picture, :oversized_file)).to be_invalid
  end
  it "raise exception with oversized file" do
    expect{create(:picture, :oversized_file)}.to raise_exception ActiveRecord::RecordInvalid
  end
end
