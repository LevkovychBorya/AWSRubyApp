require 'rails_helper'

RSpec.describe Menu, type: :model do

  it "has a valid factory" do 
  	menu = create(:menu)
  	expect(menu.valid?).to eq(true)
  end

  it "don't create menu without parent_id " do
    menu = build(:menu, parent_id: nil)
    expect(menu.valid?).to eq(false)
  end

   it "don't create menu without name" do
    menu = build(:menu, name: nil)
    expect(menu.valid?).to eq(false)
  end

  it "don't create menu without url" do
    menu = build(:menu, url: nil)
    expect(menu.valid?).to eq(false)
  end

  it "don't create menu with parent_id string" do
    menu = build(:menu, parent_id: "school")
    expect(menu.valid?).to eq(false)
  end

  it 'creates submenu array' do
    exam = Menu.create(id: 7, name: 'Exams', url: '#exams', parent_id: 0)
    school = Menu.create(id: 8, name: 'School', url: '#school', parent_id: 7)
    expect(Menu.convert(0)).to eq([{ 'id' => 7, 'name' => 'Exams', 'url' => '#exams', 'parent_id' => 0, 'submenu' => [{ 'id' => 8, 'name' => 'School', 'url' => '#school', 'parent_id' => 7, 'submenu'=> [] }] }])
  end 
end
