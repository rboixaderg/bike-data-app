import json

import pytest

from guillotina_bike_data_app.tests.lap_json import lap


pytestmark = pytest.mark.asyncio


async def test_lap(guillotina_bike_data_app_requester):
    # mediterrania
    async with guillotina_bike_data_app_requester as requester:
        resp, status = await requester(
            'POST', '/db/guillotina/activity_test', data=json.dumps(lap))
        assert status == 201
