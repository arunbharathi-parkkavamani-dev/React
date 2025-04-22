import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography, Button } from '@mui/material';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const MetalList = () => {
    const [metals, setMetals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMetals = async () => {
            try {
                const res = await axios.get(`${baseUrl}/metalList`);
                setMetals(res.data);
            } catch (err) {
                console.error('Error fetching metals:', err);
            }
        };

        fetchMetals();
    }, []);

    const handleUpdate = (id) => {
        console.log('Update metal with id:', id);
        // navigate to update page or open modal
    };

    const handleDelete = (id) => {
        console.log('Delete metal with id:', id);
        // add your delete logic here (confirmation + API call)
    };

    return (
        <>
            <br /><br />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mr={2}>
                <Typography variant="h5">Metal Rates List</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate("/admin/metal/add-metal")}>
                    Add Metal Rate
                </Button>
            </Box>
            <div className="container-fluid mt-4">
                <h2 className="mb-4">Metal List</h2>
                <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center">ID</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Short Code</th>
                                <th className="text-center">Tax Group</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metals.map((metal) => (
                                <tr key={metal._id}>
                                    <td className="text-center">{metal.id}</td>
                                    <td className="text-center">{metal.name}</td>
                                    <td className="text-center">{metal.shortCode}</td>
                                    <td className="text-center">{metal.taxGroup}</td>
                                    <td className="text-center">{metal.status}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleUpdate(metal._id)}
                                            title="Update"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(metal._id)}
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {metals.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center">No metal data available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MetalList;
