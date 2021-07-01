import Menu from 'components/Menu'
import { Loading, Pagination } from '@guillotinaweb/react-gmi'
import { useRouter } from 'next/router'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'
import { GUILLOTINA_PAGE_SIZE } from 'helpers/constants'
import { TableActivity } from 'components/Activity/TableActivity'

export default function Segments() {
  const router = useRouter()
  const { page, sort, type_activity, device_watts, sort_direction, average_watts } = router.query

  const formattedPage = parseInt((page as string) ?? '0', 0)

  const avgWattsQueryParam = () => {
    if (average_watts) {
      if (average_watts === 'null') {
        return `&average_watts=null`
      }
      return `&average_watts__not=null`
    }
    return ''
  }

  const { dataGuillotina, isLoading } = useGetGuillotinaObject(
    `@search?type_name=Activity&b_size=${GUILLOTINA_PAGE_SIZE}&b_start=${
      formattedPage * GUILLOTINA_PAGE_SIZE
    }&_sort_${sort_direction ?? 'des'}=${sort ?? 'start_date'}${
      type_activity ? `&type_activity=${type_activity}` : ''
    }${device_watts ? `&device_watts=${device_watts}` : ''} ${avgWattsQueryParam()}`
  )

  const doPaginate = (page) => {
    router.push({
      pathname: '/activities',
      query: { ...router.query, page: page },
    })
  }

  return (
    <>
      <Menu />
      <section className="hero is-primary">
        <div className="container hero-body">
          <p className="title">Activities</p>
        </div>
      </section>
      <main className="container">
        {isLoading && <Loading />}
        <div className="mt-3 mb-3">
          <Pagination
            current={formattedPage}
            total={dataGuillotina?.items_total || 0}
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
                  value={sort ?? ''}
                  onChange={(ev) => {
                    if (ev.target.value && ev.target.value !== '') {
                      router.push({
                        pathname: '/activities',
                        query: { ...router.query, sort: ev.target.value },
                      })
                    } else {
                      const newQueryParams = Object.assign({}, router.query)
                      delete newQueryParams['sort']
                      router.push({
                        pathname: '/activities',
                        query: newQueryParams,
                      })
                    }
                  }}
                >
                  <option value="">---</option>
                  <option value="average_heartrate">AVG Heartrate</option>
                  <option value="average_watts">AVG Watts</option>
                  <option value="average_speed">AVG Speed</option>
                  <option value="weighted_average_watts">Weighted AVG Watts</option>
                  <option value="max_watts">Max Watts</option>
                  <option value="moving_time">Time</option>
                  <option value="kilojoules">Kilojoules</option>
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
                        pathname: '/activities',
                        query: { ...router.query, sort_direction: ev.target.value },
                      })
                    } else {
                      const newQueryParams = Object.assign({}, router.query)
                      delete newQueryParams['sort_direction']
                      router.push({
                        pathname: '/activities',
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

          <div className="field mr-4">
            <label className="label">Activity type</label>
            <div className="control">
              <div className="select">
                <select
                  value={type_activity ?? ''}
                  onChange={(ev) => {
                    if (ev.target.value) {
                      router.push({
                        pathname: '/activities',
                        query: { ...router.query, type_activity: ev.target.value, page: 0 },
                      })
                    } else {
                      const newQueryParams = Object.assign({}, router.query)
                      delete newQueryParams['type_activity']
                      router.push({
                        pathname: '/activities',
                        query: newQueryParams,
                      })
                    }
                  }}
                >
                  <option value="">---</option>
                  <option value="Run">Run</option>
                  <option value="Ride">Ride</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field mr-4">
            <label className="label">Device Watts</label>
            <div className="control">
              <div className="select">
                <select
                  value={device_watts ?? ''}
                  onChange={(ev) => {
                    if (ev.target.value) {
                      router.push({
                        pathname: '/activities',
                        query: { ...router.query, device_watts: ev.target.value, page: 0 },
                      })
                    } else {
                      const newQueryParams = Object.assign({}, router.query)
                      delete newQueryParams['device_watts']
                      router.push({
                        pathname: '/activities',
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

          <div className="field mr-4 mb-3">
            <label className="label">Avg Watts</label>
            <div className="control">
              <div className="select">
                <select
                  value={average_watts ?? ''}
                  onChange={(ev) => {
                    if (ev.target.value) {
                      router.push({
                        pathname: '/activities',
                        query: { ...router.query, average_watts: ev.target.value, page: 0 },
                      })
                    } else {
                      const newQueryParams = Object.assign({}, router.query)
                      delete newQueryParams['average_watts']
                      router.push({
                        pathname: '/activities',
                        query: newQueryParams,
                      })
                    }
                  }}
                >
                  <option value="">---</option>
                  <option value="null">Is null</option>
                  <option value="not_null">Not null</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {<TableActivity data={dataGuillotina?.items} />}
      </main>
    </>
  )
}
