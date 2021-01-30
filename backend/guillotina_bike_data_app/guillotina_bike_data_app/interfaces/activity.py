from guillotina.interfaces import IFolder
from guillotina import schema


class IActivity(IFolder):
    id_strava = schema.TextLine(title="Strava id")
    distance = schema.Int(title="Distance")
    moving_time = schema.Int(title="Moving time")
    elapsed_time = schema.Int(title="Elapsed time")
    total_elevation_gain = schema.Int(title="Total elevation gain")
    type_activity = schema.TextLine(title="Type")  # Pass to vocabulary
    start_date = schema.Datetime(title="Start date")
    start_date_local = schema.Datetime(title="Start date local")
    timezone = schema.TextLine(title="Timezone")
    utc_offset = schema.Int(title="Utc offset")
    average_speed = schema.Float(title="Averge speed")
    max_speed = schema.Float(title="Max speed")
    average_cadence = schema.Float(title="Average cadence")
    average_watts = schema.Float(title="Average watts")
    weighted_average_watts = schema.Float(title="Weighted average watts")
    kilojoules = schema.Float(title="Kilojoules")
    device_watts = schema.Bool(title="Device watts")
    max_watts = schema.Float(title="Max watts")
    elev_high = schema.Float(title="Elev high")
    elev_low = schema.Float(title="Elev low")
    calories = schema.Float(title="Calories")
