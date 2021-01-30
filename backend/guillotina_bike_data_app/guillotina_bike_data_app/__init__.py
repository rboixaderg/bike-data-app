from guillotina import configure


app_settings = {
    # provide custom application settings here...
}


def includeme(root):
    """
    custom application initialization here
    """
    configure.scan('guillotina_bike_data_app.api')
    configure.scan('guillotina_bike_data_app.install')
