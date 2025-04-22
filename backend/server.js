// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';

import session from 'express-session';
import { updateGoldRateFromAPI } from './controllers/metalRateController.js';
import sidebarRoutes from './routes/sidebarRoutes.js';
import metalRateRoutes from './routes/metalRateRoutes.js';
import metalListRoutes from './routes/metalListRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://172.24.240.1:5173', // or your frontend URL
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // use true if you enable HTTPS
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/sidebar', sidebarRoutes);
app.use('/api/metalRates', metalRateRoutes);
app.use('/api/metalList', metalListRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://192.168.1.35:${PORT}`);
});

cron.schedule('30 10 * * *', async () => {
  console.log('⏰ Running daily gold rate fetch...');
  await updateGoldRateFromAPI({ params: {}, body: {} }, {
    json: (data) => console.log("✅ Auto Updated:", data),
    status: () => ({ json: (err) => console.error("❌ Auto Update Failed:", err) })
  });
});
