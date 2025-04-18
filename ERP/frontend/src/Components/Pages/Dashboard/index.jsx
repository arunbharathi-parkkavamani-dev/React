import { useState, useCallback } from 'react';
import DateRangePicker from './DateRangePicker';
import './static/Dashboard.css';

function Dashboard() {
    const [dateRange, setDateRange] = useState({ from: null, to: null });

    const handleDateChange = useCallback(({ from, to }) => {
        setDateRange({ from, to });
        // You can now use these dates to filter or fetch results
        console.log("Selected Range:", from, to);
    }, []);

    return (
        <div className='dashboard'>
            <h3 className='text-secondary fs-5'>Control Panel</h3>
            <br />
            <div className='content-tab'>
                <div className='d-flex flex-column align-items-start p-3'>
                    <DateRangePicker onDateChange={handleDateChange} />
                    {dateRange.from && dateRange.to && (
                        <p className='mt-2 mb-0' style={{ fontSize: '12px' }}>
                            <strong>
                                {dateRange.from?.toLocaleDateString()} - {dateRange.to?.toLocaleDateString()}
                            </strong>
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
