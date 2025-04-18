import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    TextField,
    Paper,
    Button,
    Typography,
    Box,
    Grid,
    Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateMetalRate = () => {
    const { id } = useParams();

    const allowedFields = [
        'gold18KT',
        'gold20KT',
        'gold22KT',
        'gold24KT',
        'gold995KT',
        'platinum',
        'silver999',
        'silver',
        'silverKg'
    ];

    const [formData, setFormData] = useState({
        gold18KT: '',
        gold20KT: '',
        gold22KT: '',
        gold24KT: '',
        gold995KT: '',
        platinum: '',
        silver999: '',
        silver: '',
        silverKg: ''
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchMetalRates = async () => {
            try {
                const res = await fetch(`${baseUrl}/metalRates/${id}`);
                const data = await res.json();

                const filteredData = {};
                allowedFields.forEach(field => {
                    filteredData[field] = data[field] || '';
                });

                setFormData(filteredData);
            } catch (error) {
                console.log('❌ Error Fetching Metal Rates:', error);
            }
        };

        fetchMetalRates();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = allowedFields.reduce((obj, key) => {
            obj[key] = formData[key];
            return obj;
        }, {});

        try {
            const response = await fetch(`${baseUrl}/metalRates/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            const result = await response.json();
            console.log('✅ Update Successful:', result);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('❌ Error Updating Metal Rates:', error);
        }
    };

    const formatLabel = (label) => {
        return label
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/KT/, 'KT')
            .replace(/Kg/, 'Kg')
            .replace(/^./, str => str.toUpperCase());
    };

    return (
        <Box p={3}>
            <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                    Update Metal Rates
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {allowedFields.map((key) => (
                            <Grid item xs={12} sm={6} md={4} key={key}>
                                <TextField
                                    fullWidth
                                    type='number'
                                    name={key}
                                    label={formatLabel(key)}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* ✅ Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Metal rates updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdateMetalRate;
