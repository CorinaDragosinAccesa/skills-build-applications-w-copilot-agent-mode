# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` when running in GitHub Codespaces, for example in `.env.local`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API URLs as `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When `VITE_CODESPACE_NAME` is unset, it safely falls back to `http://localhost:8000/api/[component]/`.

## Scripts

- `npm run dev` starts Vite on port `5173`.
- `npm run build` creates the production build.
- `npm run lint` runs ESLint.
