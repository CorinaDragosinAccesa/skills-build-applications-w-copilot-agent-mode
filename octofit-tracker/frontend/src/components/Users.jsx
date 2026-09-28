import { useEffect, useState } from 'react'
import { fetchCollection, getApiUrl } from '../api/client'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users')
      .then((items) => {
        if (isMounted) {
          setUsers(items)
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
          <p className="eyebrow">Members</p>
          <h2>OctoFit users</h2>
        </div>
        <code>{getApiUrl('users')}</code>
      </div>
      {status === 'loading' && <p className="text-muted">Loading users...</p>}
      {status === 'error' && <p className="alert alert-danger">{error}</p>}
      {status === 'loaded' && (
        <div className="resource-grid">
          {users.map((user) => (
            <article className="resource-card" key={user._id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span>Team {user.teamId}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users