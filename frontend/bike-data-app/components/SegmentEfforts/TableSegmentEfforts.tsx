import { Table } from '@guillotinaweb/react-gmi'
import { TableItemSegmentEfforts } from './TableItemSegmentEfforts'

export const TableSegmentEfforts = ({ data, from }) => {
  return (
    <div className="table-container">
      <Table
        headers={[
          'Name',
          'Date',
          'Moving time',
          'Elapsed time',
          'Avg Watts',
          'Watts device',
          'Avg Heartrate',
          'Max Heartrate',
          'Actions',
        ]}
        className="is-striped is-fullwidth"
      >
        {(data ?? []).map((segmentEffort) => (
          <TableItemSegmentEfforts
            key={`segment_effort_id_${segmentEffort.id}`}
            segmentEffort={segmentEffort}
            from={from}
          />
        ))}
      </Table>
    </div>
  )
}
