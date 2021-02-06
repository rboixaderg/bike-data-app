import { CustomError } from 'types/types'
import { checkError } from './error'

export const stravaFetchWithToken = async (
  url: string,
  token: string,
  timestap: number,
  page: number
) => {
  const response = await fetch(`${url}?before=${timestap}&after=0&page=${page ?? 1}&per_page=200`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const error = await checkError(response)
  if (error) {
    throw error
  }
  return response.json()
}
