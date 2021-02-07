import { formattedDateFromSeconds } from 'helpers/utils'
export const TableItemSegmentEfforts = ({ segmentEffort }) => {
  return (
    <tr>
      <td>{new Date(segmentEffort.start_date).toLocaleString()}</td>
      <td>{formattedDateFromSeconds(segmentEffort.moving_time)}</td>
      <td>{segmentEffort.average_watts}</td>
      <td>
        {segmentEffort.device_watts ? (
          <span className="icon">
            <i className="fas fa-check"></i>
          </span>
        ) : (
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
        )}
      </td>
      <td>{segmentEffort.average_heartrate}</td>
      <td>{segmentEffort.max_heartrate}</td>
      <td></td>
    </tr>
  )
}
