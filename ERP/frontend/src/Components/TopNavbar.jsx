import React, { useState, useEffect } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/TopNavbar.css'

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const TopNavbar = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [goldRate, setGoldRate] = useState(null);

  useEffect(() => {
    const today = new Date();
    console.log(today)
    const formatted = today.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const format = formatted.replaceAll('/', '-');
    setCurrentDate(format);
  }, []);

  useEffect(() => {
    const fetchGoldRate = async () => {
      try {
        const response = await fetch(`${baseUrl}/metalRates`);
        const data = await response.json();

        if (data.length > 0) {
          // Sort by updatedAt descending
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

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-darkblue px-3 py-2 w-100">
        <div className="d-flex align-items-center">
          <span className="navbar-brand mb-0 h4">SREE VRS Gold Diamond</span>
        </div>

        <div className="ms-auto d-flex align-items-center gap-3 flex-wrap text-white w-100 justify-content-end">
          <button className="btn btn-warning btn-sm">Day Close</button>
          <IoNotifications size={20} title="Notification" />
          <span>FY 25-26</span>
          <span><b>{currentDate}</b></span>
          <button className='btn text-light' >
            Current Gold Rate 22KT gram: <b>
              {goldRate ? `INR ${goldRate}` : 'Loading...'}
            </b>
          </button>

          <span className="d-flex align-items-center gap-1">
            <FaUserCircle size={24} title="Profile" />
            LMXETAIL
          </span>
        </div>
      </nav>
    </>
  );
};

export default TopNavbar;
