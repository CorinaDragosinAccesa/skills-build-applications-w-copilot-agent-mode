const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const collectionKeys = ['results', 'items', 'data', 'docs', 'records']
  const collection = collectionKeys.map((key) => payload[key]).find(Array.isArray)

  return collection ?? []
}

export async function fetchCollection(resource) {
  const response = await fetch(getApiUrl(resource))

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}: ${response.status}`)
  }

  return normalizeCollectionResponse(await response.json())
}