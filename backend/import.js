import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Sidenavbar from './models/Sidenavbar.js';
import MetalRates from './models/MetalRates.js';
import MetalList from './models/MetalList.js';

dotenv.config();

const importNavbar = async () => {
  const jsonPath = path.resolve('navbar.json');
  const rawData = fs.readFileSync(jsonPath);
  const sidebarItems = JSON.parse(rawData);

  await Sidenavbar.deleteMany();
  await Sidenavbar.insertMany(sidebarItems);
  console.log('✅ Sidebar data imported');
};


const importMetalList = async () => {
  try {
    const metalListPath = path.resolve('metalList.json');

    if (!fs.existsSync(metalListPath)) {
      console.log('⚠️  No metalList.json found. Skipping metal list import.');
      return;
    }

    const metalListData = JSON.parse(fs.readFileSync(metalListPath, 'utf-8'));

    if (!Array.isArray(metalListData) || metalListData.length === 0) {
      console.log('⚠️  metalList.json is empty or invalid.');
      return;
    }

    await MetalList.deleteMany();
    await MetalList.insertMany(metalListData);

    console.log('✅ Metal list data imported successfully!');
  } catch (error) {
    console.error('❌ Failed to import metal list:', error);
  }
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
    await importMetalList();

    console.log('✅ All data imported successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
};

importData();
