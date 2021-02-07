import { RenderBoolean } from 'components/RenderBoolean'
import { formattedDateFromSeconds } from 'helpers/utils'
export const TableItemSegmentEfforts = ({ segmentEffort }) => {
  return (
    <tr>
      <td>{segmentEffort.name}</td>
      <td>{new Date(segmentEffort.start_date).toLocaleString()}</td>
      <td>{formattedDateFromSeconds(segmentEffort.moving_time)}</td>
      <td>{segmentEffort.average_watts}</td>
      <td>
        <RenderBoolean value={segmentEffort.device_watts} />
      </td>
      <td>{segmentEffort.average_heartrate}</td>
      <td>{segmentEffort.max_heartrate}</td>
      <td></td>
    </tr>
  )
}
