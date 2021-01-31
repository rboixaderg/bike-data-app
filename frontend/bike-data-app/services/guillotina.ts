import { Auth } from '@guillotinaweb/react-gmi'
import { getClient } from '@guillotinaweb/react-gmi'

export const auth = new Auth(process.env.NEXT_PUBLIC_GUILLOTINA_URL)
export const client = getClient(process.env.NEXT_PUBLIC_GUILLOTINA_URL, auth)

export const saveActivityInGuillotina = async (activity, accessToken) => {
  const res = await fetch(
    `https://www.strava.com/api/v3/activities/${activity.id}?include_all_efforts=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  const dataActivityStrava = await res.json()
  if (res.ok) {
    const activityToSend = Object.assign({}, dataActivityStrava)
    delete activityToSend['laps']
    delete activityToSend['map']
    delete activityToSend['photos']
    delete activityToSend['segment_efforts']
    delete activityToSend['splits_metric']
    delete activityToSend['splits_standard']
    delete activityToSend['start_latlng']
    delete activityToSend['end_latlng']
    delete activityToSend['gear']
    delete activityToSend['athlete']

    await fetch(`http://localhost:8080/db/container`, {
      method: 'POST',
      headers: {
        Authorization: `Basic cm9vdDpyb290`,
      },
      body: JSON.stringify({
        ...activityToSend,
        id_strava: activityToSend['id'].toString(),
        id: activityToSend['id'].toString(),
        '@type': 'Activity',
        title: activityToSend.name,
      }),
    })
    const segmentEfforts = dataActivityStrava.segment_efforts ?? []

    for (let index = 0; index < segmentEfforts.length; index++) {
      const segment_effort = segmentEfforts[index]
      await fetch(`http://localhost:8080/db/container`, {
        method: 'POST',
        headers: {
          Authorization: `Basic cm9vdDpyb290`,
        },
        body: JSON.stringify({
          ...segment_effort.segment,
          id_strava: segment_effort.segment['id'].toString(),
          id: segment_effort.segment['id'].toString(),
          '@type': 'Segment',
          title: segment_effort.segment.name,
        }),
      })

      const segmentEfforToSave = Object.assign({}, segment_effort)
      delete segmentEfforToSave['segment']
      delete segmentEfforToSave['activity']
      delete segmentEfforToSave['athlete']

      await fetch(`http://localhost:8080/db/container`, {
        method: 'POST',
        headers: {
          Authorization: `Basic cm9vdDpyb290`,
        },
        body: JSON.stringify({
          ...segment_effort,
          id_strava: segment_effort['id'].toString(),
          id: segment_effort['id'].toString(),
          '@type': 'SegmentEffort',
          title: segment_effort.name,
          segment: segment_effort.segment['id'].toString(),
          activity: activityToSend['id'].toString(),
        }),
      })
    }
  }
}
