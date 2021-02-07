from guillotina import schema
from guillotina.directives import index_field, metadata
from guillotina.interfaces import IItem


class ISegment(IItem):
    metadata("id_strava")
    index_field("id_strava", type="text")
    id_strava = schema.TextLine(title="Strava id")

    metadata("name")
    index_field("name", type="text")
    name = schema.TextLine(title="Name")

    metadata("type_activity")
    index_field("type_activity", type="text")
    type_activity = schema.TextLine(title="Type")  # Pass to vocabulary

    metadata("distance")
    index_field("distance", type="float")
    distance = schema.Int(title="Distance")

    average_grade = schema.Float(title="Average grade")
    maximum_grade = schema.Float(title="Maximum grade")
    elevation_high = schema.Float(title="Elevation high")
    elevation_low = schema.Float(title="Elevation loc")
    climb_category = schema.Int(title="Climb category")
    city = schema.TextLine(title="City")
    state = schema.TextLine(title="State")
    country = schema.TextLine(title="Country")
