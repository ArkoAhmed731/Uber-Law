import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import dropdownRoutes from './routes/dropdowns';
import candidateRoutes from './routes/candidates';
import uploadRoutes from './routes/uploads';

dotenv.config();

const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const uploadDir = path.join(process.cwd(), 'backend', 'uploads');

app.use(cors({ origin: clientOrigin }));
app.use(express.json());
app.use('/uploads', express.static(uploadDir));
app.use(dropdownRoutes);
app.use(candidateRoutes);
app.use(uploadRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
