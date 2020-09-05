require 'rails_helper'

RSpec.describe Page, type: :model do
  it 'is valid with a title and body' do
    page = build(:page)
    expect(page).to be_valid
  end

  it 'is invalid without a title' do
    page = Page.new(title: nil)
    page.valid?
    expect(page.errors[:title]).to include('can\'t be blank')
  end

  it 'is invalid without a body' do
    page = Page.new(body: nil)
    page.valid?
    expect(page.errors[:body]).to include('can\'t be blank')
  end

  it 'do not create duplicated page' do
    create(:page, title: 'Dup')
    page = build(:page, title: 'Dup')
    expect(page.valid?).to eq(false)
  end
end
