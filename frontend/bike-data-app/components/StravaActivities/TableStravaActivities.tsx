import { Table } from '@guillotinaweb/react-gmi'
import { TableItemStravaActivity } from './TableItemStravaActivity'

export const TableStravaActivitiesComponent = ({ dataToRender, dataGuillotina, mutate }) => {
  return (
    <div className="table-container">
      <Table
        headers={['Sport', 'Date', 'Title', 'Distance', 'Action']}
        className="is-striped is-fullwidth"
      >
        {(dataToRender ?? []).map((activity) => (
          <TableItemStravaActivity
            key={`activity_strava_id_${activity.id}`}
            activity={activity}
            dataGuillotina={dataGuillotina}
            mutate={mutate}
          />
        ))}
      </Table>
    </div>
  )
}
