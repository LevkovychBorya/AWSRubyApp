class Menu < ActiveRecord::Base 
  validates :parent_id, presence: true, numericality: {only_integer: true}
  validates :name, presence: true
  validates :url, presence: true

  def self.convert(input_id)
    self.select(:id, :name, :url, :parent_id).where(parent_id: input_id).map{ |element| {'id' => element[:id], 'name' => element[:name], 'url' => element[:url], 'parent_id' => element[:parent_id], 'submenu' => self.convert(element[:id])}}
  end 
end
