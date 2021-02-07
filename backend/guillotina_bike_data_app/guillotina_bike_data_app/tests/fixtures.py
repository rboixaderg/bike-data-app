import json
import os

import pytest
from guillotina import testing
from guillotina.tests.fixtures import ContainerRequesterAsyncContextManager
from pytest_docker_fixtures import images

from guillotina_bike_data_app.tests.activity_json import activity
from guillotina_bike_data_app.tests.segment_effort_json import segment_effort
from guillotina_bike_data_app.tests.segment_json import segment

NOT_POSTGRES = os.environ.get("DATABASE", "DUMMY") in ("cockroachdb", "DUMMY")


def base_settings_configurator(settings):
    if 'applications' in settings:
        settings['applications'].append('guillotina_bike_data_app')
        settings['applications'].append('guillotina.contrib.catalog.pg')
    else:
        settings['applications'] = [
            'guillotina_bike_data_app', 'guillotina.contrib.catalog.pg']

    settings['load_utilities'] = {
        "catalog": {
            "provides": "guillotina.interfaces.ICatalogUtility",
            "factory": "guillotina.contrib.catalog.pg.PGSearchUtility",
        }
    }


testing.configure_with(base_settings_configurator)
images.configure("postgresql", version="10.9")


class guillotina_bike_data_app_Requester(ContainerRequesterAsyncContextManager):  # noqa

    async def __aenter__(self):
        await super().__aenter__()
        resp, status = await self.requester(
            'POST', '/db/guillotina',
            data=json.dumps(activity)
        )
        assert status == 201
        resp, status = await self.requester(
            'POST', '/db/guillotina',
            data=json.dumps(segment)
        )
        assert status == 201
        resp, status = await self.requester(
            'POST', '/db/guillotina',
            data=json.dumps(segment_effort)
        )
        assert status == 201
        return self.requester


@pytest.fixture(scope='function')
async def guillotina_bike_data_app_requester(guillotina):
    return guillotina_bike_data_app_Requester(guillotina)
