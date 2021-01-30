from guillotina import configure
from guillotina import content
from guillotina_bike_data_app.interfaces.activity import IActivity


@configure.contenttype(
    type_name="Activity",
    schema=IActivity,
    behaviors=[
        "guillotina.behaviors.dublincore.IDublinCore",
    ],
    allowed_types=["Lap"]
)
class Activity(content.Folder):
    pass
