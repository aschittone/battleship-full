class GameChannel < ApplicationCable::Channel
  def subscribed

    stream_from "game_#{params[:game]}"
  end

  def receive(data)
  	
    ActionCable.server.broadcast("game_#{params[:game]}", data)
  end
end