import Head from 'next/head'
import Menu from '../components/Menu'

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
