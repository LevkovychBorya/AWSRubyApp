class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  delegate :comments, to: :user
  validates :body, presence: true, length: {maximum: 1000}
  validates :commentable, presence: true
end
