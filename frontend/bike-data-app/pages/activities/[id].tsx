import { Loading, Pagination } from '@guillotinaweb/react-gmi'
import Menu from 'components/Menu'
import { TableSegmentEfforts } from 'components/SegmentEfforts/TableSegmentEfforts'
import { GUILLOTINA_PAGE_SIZE } from 'helpers/constants'
import { formattedDateFromSeconds, formattedDistance } from 'helpers/utils'
import { useRouter } from 'next/router'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'
import { RenderInfo } from 'components/RenderInfo'
import { RenderBoolean } from 'components/RenderBoolean'
import { useSession } from 'next-auth/client'
import { fetchGuillotina, saveActivityInGuillotina } from 'services/guillotina'
import { useState } from 'react'

export default function ItemActivityPage() {
  const [session] = useSession()
  const router = useRouter()
  const { id, page, title, sort, sort_direction } = router.query
  const formattedPage = parseInt((page as string) ?? '0', 0)
  const { dataGuillotina: activity, isLoading: loadingActivity } = useGetGuillotinaObject(id)
  const {
    dataGuillotina: segmentEfforts,
    isLoading: loadingSegmentEfforts,
  } = useGetGuillotinaObject(
    id
      ? `@search?type_name=SegmentEffort&b_size=${GUILLOTINA_PAGE_SIZE}&b_start=${
          formattedPage * GUILLOTINA_PAGE_SIZE
        }&activity=${id}&_sort_${sort_direction ?? 'asc'}=${sort ?? 'start_date'}${
          title && title !== '' ? `&title__in=${title}` : ''
        }`
      : null
  )
  const [loadingSave, setLoadingSave] = useState(false)
  const doPaginate = (page) => {
    router.push({
      pathname: '/activities/[id]',
      query: { ...router.query, page: page },
    })
  }

  return (
    <>
      <Menu />
      <section className="hero is-primary">
        <div className="container hero-body">
          <p className="title">Activity</p>
        </div>
      </section>
      <main className="container mt-5">
        {(loadingActivity || loadingSegmentEfforts) && <Loading />}
        {activity && segmentEfforts && (
          <>
            <div className="box">
              <div>
                <h1 className="title">Activity Info</h1>
                <RenderInfo label="Date" text={activity.title} />
                <RenderInfo label="Time" text={formattedDateFromSeconds(activity.moving_time)} />
                <RenderInfo label="Type" text={activity.type_activity ?? '---'} />
                <RenderInfo label="Distance" text={formattedDistance(activity.distance)} />
                <RenderInfo label="Avg Watts" text={activity.average_watts} />
                <RenderInfo
                  label="Weighted Watts"
                  text={activity.weighted_average_watts ?? '---'}
                />
                <RenderInfo
                  label="Device Watts"
                  text={<RenderBoolean value={activity.device_watts} />}
                />
                <RenderInfo
                  label="Kilojoules"
                  text={activity.kilojoules ? `${activity.kilojoules} Kj` : '---'}
                />
                <RenderInfo label="Total Segments efforts" text={segmentEfforts.items_total} />
                <button
                  onClick={async () => {
                    setLoadingSave(true)
                    await saveActivityInGuillotina(activity.id_strava, session.accessToken)
                    setLoadingSave(false)

                    window.location.reload()
                  }}
                  className={`button ${loadingSave ? 'is-loading' : ''}`}
                >
                  Synchronize
                </button>
                <button
                  onClick={async () => {
                    setLoadingSave(true)
                    for (let i = 0; i < segmentEfforts.items.length; i++) {
                      await fetchGuillotina({
                        method: 'delete',
                        path: segmentEfforts.items[i]['@name'],
                      })
                    }

                    setLoadingSave(false)

                    window.location.reload()
                  }}
                  className={`button ${loadingSave ? 'is-loading' : ''}`}
                >
                  Delete segments efforts
                </button>
                <a
                  rel="noreferrer"
                  className="button"
                  href={`https://www.strava.com/activities/${activity['@name']}`}
                  target="_blank"
                >
                  Strava
                </a>
              </div>
            </div>
            <div className="mt-3 mb-3">
              <Pagination
                current={formattedPage}
                total={segmentEfforts?.items_total || 0}
                key="pagination-top"
                doPaginate={doPaginate}
                pager={GUILLOTINA_PAGE_SIZE}
              />
            </div>

            <div className="is-flex is-justify-content-flex-start is-align-items-center">
              <div className="field mr-4">
                <label className="label">Sort</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={sort ?? 'start_date'}
                      onChange={(ev) => {
                        if (ev.target.value && ev.target.value !== '') {
                          router.push({
                            pathname: '/activities/[id]',
                            query: { ...router.query, sort: ev.target.value },
                          })
                        } else {
                          const newQueryParams = Object.assign({}, router.query)
                          delete newQueryParams['sort']
                          router.push({
                            pathname: '/activities/[id]',
                            query: newQueryParams,
                          })
                        }
                      }}
                    >
                      <option value="">---</option>
                      <option value="average_heartrate">AVG Heartrate</option>
                      <option value="average_watts">AVG Watts</option>
                      <option value="moving_time">Time</option>
                      <option value="start_date">Start date</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field mr-4">
                <label className="label">Sort direction</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={sort_direction ?? 'asc'}
                      onChange={(ev) => {
                        if (ev.target.value && ev.target.value !== '') {
                          router.push({
                            pathname: '/activities/[id]',
                            query: { ...router.query, sort_direction: ev.target.value },
                          })
                        } else {
                          const newQueryParams = Object.assign({}, router.query)
                          delete newQueryParams['sort_direction']
                          router.push({
                            pathname: '/activities/[id]',
                            query: newQueryParams,
                          })
                        }
                      }}
                    >
                      <option value="">---</option>
                      <option value="des">Desc</option>
                      <option value="asc">Asc</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field mr-4  mb-3">
                <label className="label">Filter by title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search..."
                    value={title ?? ''}
                    onChange={(ev) => {
                      if (ev.target.value && ev.target.value !== '') {
                        router.push({
                          pathname: '/activities/[id]',
                          query: { ...router.query, title: ev.target.value },
                        })
                      } else {
                        const newQueryParams = Object.assign({}, router.query)
                        delete newQueryParams['title']
                        router.push({
                          pathname: '/activities/[id]',
                          query: newQueryParams,
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <TableSegmentEfforts data={segmentEfforts.items} from="activity" />
          </>
        )}
      </main>
    </>
  )
}
