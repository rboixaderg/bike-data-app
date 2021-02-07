export const API_GUILLOTINA_URL = `${process.env.NEXT_PUBLIC_GUILLOTINA_URL}${process.env.NEXT_PUBLIC_GUILLOTINA_DB_CONTAINER}`
export const API_STRAVA_URL = process.env.NEXT_PUBLIC_STRAVA_URL
export const GUILLOTINA_PAGE_SIZE = parseInt(
  process.env.NEXT_PUBLIC_GUILLOTINA_PAGE_SIZE || '200',
  0
)
export const STRAVA_PAGE_SIZE = parseInt(process.env.NEXT_PUBLIC_STRAVA_PAGE_SIZE || '200', 0)
