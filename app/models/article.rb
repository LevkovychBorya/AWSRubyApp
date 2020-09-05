class Article < ActiveRecord::Base
  include Commentable
  has_and_belongs_to_many :users

  validates :title, presence: true, uniqueness: true
  validates :body, presence: true
  validates :users, presence: true
  validates :status, presence: true

  enum status: [:shared, :restricted]
end
