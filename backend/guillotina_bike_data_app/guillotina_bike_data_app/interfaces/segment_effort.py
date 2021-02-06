from guillotina.interfaces import IItem
from guillotina import schema
from guillotina.directives import index_field, metadata


class ISegmentEffort(IItem):

    metadata("id_strava")
    index_field("id_strava", type="text")
    id_strava = schema.TextLine(title="Strava id")

    metadata("name")
    index_field("name", type="text")
    name = schema.TextLine(title="Name")

    metadata("activity")
    index_field("activity", type="text")
    activity = schema.TextLine(title="Activity")

    metadata("segment")
    index_field("segment", type="text")
    segment = schema.TextLine(title="Segment")

    elapsed_time = schema.Int(title="Elapsed time")
    moving_time = schema.Int(title="Moving time")
    start_date = schema.Datetime(title="Start date")
    start_date_local = schema.Datetime(title="Start date local")

    metadata("distance")
    index_field("distance", type="float")
    distance = schema.Float(title="Distance")

    start_index = schema.Float(title="Start index")
    end_index = schema.Float(title="End index")

    metadata("average_cadence")
    index_field("average_cadence", type="float")
    average_cadence = schema.Float(title="Average cadence")

    metadata("device_watts")
    index_field("device_watts", type="boolean")
    device_watts = schema.Bool(title="Device watts")

    metadata("average_watts")
    index_field("average_watts", type="float")
    average_watts = schema.Float(title="Average watts")
