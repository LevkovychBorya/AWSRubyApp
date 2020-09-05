require 'file_size_validator'
class Picture < ActiveRecord::Base
  validates :album, presence: true
  belongs_to :album
  mount_uploader :image, ImageUploader
  validates :image, 
      :file_size => { 
      :maximum => 0.5.megabytes.to_i 
    } 
end
