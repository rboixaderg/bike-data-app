import { Loading, Pagination } from '@guillotinaweb/react-gmi'
import { useRouter } from 'next/router'
import Menu from 'components/Menu'
import { TableSegment } from 'components/Segment/TableSegment'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'
import { GUILLOTINA_PAGE_SIZE } from 'helpers/constants'

export default function Segments() {
  const router = useRouter()
  const { page } = router.query

  const formattedPage = parseInt((page as string) ?? '0', 0)
  const { dataGuillotina, isLoading } = useGetGuillotinaObject(
    `@search?type_name=Segment&b_size=${GUILLOTINA_PAGE_SIZE}&b_start=${
      formattedPage * GUILLOTINA_PAGE_SIZE
    }&_sort_asc=title`
  )

  const doPaginate = (page) => {
    router.push({
      pathname: '/segments',
      query: { page: page },
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

        {<TableSegment data={dataGuillotina?.items} />}
      </main>
    </>
  )
}
