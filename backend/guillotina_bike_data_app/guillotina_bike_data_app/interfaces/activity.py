from guillotina.interfaces import IFolder
from guillotina import schema
from guillotina.directives import index_field, metadata


class IActivity(IFolder):

    metadata("id_strava")
    index_field("id_strava", type="text")
    id_strava = schema.TextLine(title="Strava id")

    metadata("name")
    index_field("name", type="text")
    name = schema.TextLine(title="Name")

    metadata("distance")
    index_field("distance", type="float")
    distance = schema.Int(title="Distance")

    metadata("moving_time")
    index_field("moving_time", type="int")
    moving_time = schema.Int(title="Moving time")

    elapsed_time = schema.Int(title="Elapsed time")

    metadata("moving_time")
    index_field("moving_time", type="int")
    total_elevation_gain = schema.Int(title="Total elevation gain")

    metadata("type_activity")
    index_field("type_activity", type="text")
    type_activity = schema.TextLine(title="Type")  # Pass to vocabulary

    metadata("start_date")
    index_field("start_date", type="date")
    start_date = schema.Datetime(title="Start date")

    start_date_local = schema.Datetime(title="Start date local")
    timezone = schema.TextLine(title="Timezone")
    utc_offset = schema.Int(title="Utc offset")

    metadata("average_speed")
    index_field("average_speed", type="float")
    average_speed = schema.Float(title="Averge speed")

    metadata("max_speed")
    index_field("max_speed", type="float")
    max_speed = schema.Float(title="Max speed")

    metadata("average_cadence")
    index_field("average_cadence", type="float")
    average_cadence = schema.Float(title="Average cadence")

    metadata("average_watts")
    index_field("average_watts", type="float")
    average_watts = schema.Float(title="Average watts")

    metadata("weighted_average_watts")
    index_field("weighted_average_watts", type="float")
    weighted_average_watts = schema.Float(title="Weighted average watts")

    metadata("kilojoules")
    index_field("kilojoules", type="float")
    kilojoules = schema.Float(title="Kilojoules")

    metadata("device_watts")
    index_field("device_watts", type="boolean")
    device_watts = schema.Bool(title="Device watts")

    metadata("max_watts")
    index_field("max_watts", type="float")
    max_watts = schema.Float(title="Max watts")

    elev_high = schema.Float(title="Elev high")
    elev_low = schema.Float(title="Elev low")
    calories = schema.Float(title="Calories")
