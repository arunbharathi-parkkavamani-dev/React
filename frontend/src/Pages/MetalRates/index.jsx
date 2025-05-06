import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const MetalRatesList = () => {
    const [metalRates, setMetalRates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMetalRates = async () => {
            try {
                const response = await fetch(`${baseUrl}/metalRates`);
                const data = await response.json();
                setMetalRates(data);
            } catch (error) {
                console.error('Error fetching metal rates:', error);
            }
        };

        fetchMetalRates();
    }, []);

    const handleDelete = async (key) => {
        try {
            const response = await fetch(`http://localhost:5000/api/metalRates/${key}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMetalRates((prevRates) => prevRates.filter((rate) => rate._id !== key));
            } else {
                console.error('Failed to delete metal rate');
            }
        } catch (error) {
            console.error('Error deleting metal rate:', error);
        }
    };

    return (
        <>
            <br />
            <Box p={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5">Metal Rates List</Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate("/admin/metal-rates/add-metal-rates")}>
                        Add Metal Rate
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Updated Time</TableCell>
                                <TableCell>Gold 24K Rate (INR)</TableCell>
                                <TableCell>Gold 22K Rate (INR)</TableCell>
                                <TableCell>Gold 18K Rate (INR)</TableCell>
                                <TableCell>Silver 1G Rate (INR)</TableCell>
                                <TableCell>Silver 1KG Rate (INR)</TableCell>
                                <TableCell>Platinum 1G Rate (INR)</TableCell>
                                <TableCell>Employee</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {metalRates.map((rate) => (
                                <TableRow key={rate._id}>
                                    <TableCell>{new Date(rate.updatedAt).toDateString().slice(0, 15)}</TableCell>
                                    <TableCell>{new Date(rate.updatedAt).toTimeString().split(" ")[0].slice(0, 5)}</TableCell>
                                    <TableCell>{rate.gold24KT}</TableCell>
                                    <TableCell>{rate.gold22KT}</TableCell>
                                    <TableCell>{rate.gold18KT}</TableCell>
                                    <TableCell>{rate.silver}</TableCell>
                                    <TableCell>{rate.silverKg}</TableCell>
                                    <TableCell>{rate.platinum}</TableCell>
                                    <TableCell>{rate.employee}</TableCell>
                                    <TableCell className="d-flex gap-2">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => navigate(`/admin/metal-rates/update-metal-rate/${rate._id}`)}
                                            startIcon={<MdEdit />}
                                        >
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleDelete(rate._id)}
                                            startIcon={<MdDelete />}
                                        >
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default MetalRatesList;
