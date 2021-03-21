import { Loading, Pagination } from '@guillotinaweb/react-gmi'
import Menu from 'components/Menu'
import { TableSegmentEfforts } from 'components/SegmentEfforts/TableSegmentEfforts'
import { GUILLOTINA_PAGE_SIZE } from 'helpers/constants'
import { formattedDateFromSeconds, formattedDistance } from 'helpers/utils'
import { useRouter } from 'next/router'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'
import { RenderInfo } from 'components/RenderInfo'
import { RenderBoolean } from 'components/RenderBoolean'

export default function ItemActivityPage() {
  const router = useRouter()
  const { id, page } = router.query
  const formattedPage = parseInt((page as string) ?? '0', 0)
  const { dataGuillotina: activity, isLoading: loadingActivity } = useGetGuillotinaObject(id)
  const {
    dataGuillotina: segmentEfforts,
    isLoading: loadingSegmentEfforts,
  } = useGetGuillotinaObject(
    id
      ? `@search?type_name=SegmentEffort&b_size=${GUILLOTINA_PAGE_SIZE}&b_start=${
          formattedPage * GUILLOTINA_PAGE_SIZE
        }&activity=${id}&_sort_des=start_date`
      : null
  )

  const doPaginate = (page) => {
    router.push({
      pathname: '/activities/[id]',
      query: { id: id, page: page },
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

            <TableSegmentEfforts data={segmentEfforts.items} from="activity" />
          </>
        )}
      </main>
    </>
  )
}
