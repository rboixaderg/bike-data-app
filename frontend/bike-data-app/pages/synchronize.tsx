import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import useSWR from "swr";
import Menu from "../components/Menu";
import { useRouter } from "next/router";
import { useMemo } from "react";

// const fetcher = async (input: RequestInfo, init: RequestInit) => {
//   const res = await fetch(input, init);
//   return res.json();
// };

const fetchSearchGuillotina = async (url) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic cm9vdDpyb290`,
    },
  });
  return res.json();
};

const fetchWithToken = async (
  url: string,
  token: string,
  timestap: number,
  page: number
) => {
  const res = await fetch(
    `${url}?before=${timestap}&after=0&page=${page ?? 1}&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};

export default function Synchronize() {
  const [session, loading] = useSession();
  const router = useRouter();
  const { page } = router.query;

  const {
    data: dataStrava,
    error: errorDataStrava,
  } = useSWR(
    session?.accessToken
      ? [
          "https://www.strava.com/api/v3/athlete/activities",
          session.accessToken,
          page,
        ]
      : null,
    (url) =>
      fetchWithToken(
        url,
        session.accessToken,
        new Date().getTime() / 1000,
        parseInt((page as string) ?? "1", 0)
      )
  );

  const {
    data: dataGuillotina,
    error: errorDataGuillotina,
  } = useSWR(
    session?.accessToken && dataStrava
      ? [
          "http://localhost:8080/db/container/@search?type_name=Activity",
          session.accessToken,
        ]
      : null,
    (url) => fetchSearchGuillotina(url)
  );

  console.log("dataStrava", dataStrava, errorDataStrava);
  console.log(dataGuillotina, errorDataGuillotina);

  const dataToRender = useMemo(() => {
    if (dataStrava && "errors" in dataStrava) {
      return [];
    }
    return dataStrava;
  }, [dataStrava]);

  const saveActivityInGuillotina = async (activity) => {
    const res = await fetch(
      `https://www.strava.com/api/v3/activities/${activity.id}?include_all_efforts=true`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const dataActivityStrava = await res.json();
    if (res.ok) {
      const activityToSend = Object.assign({}, dataActivityStrava);
      delete activityToSend["laps"];
      delete activityToSend["map"];
      delete activityToSend["photos"];
      delete activityToSend["segment_efforts"];
      delete activityToSend["splits_metric"];
      delete activityToSend["splits_standard"];
      delete activityToSend["start_latlng"];
      delete activityToSend["end_latlng"];
      delete activityToSend["gear"];
      delete activityToSend["athlete"];

      await fetch(`http://localhost:8080/db/container`, {
        method: "POST",
        headers: {
          Authorization: `Basic cm9vdDpyb290`,
        },
        body: JSON.stringify({
          ...activityToSend,
          id_strava: activityToSend["id"].toString(),
          id: activityToSend["id"].toString(),
          "@type": "Activity",
          title: activityToSend.name,
        }),
      });

      (dataActivityStrava.segment_efforts ?? []).map(async (segment_effort) => {
        await fetch(`http://localhost:8080/db/container`, {
          method: "POST",
          headers: {
            Authorization: `Basic cm9vdDpyb290`,
          },
          body: JSON.stringify({
            ...segment_effort.segment,
            id_strava: segment_effort.segment["id"].toString(),
            id: segment_effort.segment["id"].toString(),
            "@type": "Segment",
            title: segment_effort.segment.name,
          }),
        });

        const segmentEfforToSave = Object.assign({}, segment_effort);
        delete segmentEfforToSave["segment"];
        delete segmentEfforToSave["activity"];
        delete segmentEfforToSave["athlete"];

        await fetch(`http://localhost:8080/db/container`, {
          method: "POST",
          headers: {
            Authorization: `Basic cm9vdDpyb290`,
          },
          body: JSON.stringify({
            ...segment_effort,
            id_strava: segment_effort["id"].toString(),
            id: segment_effort["id"].toString(),
            "@type": "SegmentEffort",
            title: segment_effort.name,
            segment: segment_effort.segment["id"].toString(),
            activity: activityToSend["id"].toString(),
          }),
        });
      });
    }
  };
  const saveAllInGuillotina = () => {
    (dataStrava ?? []).map((activity) => {
      saveActivityInGuillotina(activity);
    });
  };

  return (
    <>
      <Head>
        <title>Bike data App synchronize page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {!session && !loading && (
            <button
              onClick={() => signIn()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          )}
          {session && (
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          )}
        </div>
      </header>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Strava activities
      </h2>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <button
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => saveAllInGuillotina()}
        >
          Sincronize all
        </button>
      </div>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Sport
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Distance
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Save</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {(dataToRender ?? []).map((activity) => {
                            return (
                              <tr key={`strava_activity_${activity.id}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {activity.type}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {new Date(
                                      activity.start_date_local
                                    ).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {activity.name}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {activity.distance}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() =>
                                      saveActivityInGuillotina(activity)
                                    }
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Saved
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
