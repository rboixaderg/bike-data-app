from guillotina import configure

app_settings = {
    # provide custom application settings here...
    "applications": [
        "guillotina.contrib.vocabularies",
        "guillotina.contrib.catalog.pg"
    ],
}


def includeme(root):
    """
    custom application initialization here
    """
    configure.scan('guillotina_bike_data_app.api')
    configure.scan('guillotina_bike_data_app.interfaces.activity')
    configure.scan('guillotina_bike_data_app.interfaces.lap')
    configure.scan('guillotina_bike_data_app.interfaces.segment')
    configure.scan('guillotina_bike_data_app.interfaces.segment_effort')
    configure.scan('guillotina_bike_data_app.content.activity')
    configure.scan('guillotina_bike_data_app.content.lap')
    configure.scan('guillotina_bike_data_app.content.segment')
    configure.scan('guillotina_bike_data_app.content.segment_effort')
