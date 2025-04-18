import React, { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './static/DateRangePicker.css'

const today = new Date();

const DateRangePicker = ({ onDateChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [customFromDate, setCustomFromDate] = useState(today);
  const [customToDate, setCustomToDate] = useState(today);
  const [selectedOption, setSelectedOption] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const dropDownRef = useRef(null)

  useEffect(() => {
    onDateChange?.({ from: today, to: today });
  }, [onDateChange]);

  const handleFromDateChange = (date) => {
    setCustomFromDate(date);
    onDateChange?.({ from: date, to: customToDate });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToDateChange = (date) => {
    setCustomToDate(date);
    onDateChange?.({ from: customFromDate, to: date });
  };

  const handleOptionClick = (option) => {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    const last7DaysStart = new Date(today);
    last7DaysStart.setDate(today.getDate() - 6);

    setSelectedOption(option);
    setShowPopup(false); // hide calendar when selecting preset

    switch (option) {
      case 'Today':
        setCustomFromDate(today);
        setCustomToDate(today);
        onDateChange?.({ from: today, to: today });
        break;
      case 'Yesterday':
        setCustomFromDate(yesterday);
        setCustomToDate(yesterday);
        onDateChange?.({ from: yesterday, to: yesterday });
        break;
      case 'Last 7 Days':
        setCustomFromDate(last7DaysStart);
        setCustomToDate(today);
        onDateChange?.({ from: last7DaysStart, to: today });
        break;
      case 'This Month':
        setCustomFromDate(thisMonthStart);
        setCustomToDate(thisMonthEnd);
        onDateChange?.({ from: thisMonthStart, to: thisMonthEnd });
        break;
      case 'Last Month':
        setCustomFromDate(lastMonthStart);
        setCustomToDate(lastMonthEnd);
        onDateChange?.({ from: lastMonthStart, to: lastMonthEnd });
        break;
      case 'Custom Date':
        setCustomFromDate(null);
        setCustomToDate(null);
        setShowPopup(true)
        break;
      default:
        setCustomFromDate(null);
        setCustomToDate(null);
        break;
    }
  };

  return (
    <div className='date-range-picker' ref={dropDownRef}>
      <div className="position-relative">
        <button
          className="bg-gray btn btn-default btn_date_range d-flex align-items-center justify-content-center gap-2"
          onClick={() => setShowDropdown(prev => !prev)}
          style={{
            width: '100%',
            padding: '6px 12px'
          }}
        >
          <FaCalendarAlt size={14} />
          <span style={{ whiteSpace: 'nowrap', fontSize: '10px' }}>Date Range Picker</span>
        </button>


        {showDropdown && (
          <div className="dropdown-menu show p-3" style={{ minWidth: '220px' }}>
            {/* Options */}
            <div className="d-flex flex-column mb-3">
              {["Today", "Yesterday", "Last 7 Days", "This Month", "Last Month", "Custom Date"].map((option) => (
                <button
                  key={option}
                  className={`dropdown-item text-start ${selectedOption === option ? 'active' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Input Fields Always Visible */}
            <div className="d-flex gap-2">
              <input
                className="form-control"
                placeholder="From"
                value={customFromDate ? customFromDate.toLocaleDateString() : ''}
                onFocus={() => selectedOption === 'Custom Date' && setShowPopup(true)}
                readOnly
              />
              <input
                className="form-control"
                placeholder="To"
                value={customToDate ? customToDate.toLocaleDateString() : ''}
                onFocus={() => selectedOption === 'Custom Date' && setShowPopup(true)}
                readOnly
              />
            </div>

            {/* Popup with inline calendars and buttons */}
            {showPopup && (
              <div
                style={{
                  position: "absolute",
                  top: '-2.5%',
                  left: '102%',
                  zIndex: 9999,
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginTop: "5px",
                }}
              >
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <div>
                    <label className="form-label">From:</label>
                    <DatePicker
                      selected={customFromDate}
                      onChange={(date) => setCustomFromDate(date)}
                      inline
                      maxDate={customToDate}
                    />
                  </div>
                  <div>
                    <label className="form-label">To:</label>
                    <DatePicker
                      selected={customToDate}
                      onChange={(date) => setCustomToDate(date)}
                      inline
                      minDate={customFromDate}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowPopup(false)
                      handleFromDateChange(customFromDate)
                      handleToDateChange(customToDate)
                    }}
                    disabled={!customFromDate || !customToDate}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
