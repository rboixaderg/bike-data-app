import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'
import useSWR from 'swr'
import Menu from '../components/Menu'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { TableStravaActivitiesComponent } from '../components/StravaActivities/TableStravaActivities'
import { saveActivityInGuillotina } from '../services/guillotina'

// const fetcher = async (input: RequestInfo, init: RequestInit) => {
//   const res = await fetch(input, init);
//   return res.json();
// };

const fetchSearchGuillotina = async (url, dataStrava) => {
  const res = await fetch(
    `${url}?type_name=Activity&b_size=200&id__in=${dataStrava
      .map((activity) => activity.id)
      .join(',')}`,
    {
      headers: {
        Authorization: `Basic cm9vdDpyb290`,
      },
    }
  )
  return res.json()
}

const fetchWithToken = async (url: string, token: string, timestap: number, page: number) => {
  const res = await fetch(`${url}?before=${timestap}&after=0&page=${page ?? 1}&per_page=200`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}

export default function Synchronize() {
  const [session, loading] = useSession()
  const router = useRouter()
  const { page } = router.query

  const { data: dataStrava } = useSWR(
    session?.accessToken
      ? ['https://www.strava.com/api/v3/athlete/activities', session.accessToken, page]
      : null,
    (url) =>
      fetchWithToken(
        url,
        session.accessToken,
        new Date().getTime() / 1000,
        parseInt((page as string) ?? '1', 0)
      )
  )

  const { data: dataGuillotina, mutate } = useSWR(
    session?.accessToken && dataStrava
      ? ['http://localhost:8080/db/container/@search', dataStrava]
      : null,
    (url) => fetchSearchGuillotina(url, dataStrava)
  )

  const dataToRender = useMemo(() => {
    if (dataStrava && 'errors' in dataStrava) {
      return []
    }
    return dataStrava
  }, [dataStrava])

  const saveAllInGuillotina = () => {
    ;(dataStrava ?? []).map((activity) => {
      if (
        !dataGuillotina.items.find(
          (activityGuillo) => activityGuillo.id === activity['id'].toString()
        )
      ) {
        saveActivityInGuillotina(activity, session.accessToken)
      }
    })
  }

  return (
    <>
      <Head>
        <title>Bike data App synchronize page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />

      <section className="hero is-primary">
        <div className="container hero-body">
          <p className="title">Strava activities</p>
        </div>
      </section>

      <div className="container mt-3 mb-3">
        {!session && !loading && (
          <button onClick={() => signIn()} className="button">
            Sign in strava
          </button>
        )}
        {session && (
          <button className="button" onClick={() => signOut()}>
            Sign out strava
          </button>
        )}

        <button className="button ml-5" onClick={() => saveAllInGuillotina()}>
          Sincronize all activities to guillotina
        </button>
      </div>

      <main className="container">
        <TableStravaActivitiesComponent
          dataToRender={dataToRender ?? []}
          dataGuillotina={dataGuillotina}
          mutate={mutate}
        />
      </main>
    </>
  )
}
