// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';

import sidebarRoutes from './routes/sidebarRoutes.js';
import metalRateRoutes from './routes/metalRateRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/sidebar', sidebarRoutes);
app.use('/api/metalRates', metalRateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://192.168.1.35:${PORT}`);
});

cron.schedule('* 9 * * *', async () => {
  console.log('⏰ Running daily gold rate fetch...');
  await updateGoldRateFromAPI({ params: {}, body: {} }, {
    json: (data) => console.log("✅ Auto Updated:", data),
    status: () => ({ json: (err) => console.error("❌ Auto Update Failed:", err) })
  });
});
