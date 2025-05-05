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
import usersListRoutes from './routes/userListsRoutes.js';
import EmployeesRoutes from './routes/EmployeeListRoutes.js';
console.log('Employees Routes:', EmployeesRoutes);

dotenv.config();
const app = express();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-undef
const sessionKey = process.env.SESSION_SECRET;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174'
];

// Catch uncaught exceptions and unhandled rejections
// eslint-disable-next-line no-undef
process.on('uncaughtException', (err) => {
  console.error('🧨 Uncaught Exception:', err);
});

// eslint-disable-next-line no-undef
process.on('unhandledRejection', (reason) => {
  console.error('🚨 Unhandled Rejection:', reason);
});

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: sessionKey,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true if using HTTPS
}));

// MongoDB Connection
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
// console.log('🔌 Registering routes...');
try {
  app.use('/api/sidebar', sidebarRoutes);
  console.log('✅ Sidebar routes loaded');
} catch (err) {
  console.error('❌ Failed to load sidebar routes:', err);
}

try {
  app.use('/api/metalRates', metalRateRoutes);
  console.log('✅ Metal rate routes loaded');
} catch (err) {
  console.error('❌ Failed to load metal rate routes:', err);
}

try {
  app.use('/api/metalList', metalListRoutes);
  console.log('✅ Metal list routes loaded');
} catch (err) {
  console.error('❌ Failed to load metal list routes:', err);
}

try {
  app.use('/api/users', usersListRoutes);
  console.log('✅ User routes loaded');
} catch (err) {
  console.error('❌ Failed to load user routes:', err);
}

try {
  app.use('/api/employees', EmployeesRoutes);
  console.log('✅ Employees List loaded');
} catch (err) {
  console.error('❌ Failed to load Employees routes:', err);
}

// Start Server
app.listen(PORT, () => {
  // console.log(`🚀 Server running at: http://localhost:${PORT}`);
});

// Scheduled Task: Daily gold rate update
cron.schedule('44 * * * *', async () => {
  console.log('⏰ Running daily gold rate update...');
  try {
    await updateGoldRateFromAPI(
      { params: {}, body: {} },
      {
        json: (data) => console.log("✅ Auto Updated:", data),
        status: () => ({
          json: (err) => console.error("❌ Auto Update Failed:", err)
        })
      }
    );
  } catch (err) {
    console.error("❌ Cron job error:", err);
  }
});
