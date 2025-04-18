import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const AddMetalRates = () => {
    const [formData, setFormData] = useState({
        gold18KT: '',
        gold20KT: '',
        gold22KT: '',
        gold24KT: '',
        gold995KT: '',
        platinum: '',
        silver999: '',
        silver: '',
        silverKg: '',
    });

    const [employeeData, setEmployeeData] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'employee') {
            setEmployeeData(value);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            employee: employeeData,
        };

        try {
            const res = await fetch(`${baseUrl}/metalRates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            console.log("Response status:", res.status);
            const responseData = await res.json().catch(() => null); // in case there's no JSON
            console.log("Response data:", responseData);

            if (res.ok) {
                alert('Metal Rate Added Successfully!');
                setFormData({
                    gold18KT: '',
                    gold20KT: '',
                    gold22KT: '',
                    gold24KT: '',
                    gold995KT: '',
                    platinum: '',
                    silver999: '',
                    silver: '',
                    silverKg: '',
                });
                setEmployeeData('');
            } else {
                alert('Failed to add metal rate.');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <Box p={3}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Add Metal Rates
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(formData).map((key) => (
                            <Grid item xs={12} sm={6} md={4} key={key}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name={key}
                                    label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                type="text"
                                name="employee"
                                label="Employee"
                                value={employeeData}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <Button type="submit" variant="contained" color="primary">
                            Save Metal Rates
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AddMetalRates;
