import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'
import useSWR from 'swr'
import Menu from '../components/Menu'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { TableStravaActivitiesComponent } from '../components/StravaActivities/TableStravaActivities'
import { Loading } from '@guillotinaweb/react-gmi'
import { API_STRAVA_URL } from 'helpers/constants'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'
import { stravaFetchWithToken } from 'services/strava'

export default function Synchronize() {
  const [session, loading] = useSession()
  const router = useRouter()
  const { page } = router.query

  const { data: dataStrava, error } = useSWR(
    session?.accessToken
      ? [`${API_STRAVA_URL}athlete/activities`, session.accessToken, page]
      : null,
    (url) =>
      stravaFetchWithToken(
        url,
        session.accessToken,
        new Date().getTime() / 1000,
        parseInt((page as string) ?? '1', 0)
      )
  )

  const { dataGuillotina, mutate } = useGetGuillotinaObject(
    dataStrava
      ? `@search?type_name=Activity&b_size=200&id__in=${(dataStrava || [])
          .map((activity) => activity.id)
          .join(',')}`
      : null
  )

  const dataToRender = useMemo(() => {
    if (dataStrava && 'errors' in dataStrava) {
      return []
    }
    return dataStrava
  }, [dataStrava])

  console.log(error)
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
      </div>

      <main className="container">
        <div className="is-flex is-justify-content-space-between mb-4">
          {parseInt(page as string, 0) > 1 && (
            <button
              className="button"
              onClick={() =>
                router.push({
                  pathname: '/synchronize',
                  query: { page: parseInt(page as string, 0) - 1 },
                })
              }
            >
              Go to Previous Page
            </button>
          )}
          {dataStrava && dataStrava.length === 200 && (
            <button
              className="button"
              onClick={() =>
                router.push({
                  pathname: '/synchronize',
                  query: { page: parseInt((page as string) ?? '1', 0) + 1 },
                })
              }
            >
              Go to Next Page
            </button>
          )}
        </div>
        {error && <div className="box">{error?.info?.message}</div>}
        {!dataStrava && !error && <Loading />}

        <TableStravaActivitiesComponent
          dataToRender={dataToRender ?? []}
          dataGuillotina={dataGuillotina}
          mutate={mutate}
        />
      </main>
    </>
  )
}
