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

const fetchSearchGuillotina = async (url, dataStrava) => {
  const res = await fetch(
    `${url}?type_name=Activity&b_size=200&id__in=${dataStrava
      .map((activity) => activity.id)
      .join(",")}`,
    {
      headers: {
        Authorization: `Basic cm9vdDpyb290`,
      },
    }
  );
  return res.json();
};

const fetchWithToken = async (
  url: string,
  token: string,
  timestap: number,
  page: number
) => {
  const res = await fetch(
    `${url}?before=${timestap}&after=0&page=${page ?? 1}&per_page=200`,
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

  const { data: dataStrava } = useSWR(
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

  const { data: dataGuillotina, mutate } = useSWR(
    session?.accessToken && dataStrava
      ? ["http://localhost:8080/db/container/@search", dataStrava]
      : null,
    (url) => fetchSearchGuillotina(url, dataStrava)
  );

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
      mutate();
    }
  };
  const saveAllInGuillotina = () => {
    (dataStrava ?? []).map((activity) => {
      if (
        !dataGuillotina.items.find(
          (activityGuillo) => activityGuillo.id === activity["id"].toString()
        )
      ) {
        saveActivityInGuillotina(activity);
      }
    });
  };

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
        <div className="table-container">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Sport</th>
                <th>Date</th>
                <th>Title</th>
                <th>Distance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(dataToRender ?? []).map((activity) => {
                return (
                  <tr>
                    <td>
                      <div>{activity.type}</div>
                    </td>
                    <td>
                      <div>
                        {new Date(
                          activity.start_date_local
                        ).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div>{activity.name}</div>
                    </td>
                    <td>
                      <div>{activity.distance}</div>
                    </td>
                    <td>
                      {dataGuillotina &&
                        !dataGuillotina.items.find(
                          (activityGuillo) =>
                            activityGuillo.id === activity["id"].toString()
                        ) && (
                          <button
                            onClick={() => saveActivityInGuillotina(activity)}
                            className="button"
                          >
                            Saved
                          </button>
                        )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
