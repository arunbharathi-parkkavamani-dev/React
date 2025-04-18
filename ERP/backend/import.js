import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Sidenavbar from './models/Sidenavbar.js';
import MetalRates from './models/MetalRates.js';

dotenv.config();

const importNavbar = async () => {
  const jsonPath = path.resolve('navbar.json');
  const rawData = fs.readFileSync(jsonPath);
  const sidebarItems = JSON.parse(rawData);

  await Sidenavbar.deleteMany();
  await Sidenavbar.insertMany(sidebarItems);
  console.log('✅ Sidebar data imported');
};

const importMetalRates = async () => {
  const metalRatesPath = path.resolve('metalrates.json');
  if (!fs.existsSync(metalRatesPath)) {
    console.log('⚠️  No metalrates.json found. Skipping metal rate import.');
    return;
  }

  const metalData = JSON.parse(fs.readFileSync(metalRatesPath));
  await MetalRates.deleteMany();
  await MetalRates.insertMany(metalData);
  console.log('✅ Metal rates data imported');
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    await importNavbar();
    await importMetalRates(); // Optional import if metalrates.json exists

    console.log('✅ All data imported successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
};

importData();
