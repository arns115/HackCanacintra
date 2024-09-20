class enviromental_challenge:
  def __init__(self, name, description, videogame_daily_time_reward, videogame_full_time_reward, days_to_complete, cur_days=0):
    self.name=name
    self.description=description
    self.videogame_daily_time_reward=videogame_daily_time_reward
    self.videogame_full_time_reward=videogame_full_time_reward
    self.days_to_complete=days_to_complete
    self.cur_days=cur_days
    
  def check_progress(self):
    return self.cur_days
    
  def get_name(self):
    return self.name
    
  def get_description(self):
    return self.description
  
  def get_videogame_daily_time_reward(self):
    return self.videogame_daily_time_reward
    
  def get_videogame_full_time_reward(self):
    return self.videogame_full_time_reward
    
  def get_days_to_complete(self):
    return self.days_to_complete
    
  
