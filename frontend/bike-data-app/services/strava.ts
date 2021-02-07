import { STRAVA_PAGE_SIZE } from 'helpers/constants'
import { checkError } from './error'

export const stravaFetchWithToken = async (
  url: string,
  token: string,
  timestap: number,
  page: number
) => {
  const response = await fetch(
    `${url}?before=${timestap}&after=0&page=${page ?? 1}&per_page=${STRAVA_PAGE_SIZE}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const error = await checkError(response)
  if (error) {
    throw error
  }
  return response.json()
}
