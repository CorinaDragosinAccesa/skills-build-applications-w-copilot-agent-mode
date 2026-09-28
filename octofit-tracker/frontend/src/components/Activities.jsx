import { useEffect, useState } from 'react'
import { fetchCollection } from '../api/client'

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection(activitiesApiUrl, 'activities')
      .then((items) => {
        if (isMounted) {
          setActivities(items)
          setStatus('loaded')
        }
      })
      .catch((loadError) => {
        if (isMounted) {
          setError(loadError.message)
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="content-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Activity Log</p>
          <h2>Recent movement</h2>
        </div>
        <code>{activitiesApiUrl}</code>
      </div>
      {status === 'loading' && <p className="text-muted">Loading activities...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'loaded' && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Scheduled'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities