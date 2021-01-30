import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import useSWR from "swr";

// const fetcher = async (input: RequestInfo, init: RequestInit) => {
//   const res = await fetch(input, init);
//   return res.json();
// };

const fetchWithToken = async (
  url: string,
  token: string,
  timestap: number,
  page: number
) => {
  const res = await fetch(
    `${url}?before=${timestap}&after=0&page=${page}&per_page=200`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};
// Get all activities https://www.strava.com/api/v3/athlete/activities?before=1611871426&after=0&page=1&per_page=200

export default function Home() {
  const [session, loading] = useSession();

  const { data, error } = useSWR(
    session?.accessToken
      ? [
          "https://www.strava.com/api/v3/athlete/activities",
          session.accessToken,
        ]
      : null,
    (url) =>
      fetchWithToken(url, session.accessToken, new Date().getTime() / 1000, 1)
  );

  console.log(session);
  console.log(data, error);

  return (
    <div className="container">
      <Head>
        <title>Bike data App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && !loading && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
