import Head from 'next/head'
import Menu from '../components/Menu'

// Get all activities https://www.strava.com/api/v3/athlete/activities?before=1611871426&after=0&page=1&per_page=200

export default function Home() {
  return (
    <>
      <Head>
        <title>Bike data App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
      </div>
    </>
  )
}
