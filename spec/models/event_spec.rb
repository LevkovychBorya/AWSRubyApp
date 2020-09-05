require 'rails_helper'

RSpec.describe Event, :type => :model do
  it "creates and save new event" do
    event = Event.create!(name: "Reading the best poems by Lord Byron",
        description: "I had a dream, which was not all a dream. The bright sun was extinguish’d, and the stars Did wander darkling in the eternal space, Rayless, and pathless, and the icy earth",
        capacity: 15,
        date: "2015-08-01 12:00",
        place: "Lviv Franko National University",
        latitude: 49.84061,
        longitude: 24.02251)
    event.save
    expect(event.save).to eq(true)
  end

  it "don't create event without name" do
    event = build(:event, name: nil)
    expect(event.valid?).to eq(false)
  end

  it "don't create event without description" do
    event = build(:event, description: nil)
    expect(event.valid?).to eq(false)
  end

  it "don't create event without capacity" do
    event = build(:event, capacity: nil)
    expect(event.valid?).to eq(false)
  end

  it "don't create event without date" do
    event = build(:event, date: nil)
    expect(event.valid?).to eq(false)
  end

  it "don't create event without place" do
    event = build(:event, place: nil)
    expect(event.valid?).to eq(false)
  end

  it "don't create event with too short name" do
    event = build(:event, :with_short_name)
    expect(event.valid?).to eq(false)
  end

  it "don't create event with too long name" do
    event = build(:event, :with_long_name)
    expect(event.valid?).to eq(false)
  end

  it "don't create event with too short description" do
    event = build(:event, :with_short_description)
    expect(event.valid?).to eq(false)
  end

end