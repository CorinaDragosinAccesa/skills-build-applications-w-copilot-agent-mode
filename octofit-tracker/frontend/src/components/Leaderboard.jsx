import { useEffect, useState } from 'react'
import { fetchCollection, getApiUrl } from '../api/client'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then((items) => {
        if (isMounted) {
          setEntries(items)
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
          <p className="eyebrow">Leaderboard</p>
          <h2>Current standings</h2>
        </div>
        <code>{getApiUrl('leaderboard')}</code>
      </div>
      {status === 'loading' && <p className="text-muted">Loading leaderboard...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'loaded' && (
        <div className="leaderboard-list">
          {entries.map((entry) => (
            <article className="metric-row" key={entry._id}>
              <span className="rank">#{entry.rank}</span>
              <div>
                <strong>{entry.points} points</strong>
                <p>User {entry.userId}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard