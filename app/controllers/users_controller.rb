class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    user_results = User.all.sort_by {|user| -user.wins.length}
    users_results = user_results.map do |user|
      {user_name: user.name, user_wins: user.wins.length}
    end
    # users_results.each do |users|
    #   users.each do |key, value|
    #   key = value.sort{ |a,b| a[1]<=>b[1] }
    # end
    render json: users_results
  end

  def create
    user = User.find_or_create_by(user_params)
  end


  private

  def user_params
    params.require(:user).permit(:name)
  end
end
