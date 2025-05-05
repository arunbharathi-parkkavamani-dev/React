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
    IconButton,
    Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import axiosInstance from '../../api/axiosInstance';

const fields = [
    'First Name', 'EmployeeID', 'Department', 'Designation', 'Active',
    'City', 'State', 'Country', 'Phone', 'Username', 'User Type',
    'Branch Permission', 'Action'
];

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axiosInstance.get('/employees');
                console.log('Received data:', res.data);
                setEmployee(res.data);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };

        fetchEmployee();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`/users/${id}`);
            if (response.status === 200) {
                setEmployee(prev => prev.filter(emp => emp._id !== id));
            } else {
                console.error('Failed to delete employee');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <>
            <br /> <br />
            <Box p={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5">Employee List</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/admin/Employee/add-employees")}
                    >
                        Add Employee
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {fields.map((label, i) => (
                                    <TableCell key={i}>{label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee.map((emp) => (
                                <TableRow key={emp._id}>
                                    <TableCell>{emp.firstName || '-'}</TableCell>
                                    <TableCell>{emp.employeeID || '-'}</TableCell>
                                    <TableCell>{emp.department || '-'}</TableCell>
                                    <TableCell>{emp.designation || '-'}</TableCell>
                                    <TableCell>{emp.active || '-'}</TableCell>
                                    <TableCell>{emp.city || '-'}</TableCell>
                                    <TableCell>{emp.state || '-'}</TableCell>
                                    <TableCell>{emp.country || '-'}</TableCell>
                                    <TableCell>{emp.phone || '-'}</TableCell>
                                    <TableCell>{emp.username || '-'}</TableCell>
                                    <TableCell>{emp.userType || '-'}</TableCell>
                                    <TableCell>{emp.branchPermission || '-'}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                color="primary"
                                                onClick={() => navigate(`/admin/Employee/update-employee/${emp._id}`)}
                                            >
                                                <MdEdit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(emp._id)}
                                            >
                                                <MdDelete />
                                            </IconButton>
                                        </Tooltip>
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

export default Employee;
