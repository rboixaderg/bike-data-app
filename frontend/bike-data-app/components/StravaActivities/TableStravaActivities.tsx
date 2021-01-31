import { TableItemStravaActivity } from './TableItemStravaActivity'

export const TableStravaActivitiesComponent = ({ dataToRender, dataGuillotina, mutate }) => {
  return (
    <div className="table-container">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Sport</th>
            <th>Date</th>
            <th>Title</th>
            <th>Distance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(dataToRender ?? []).map((activity) => (
            <TableItemStravaActivity
              key={`activity_strava_id_${activity.id}`}
              activity={activity}
              dataGuillotina={dataGuillotina}
              mutate={mutate}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
