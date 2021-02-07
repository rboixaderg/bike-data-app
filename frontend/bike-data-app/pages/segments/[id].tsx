import { Loading, Pagination } from '@guillotinaweb/react-gmi'
import Menu from 'components/Menu'
import { TableSegmentEfforts } from 'components/SegmentEfforts/TableSegmentEfforts'
import { GUILLOTINA_PAGE_SIZE } from 'helpers/constants'
import { formattedDistance } from 'helpers/utils'
import { useRouter } from 'next/router'
import { useGetGuillotinaObject } from 'services/useGetGuillotinaObject'

const RenderInfo = ({ text, label }) => {
  return (
    <div>
      <strong>{label}:</strong>&nbsp;&nbsp;<span>{text}</span>
    </div>
  )
}
export default function ItemSegmentPage() {
  const router = useRouter()
  const { id, page } = router.query
  const formattedPage = parseInt((page as string) ?? '0', 0)
  const { dataGuillotina: segment, isLoading: loadingSegment } = useGetGuillotinaObject(id)
  const {
    dataGuillotina: segmentEfforts,
    isLoading: loadingSegmentEfforts,
  } = useGetGuillotinaObject(
    id
      ? `@search?type_name=SegmentEffort&b_size=${GUILLOTINA_PAGE_SIZE}&b_start=${
          formattedPage * GUILLOTINA_PAGE_SIZE
        }&segment=${id}&_sort_des=start_date`
      : null
  )

  const doPaginate = (page) => {
    router.push({
      pathname: '/segments/[id]',
      query: { id: id, page: page },
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

            <TableSegmentEfforts data={segmentEfforts.items} />
          </>
        )}
      </main>
    </>
  )
}
