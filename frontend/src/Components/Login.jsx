import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [branch, setBranch] = useState('All');
    const navigate = useNavigate();
    const branchOptions = ['All', 'Coimbatore'];

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${baseUrl}/employees/login`,
                {
                    username,
                    password,
                    branchPermission: branch,
                },
                {
                    withCredentials: true,
                }
            );

            const firstName = response.data.firstName
            const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            localStorage.setItem('firstName', formattedName);
            navigate(`/admin/Dashboard`);
            console.log(response);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    ERP Login
                </Typography>
                <Box component="form" onSubmit={handleLogin}>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Typography variant="h6" gutterBottom>
                        Select Branch
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Branch</InputLabel>
                        <Select
                            id="branch"
                            value={branch}
                            label="Branch"
                            onChange={(e) => setBranch(e.target.value)}
                        >
                            {branchOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
