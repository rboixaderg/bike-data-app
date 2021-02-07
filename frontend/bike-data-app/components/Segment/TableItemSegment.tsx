import { formattedDistance } from 'helpers/utils'
import { useRouter } from 'next/router'

export const TableItemSegment = ({ segment }) => {
  const router = useRouter()
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
          <button
            onClick={async () => {
              router.push('/segments/[id]', `/segments/${segment['@name']}`)
            }}
            className="button"
          >
            Detail
          </button>
        </div>
      </td>
    </tr>
  )
}
