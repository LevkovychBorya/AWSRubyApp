require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :html, :json

  protect_from_forgery with: :exception

  def index
    render text: '', layout: true
  end

  def require_admin
    p current_user.role
    return if current_user && current_user.role == 'admin'
    flash[:error] = "You are not an admin"
    redirect_to root_path
  end

  private

  def check_authentification
    head :forbidden unless user_signed_in?
  end
end
