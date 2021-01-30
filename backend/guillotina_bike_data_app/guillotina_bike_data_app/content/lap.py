from guillotina import configure
from guillotina import content
from guillotina_bike_data_app.interfaces.lap import ILap


@configure.contenttype(
    type_name="Lap",
    schema=ILap,
    behaviors=[
        "guillotina.behaviors.dublincore.IDublinCore",
    ]
)
class Lap(content.Item):
    pass
