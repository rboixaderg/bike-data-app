import useSWR from 'swr'
import { fetchGuillotina } from './guillotina'

export function useGetGuillotinaObject(path) {
  const { data, error, mutate } = useSWR(path ? path : null, (url) =>
    fetchGuillotina({ path: url, checkError: true })
  )
  return {
    dataGuillotina: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
