class Event < ActiveRecord::Base
  validates :name, :description, :date, :place, :capacity, presence: true
  validates :name, length: {in: 5..50}
  validates :description, length: {in: 50..1000}

  geocoded_by :place
  after_validation :geocode, :if => :place_changed?
end
