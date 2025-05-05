import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { IoNotifications } from 'react-icons/io5';
import {
  Switch,
  Typography,
  Box,
  Button as MuiButton,
  FormControlLabel,
} from '@mui/material';
import UserDropdown from './UserProfile';
import './Static/TopNavbar.css';

const TopNavbar = ({ onThemeToggle, themeMode }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [goldRate, setGoldRate] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replaceAll('/', '-');
    setCurrentDate(formatted);
  }, []);

  useEffect(() => {
    const fetchGoldRate = async () => {
      try {
        const response = await axiosInstance.get('/metalRates'); // ✅ Replaced fetch with axiosInstance
        const data = response.data;

        if (data.length > 0) {
          const latest = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
          setGoldRate(latest.gold22KT);
        }
      } catch (error) {
        console.error('Error fetching metal rates:', error);
      }
    };

    fetchGoldRate();
    const interval = setInterval(fetchGoldRate, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    onThemeToggle(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-darkblue px-3 py-2 w-100 d-flex justify-content-between align-items-center">
      <Typography variant="h6" color="inherit" className="navbar-brand mb-0">
        SREE VRS Gold Diamond
      </Typography>

      <Box className="d-flex align-items-center gap-3 flex-wrap text-white">
        <MuiButton variant="contained" size="small" color="warning">
          Day Close
        </MuiButton>

        <IoNotifications size={24} title="Notifications" />

        <Typography variant="body2">FY 25-26</Typography>
        <Typography variant="body2"><strong>{currentDate}</strong></Typography>

        <MuiButton variant="outlined" size="small" color="inherit">
          22KT Gold Rate: <strong>{goldRate ? `₹${goldRate}` : 'Loading...'}</strong>
        </MuiButton>

        <UserDropdown />

        <FormControlLabel
          control={
            <Switch
              checked={themeMode === 'dark'}
              onChange={handleThemeToggle}
              color="default"
            />
          }
          label={themeMode === 'dark' ? 'Dark' : 'Light'}
          sx={{ color: 'white' }}
        />
      </Box>
    </nav>
  );
};

export default TopNavbar;
