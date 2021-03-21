import { RenderBoolean } from 'components/RenderBoolean'
import { formattedDateFromSeconds } from 'helpers/utils'
import { useRouter } from 'next/router'
export const TableItemSegmentEfforts = ({ segmentEffort, from }) => {
  const router = useRouter()
  return (
    <tr>
      <td>{segmentEffort.name}</td>
      <td>{new Date(segmentEffort.start_date).toLocaleString()}</td>
      <td>{formattedDateFromSeconds(segmentEffort.moving_time)}</td>
      <td>{formattedDateFromSeconds(segmentEffort.elapsed_time)}</td>
      <td>{segmentEffort.average_watts}</td>
      <td>
        <RenderBoolean value={segmentEffort.device_watts} />
      </td>
      <td>{segmentEffort.average_heartrate}</td>
      <td>{segmentEffort.max_heartrate}</td>
      <td>
        <button
          onClick={async () => {
            if (from === 'activity') {
              router.push(`/segments/${segmentEffort.segment}`)
            } else {
              router.push(`/activities/${segmentEffort.activity}`)
            }
          }}
          className="button"
        >
          {from === 'activity' ? 'Segment detail' : 'Activity detail'}
        </button>
      </td>
    </tr>
  )
}
