import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const MetalList = () => {
    const [metals, setMetals] = useState([]);

    useEffect(() => {
        const fetchMetals = async () => {
            try {
                const res = await axios.get(`${baseUrl}/metals`);
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
        <div className="container mt-4">
            <h2 className="mb-4">Metal List</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Short Code</th>
                            <th>Tax Group</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metals.map((metal) => (
                            <tr key={metal._id}>
                                <td>{metal._id}</td>
                                <td>{metal.name}</td>
                                <td>{metal.shortCode}</td>
                                <td>{metal.taxGroup}</td>
                                <td>{metal.status}</td>
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
    );
};

export default MetalList;
