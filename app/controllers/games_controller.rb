class GamesController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def create
    winner = User.find_by(name: game_params[:winner])
    loser = User.find_by(name: game_params[:loser])
    Game.create(winner: winner, loser: loser)
  end

  private

  def game_params()
    params.require(:game).permit(:winner, :loser)
  end

end
