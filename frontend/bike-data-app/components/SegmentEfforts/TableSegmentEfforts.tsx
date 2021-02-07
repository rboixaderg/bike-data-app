import { Table } from '@guillotinaweb/react-gmi'
import { TableItemSegmentEfforts } from './TableItemSegmentEfforts'

export const TableSegmentEfforts = ({ data }) => {
  return (
    <div className="table-container">
      <Table
        headers={['Date', 'Time', 'Avg Watts', 'Watts device', 'Avg Heartrate', 'Max Heartrate']}
        className="is-striped is-fullwidth"
      >
        {(data ?? []).map((segmentEffort) => (
          <TableItemSegmentEfforts
            key={`segment_effort_id_${segmentEffort.id}`}
            segmentEffort={segmentEffort}
          />
        ))}
      </Table>
    </div>
  )
}
