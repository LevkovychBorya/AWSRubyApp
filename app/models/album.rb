class Album < ActiveRecord::Base
  validates :title, presence: true
  validates :description, length: {
    maximum: 300,
    tokenizer: lambda { |str| str.split(/\s+/) }
  }

  has_many :pictures, dependent: :destroy
  accepts_nested_attributes_for :pictures

  def as_json(options = {})
    super(options.merge(:include => [:pictures]))
  end
end
