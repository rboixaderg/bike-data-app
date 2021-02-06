import { useState } from 'react'
import { useSession } from 'next-auth/client'
import { saveActivityInGuillotina } from '../../services/guillotina'

export const TableItemStravaActivity = ({ activity, dataGuillotina, mutate }) => {
  const [session, loading] = useSession()
  const [loadingSave, setLoadingSave] = useState(false)
  return (
    <tr>
      <td>
        <div>{activity.type}</div>
      </td>
      <td>
        <div>{new Date(activity.start_date_local).toLocaleDateString()}</div>
      </td>
      <td>
        <div>{activity.name}</div>
      </td>
      <td>
        <div>{activity.distance}</div>
      </td>
      <td>
        {dataGuillotina &&
          !dataGuillotina.items.find(
            (activityGuillo) => activityGuillo.id === activity['id'].toString()
          ) && (
            <button
              onClick={async () => {
                setLoadingSave(true)
                await saveActivityInGuillotina(activity, session.accessToken)
                mutate()
                setLoadingSave(false)
              }}
              className={`button ${loading || loadingSave ? 'is-loading' : ''}`}
            >
              Synchronize
            </button>
          )}
      </td>
    </tr>
  )
}
