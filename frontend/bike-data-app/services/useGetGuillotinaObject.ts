import { API_GUILLOTINA_URL } from 'helpers/constants'
import useSWR from 'swr'
import { fetchGuillotina } from './guillotina'

export function useGetGuillotinaObject(path) {
  const { data, error, mutate } = useSWR(path ? `${API_GUILLOTINA_URL}${path}` : null, (url) =>
    fetchGuillotina({ path: url })
  )
  return {
    dataGuillotina: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
