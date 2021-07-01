import { Table } from '@guillotinaweb/react-gmi'
import { TableItemActivity } from './TableItemActivity'

export const TableActivity = ({ data }) => {
  return (
    <div className="table-container">
      <Table
        headers={[
          'Date',
          'Time',
          'Type',
          'Distance',
          'Avg Heartrate',
          'Watts',
          'Max Watts',
          'Device Watts',
          'Avg Speed',
          'Kilojoules',
          'Action',
        ]}
        className="is-striped is-fullwidth"
      >
        {(data ?? []).map((activity) => (
          <TableItemActivity key={`segment_id_${activity.id}`} activity={activity} />
        ))}
      </Table>
    </div>
  )
}
