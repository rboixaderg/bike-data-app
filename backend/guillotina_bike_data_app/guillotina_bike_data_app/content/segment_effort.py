from guillotina import configure
from guillotina import content
from guillotina_bike_data_app.interfaces.segment_effort import ISegmentEffort


@configure.contenttype(
    type_name="SegmentEffort",
    schema=ISegmentEffort,
    behaviors=[
        "guillotina.behaviors.dublincore.IDublinCore",
    ]
)
class SegmentEffort(content.Item):
    pass
