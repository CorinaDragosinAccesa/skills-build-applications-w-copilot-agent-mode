import cors from 'cors';
import express from 'express';
import './config/database';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});