module Commentable
  extend ActiveSupport::Concern
  included { has_many :comments, as: :commentable, dependent: :destroy }
end
