class Game < ApplicationRecord
  belongs_to :loser, foreign_key: "loser", class_name: "User"
  belongs_to :winner, foreign_key: "winner", class_name: "User"
end
