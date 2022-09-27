import { RenderBoolean } from 'components/RenderBoolean'
import { formattedDateFromSeconds } from 'helpers/utils'
import { useRouter } from 'next/router'
import Link from 'next/link'
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
        <Link
          href={
            from === 'activity'
              ? `/segments/${segmentEffort.segment}`
              : `/activities/${segmentEffort.activity}`
          }
        >
          <a className="button">{from === 'activity' ? 'Segment detail' : 'Activity detail'}</a>
        </Link>
      </td>
    </tr>
  )
}
