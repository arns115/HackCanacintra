import json
class InfoUser:
    def __init__(self, time=300, list_micro_challenges=[], 
                 list_intermediate_challenges=[], list_high_impact_challenges=[],
                 habits=[]):
        self.time=time
        self.list_micro_challenges=list_micro_challenges
        self.list_intermediate_challenges=list_intermediate_challenges
        self.list_high_impact_challenges=list_high_impact_challenges
        self.habits=habits

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    
def JSON_to_Info_User(s):
    return InfoUser(s["time"], s["list_intermediate_challenges"],
                    s["list_intermediate_challenges"],
                    s["list_high_impact_challenges"],
                    s["habits"])

