import { Table } from '@guillotinaweb/react-gmi'
import { TableItemSegment } from './TableItemSegment'

export const TableSegment = ({ data }) => {
  return (
    <div className="table-container">
      <Table headers={['Name', 'Distance', 'Action']} className="is-striped is-fullwidth">
        {(data ?? []).map((segment) => (
          <TableItemSegment key={`segment_id_${segment.id}`} segment={segment} />
        ))}
      </Table>
    </div>
  )
}
