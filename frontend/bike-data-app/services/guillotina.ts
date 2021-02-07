import { API_GUILLOTINA_URL } from 'helpers/constants'
import { Auth } from '@guillotinaweb/react-gmi'
import { getClient } from '@guillotinaweb/react-gmi'
import { IndexSignature } from 'types/types'
import { checkError as checkErrorFn } from './error'

export const auth = new Auth(process.env.NEXT_PUBLIC_GUILLOTINA_URL)
export const client = getClient(process.env.NEXT_PUBLIC_GUILLOTINA_URL, auth)

interface IfetchGuillotina {
  path?: string
  method?: string
  data?: IndexSignature
  headers?: IndexSignature
  checkError?: boolean
}

export const fetchGuillotina = async ({
  path,
  method,
  data,
  headers,
  checkError,
}: IfetchGuillotina) => {
  const res = await fetch(`${API_GUILLOTINA_URL}${path ?? ''}`, {
    headers: headers ?? {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic cm9vdDpyb290`,
    },
    method: method ?? 'get',
    body: data ? JSON.stringify(data) : null,
  })
  if (checkError) {
    const error = await checkErrorFn(res)
    if (error) {
      throw error
    }
  }
  return res.json()
}

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

    await fetchGuillotina({
      method: 'post',
      data: {
        ...activityToSend,
        id_strava: activityToSend['id'].toString(),
        id: activityToSend['id'].toString(),
        '@type': 'Activity',
        title: activityToSend.name,
        type_activity: activityToSend.type,
      },
    })
    const segmentEfforts = dataActivityStrava.segment_efforts ?? []

    for (let index = 0; index < segmentEfforts.length; index++) {
      const segment_effort = segmentEfforts[index]
      await fetchGuillotina({
        method: 'post',
        data: {
          ...segment_effort.segment,
          id_strava: segment_effort.segment['id'].toString(),
          id: segment_effort.segment['id'].toString(),
          '@type': 'Segment',
          title: segment_effort.segment.name,
        },
      })

      const segmentEfforToSave = Object.assign({}, segment_effort)
      delete segmentEfforToSave['segment']
      delete segmentEfforToSave['activity']
      delete segmentEfforToSave['athlete']

      await fetchGuillotina({
        method: 'post',
        data: {
          ...segment_effort,
          id_strava: segment_effort['id'].toString(),
          id: segment_effort['id'].toString(),
          '@type': 'SegmentEffort',
          title: segment_effort.name,
          segment: segment_effort.segment['id'].toString(),
          activity: activityToSend['id'].toString(),
        },
      })
    }
  }
}
