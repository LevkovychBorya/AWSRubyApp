require 'rails_helper'

RSpec.describe Article, type: :model do
  it "is not valid without author" do
    article = build(:article)
    expect(article.valid?).to eq(false)
  end

  it "is not valid without title" do
    article = build(:article, title: nil)
    expect(article.valid?).to eq(false)
  end

  it "is not valid with duplicated title" do
    create(:article_with_author, title: 'duplicated')
    article = build(:article, title: 'duplicated')
    expect(article.valid?).to eq(false)
  end

  it "is not valid without body" do
    article = build(:article, body: nil)
    expect(article.valid?).to eq(false)
  end

  it "is not valid without status" do
    article = build(:article, status: nil)
    expect(article.valid?).to eq(false)
  end
end
