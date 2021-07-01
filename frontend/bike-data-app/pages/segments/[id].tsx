import { Loading, Pagination } from '@guillotinaweb/react-gmi'
import Menu from 'components/Menu'
import { RenderInfo } from 'components/RenderInfo'
import { TableSegmentEfforts } from 'components/SegmentEfforts/TableSegmentEfforts'
import { GUILLOTINA_PAGE_SIZE } from 'helpers/constants'
import { formattedDistance } from 'helpers/utils'
import { useRouter } from 'next/router'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'

export default function ItemSegmentPage() {
  const router = useRouter()
  const { id, page, sort, sort_direction, device_watts } = router.query
  const formattedPage = parseInt((page as string) ?? '0', 0)
  const { dataGuillotina: segment, isLoading: loadingSegment } = useGetGuillotinaObject(id)
  const {
    dataGuillotina: segmentEfforts,
    isLoading: loadingSegmentEfforts,
  } = useGetGuillotinaObject(
    id
      ? `@search?type_name=SegmentEffort&b_size=${GUILLOTINA_PAGE_SIZE}&b_start=${
          formattedPage * GUILLOTINA_PAGE_SIZE
        }&segment=${id}&_sort_${sort_direction ?? 'des'}=${sort ?? 'start_date'}${
          device_watts ? `&device_watts=${device_watts}` : ''
        }`
      : null
  )

  const doPaginate = (page) => {
    router.push({
      pathname: '/segments/[id]',
      query: { ...router.query, page: page },
    })
  }

  return (
    <>
      <Menu />
      <section className="hero is-primary">
        <div className="container hero-body">
          <p className="title">Item segment</p>
        </div>
      </section>
      <main className="container mt-5">
        {(loadingSegment || loadingSegmentEfforts) && <Loading />}
        {segment && segmentEfforts && (
          <>
            <div className="box">
              <div>
                <h1 className="title">Segment Info</h1>
                <RenderInfo label="Name" text={segment.title} />
                <RenderInfo label="State" text={segment.state} />
                <RenderInfo label="City" text={segment.city} />
                <RenderInfo label="Distance" text={formattedDistance(segment.distance)} />
                <RenderInfo label="Total Efforts" text={segmentEfforts.items_total} />
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
                            pathname: '/segments/[id]',
                            query: { ...router.query, sort: ev.target.value },
                          })
                        } else {
                          const newQueryParams = Object.assign({}, router.query)
                          delete newQueryParams['sort']
                          router.push({
                            pathname: '/segments/[id]',
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
                      value={sort_direction ?? 'des'}
                      onChange={(ev) => {
                        if (ev.target.value && ev.target.value !== '') {
                          router.push({
                            pathname: '/segments/[id]',
                            query: { ...router.query, sort_direction: ev.target.value },
                          })
                        } else {
                          const newQueryParams = Object.assign({}, router.query)
                          delete newQueryParams['sort_direction']
                          router.push({
                            pathname: '/segments/[id]',
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

              <div className="field mr-4 mb-3">
                <label className="label">Device Watts</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={device_watts ?? ''}
                      onChange={(ev) => {
                        if (ev.target.value) {
                          router.push({
                            pathname: '/segments/[id]',
                            query: { ...router.query, device_watts: ev.target.value, page: 0 },
                          })
                        } else {
                          const newQueryParams = Object.assign({}, router.query)
                          delete newQueryParams['device_watts']
                          router.push({
                            pathname: '/segments/[id]',
                            query: newQueryParams,
                          })
                        }
                      }}
                    >
                      <option value="">---</option>
                      <option value="true">With device Watts</option>
                      <option value="false">Without device Watts</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <TableSegmentEfforts data={segmentEfforts.items} from="segment" />
          </>
        )}
      </main>
    </>
  )
}
