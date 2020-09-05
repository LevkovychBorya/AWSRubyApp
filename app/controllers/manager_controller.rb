class ManagerController < ApplicationController
  layout 'manager'
#test
  before_action :authenticate_user!
  before_action :require_admin
end
