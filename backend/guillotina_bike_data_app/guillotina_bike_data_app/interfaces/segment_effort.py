from guillotina.interfaces import IItem
from guillotina import schema


class ISegmentEffort(IItem):
    id_strava = schema.TextLine(title="Strava id")
    name = schema.TextLine(title="Name")
    activity = schema.TextLine(title="Activity")
    segment = schema.TextLine(title="Segment")
    elapsed_time = schema.Int(title="Elapsed time")
    moving_time = schema.Int(title="Moving time")
    start_date = schema.Datetime(title="Start date")
    start_date_local = schema.Datetime(title="Start date local")
    distance = schema.Float(title="Distance")

    start_index = schema.Float(title="Start index")
    end_index = schema.Float(title="End index")
    average_cadence = schema.Float(title="Average cadence")
    device_watts = schema.Bool(title="Device watts")
    average_watts = schema.Float(title="Average watts")
