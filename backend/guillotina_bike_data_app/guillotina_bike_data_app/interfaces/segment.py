from guillotina.interfaces import IItem
from guillotina import schema


class ISegment(IItem):
    id_strava = schema.TextLine(title="Strava id")
    name = schema.TextLine(title="Name")
    type_activity = schema.TextLine(title="Type")  # Pass to vocabulary
    distance = schema.Int(title="Distance")
    average_grade = schema.Float(title="Average grade")
    maximum_grade = schema.Float(title="Maximum grade")
    elevation_high = schema.Float(title="Elevation high")
    elevation_low = schema.Float(title="Elevation loc")
    climb_category = schema.Int(title="Climb category")
    city = schema.TextLine(title="City")
    state = schema.TextLine(title="State")
    country = schema.TextLine(title="Country")
