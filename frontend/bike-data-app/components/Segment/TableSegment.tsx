import { TableItemSegment } from './TableItemSegment'

export const TableSegment = ({ data }) => {
  return (
    <div className="table-container">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Distance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((segment) => (
            <TableItemSegment key={`segment_id_${segment.id}`} segment={segment} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
