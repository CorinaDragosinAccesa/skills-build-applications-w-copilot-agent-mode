import { useEffect, useState } from 'react'
import { fetchCollection } from '../api/client'

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection(teamsApiUrl, 'teams')
      .then((items) => {
        if (isMounted) {
          setTeams(items)
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
          <p className="eyebrow">Teams</p>
          <h2>Training groups</h2>
        </div>
        <code>{teamsApiUrl}</code>
      </div>
      {status === 'loading' && <p className="text-muted">Loading teams...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'loaded' && (
        <div className="resource-grid">
          {teams.map((team) => (
            <article className="resource-card" key={team._id}>
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <span>{team.memberIds?.length ?? 0} members</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams