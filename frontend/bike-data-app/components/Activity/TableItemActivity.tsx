import { RenderBoolean } from 'components/RenderBoolean'
import { formattedDateFromSeconds, formattedDistance, formattedSpeed } from 'helpers/utils'
import { useRouter } from 'next/router'

export const TableItemActivity = ({ activity }) => {
  const router = useRouter()
  return (
    <tr>
      <td>{new Date(activity.start_date).toLocaleString()}</td>
      <td>{formattedDateFromSeconds(activity.moving_time)}</td>
      <td>{activity.type_activity}</td>
      <td>{formattedDistance(activity.distance)}</td>
      <td>{activity.average_heartrate ? `${activity.average_heartrate} bpm` : '---'}</td>
      <td>
        {activity.average_watts
          ? `${activity.average_watts} / ${activity.weighted_average_watts ?? '--'} W`
          : '---'}
      </td>
      <td>{activity.max_watts ? `${activity.max_watts} W` : '---'}</td>
      <td>
        <RenderBoolean value={activity.device_watts} />
      </td>
      <td>{formattedSpeed(activity.average_speed)}</td>
      <td>{activity.kilojoules ? `${activity.kilojoules} Kj` : '---'}</td>
      <td>
        <button
          onClick={async () => {
            router.push('/activities/[id]', `/activities/${activity['@name']}`)
          }}
          className="button"
        >
          Detail
        </button>
        <a
          rel="noreferrer"
          className="button"
          href={`https://www.strava.com/activities/${activity['@name']}`}
          target="_blank"
        >
          Strava
        </a>
      </td>
    </tr>
  )
}
