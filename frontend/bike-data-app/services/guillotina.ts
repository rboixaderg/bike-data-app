import { Auth } from '@guillotinaweb/react-gmi'
import { getClient } from '@guillotinaweb/react-gmi'

export const auth = new Auth(process.env.NEXT_PUBLIC_GUILLOTINA_URL)
export const client = getClient(process.env.NEXT_PUBLIC_GUILLOTINA_URL, auth)
