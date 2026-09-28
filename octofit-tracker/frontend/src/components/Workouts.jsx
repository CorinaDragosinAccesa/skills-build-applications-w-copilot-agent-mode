import { useEffect, useState } from 'react'
import { fetchCollection, getApiUrl } from '../api/client'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('workouts')
      .then((items) => {
        if (isMounted) {
          setWorkouts(items)
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
          <p className="eyebrow">Workouts</p>
          <h2>Suggested sessions</h2>
        </div>
        <code>{getApiUrl('workouts')}</code>
      </div>
      {status === 'loading' && <p className="text-muted">Loading workouts...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'loaded' && (
        <div className="resource-grid">
          {workouts.map((workout) => (
            <article className="resource-card" key={workout._id}>
              <h3>{workout.title}</h3>
              <p>{workout.description}</p>
              <span>{workout.difficulty} · {workout.durationMinutes} min</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts