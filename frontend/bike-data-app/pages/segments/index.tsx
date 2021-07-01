import { Loading, Pagination } from '@guillotinaweb/react-gmi'
import { useRouter } from 'next/router'
import Menu from 'components/Menu'
import { TableSegment } from 'components/Segment/TableSegment'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'
import { GUILLOTINA_PAGE_SIZE } from 'helpers/constants'

export default function Segments() {
  const router = useRouter()
  const { page, title, sort, sort_direction } = router.query

  const formattedPage = parseInt((page as string) ?? '0', 0)
  const { dataGuillotina, isLoading } = useGetGuillotinaObject(
    `@search?type_name=Segment&b_size=${GUILLOTINA_PAGE_SIZE}&b_start=${
      formattedPage * GUILLOTINA_PAGE_SIZE
    }&_sort_${sort_direction ?? 'des'}=${sort ?? 'title'}${
      title && title !== '' ? `&title__in=${title}` : ''
    }`
  )

  const doPaginate = (page) => {
    router.push({
      pathname: '/segments',
      query: { ...router.query, page: page },
    })
  }

  return (
    <>
      <Menu />
      <section className="hero is-primary">
        <div className="container hero-body">
          <p className="title">Segments</p>
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
                  value={sort ?? 'title'}
                  onChange={(ev) => {
                    if (ev.target.value && ev.target.value !== '') {
                      router.push({
                        pathname: '/segments',
                        query: { ...router.query, sort: ev.target.value },
                      })
                    } else {
                      const newQueryParams = Object.assign({}, router.query)
                      delete newQueryParams['sort']
                      router.push({
                        pathname: '/segments',
                        query: newQueryParams,
                      })
                    }
                  }}
                >
                  <option value="">---</option>
                  <option value="title">Title</option>
                  <option value="distance">Distance</option>
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
                        pathname: '/segments',
                        query: { ...router.query, sort_direction: ev.target.value },
                      })
                    } else {
                      const newQueryParams = Object.assign({}, router.query)
                      delete newQueryParams['sort_direction']
                      router.push({
                        pathname: '/segments',
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
                      pathname: '/segments',
                      query: { ...router.query, title: ev.target.value },
                    })
                  } else {
                    const newQueryParams = Object.assign({}, router.query)
                    delete newQueryParams['title']
                    router.push({
                      pathname: '/segments',
                      query: newQueryParams,
                    })
                  }
                }}
              />
            </div>
          </div>
        </div>
        {!dataGuillotina && <div>No data</div>}
        {<TableSegment data={dataGuillotina?.items} />}
      </main>
    </>
  )
}
