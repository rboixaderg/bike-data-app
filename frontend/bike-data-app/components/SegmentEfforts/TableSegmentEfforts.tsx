import { TableItemSegmentEfforts } from './TableItemSegmentEfforts'

export const TableSegmentEfforts = ({ data }) => {
  return (
    <div className="table-container">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Avg Watts</th>
            <th>Watts device</th>
            <th>Avg Heartrate</th>
            <th>Max Heartrate</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((segmentEffort) => (
            <TableItemSegmentEfforts
              key={`segment_effort_id_${segmentEffort.id}`}
              segmentEffort={segmentEffort}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
