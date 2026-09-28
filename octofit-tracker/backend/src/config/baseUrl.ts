const defaultBackendPort = 8000;
const defaultFrontendPort = 5173;

export function getApiBaseUrl(port = defaultBackendPort) {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
}

export function getFrontendUrl() {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-${defaultFrontendPort}.app.github.dev`
    : `http://localhost:${defaultFrontendPort}`;
}