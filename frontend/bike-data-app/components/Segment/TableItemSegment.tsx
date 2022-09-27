import { formattedDistance } from 'helpers/utils'
import Link from 'next/link'

export const TableItemSegment = ({ segment }) => {
  return (
    <tr>
      <td>
        <div>{segment.title}</div>
      </td>
      <td>
        <div>{formattedDistance(segment.distance)}</div>
      </td>
      <td>
        <div>
          <Link href={`/segments/${segment['@name']}`}>
            <a className="button">Detail</a>
          </Link>
        </div>
      </td>
    </tr>
  )
}
