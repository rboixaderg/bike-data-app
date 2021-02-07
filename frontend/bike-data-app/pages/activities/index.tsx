import Menu from 'components/Menu'
import { Loading, Pagination } from '@guillotinaweb/react-gmi'
import { useRouter } from 'next/router'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'
import { GUILLOTINA_PAGE_SIZE } from 'helpers/constants'
import { TableActivity } from 'components/Activity/TableActivity'

export default function Segments() {
  const router = useRouter()
  const { page } = router.query

  const formattedPage = parseInt((page as string) ?? '0', 0)
  const { dataGuillotina, isLoading } = useGetGuillotinaObject(
    `@search?type_name=Activity&b_size=${GUILLOTINA_PAGE_SIZE}&b_start=${
      formattedPage * GUILLOTINA_PAGE_SIZE
    }&_sort_des=start_date`
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

        {<TableActivity data={dataGuillotina?.items} />}
      </main>
    </>
  )
}
