from guillotina import configure, content

from guillotina_bike_data_app.interfaces.segment import ISegment


@configure.contenttype(
    type_name="Segment",
    schema=ISegment,
    behaviors=[
        "guillotina.behaviors.dublincore.IDublinCore",
    ]
)
class Segment(content.Item):
    pass
