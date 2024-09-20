from enviromental_challenge import enviromental_challenge
class high_impact_enviromental_challenge(enviromental_challenge):
  def __init__(self, name, description, videogame_daily_time_reward=3600, videogame_full_time_reward=172800, days_to_complete=21, cur_days=0):
    super().__init__(name, description, videogame_daily_time_reward, videogame_full_time_reward, days_to_complete)
  
