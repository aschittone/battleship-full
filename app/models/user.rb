class User < ApplicationRecord

  def games
    Game.where("winner = ? or loser = ?", id, id)
  end

  def wins
    Game.where("winner = ?", id)
  end

  def losses
    Game.where("loser = ?", id)
  end

  def times_won=(times_won)
    @times_won = times_won
  end

end
