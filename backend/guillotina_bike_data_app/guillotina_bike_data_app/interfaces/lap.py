

from guillotina import schema
from guillotina.interfaces import IItem


class ILap(IItem):
    id_strava = schema.TextLine(title="Strava id")
    name = schema.TextLine(title="Name")
    elapsed_time = schema.Int(title="Elapsed time")
    moving_time = schema.Int(title="Moving time")
    start_date = schema.Datetime(title="Start date")
    start_date_local = schema.Datetime(title="Start date local")
    distance = schema.Float(title="Distance")

    start_index = schema.Float(title="Start index")
    end_index = schema.Float(title="End index")
    total_elevation_gain = schema.Int(title="Total elevation gain")
    average_speed = schema.Float(title="Averge speed")
    max_speed = schema.Float(title="Max speed")
    average_cadence = schema.Float(title="Average cadence")
    average_watts = schema.Float(title="Average watts")
    device_watts = schema.Bool(title="Device watts")
