import React, { useState } from 'react';
import './static/style.css';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Autocomplete,
    Button,
    InputLabel,
    Switch,
} from '@mui/material';

const departments = ['HR', 'Sales', 'Billing', 'Estimation'];
const userTypes = ['Admin', 'Manager', 'Employee'];

const AddEmployees = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        age: '',
        employeeId: '',
        dateOfJoining: '',
        designation: '',
        department: '',
        isActive: true,
        address1: '',
        address2: '',
        address3: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        userType: '',
        userPermission: '',
        comments: '',
        profilePicture: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                ...(name === 'dateOfBirth' && { age: calculateAge(value) }),
            }));
        }
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age.toString();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Submitted!');
    };

    return (
        <Box p={2}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Add Employee
                </Typography>
                <Grid container spacing={2}>
                    <form onSubmit={handleSubmit}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='h6' gutterBottom>
                                        Profile Picture
                                    </Typography>
                                    <Grid item xs={12}>
                                        <InputLabel>Profile Picture</InputLabel>
                                        <input type="file" name="profilePicture" onChange={handleChange} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={2}>
                                        <Typography variant="h6">Basic Information</Typography>
                                        <Grid item xs={3}>
                                            <TextField label="First Name" name="firstName" fullWidth value={formData.firstName} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField label="Last Name" name="lastName" fullWidth value={formData.lastName} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputLabel>Date of Birth</InputLabel>
                                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} style={{ width: '100%', padding: '16.5px 14px', borderRadius: 4, borderColor: '#c4c4c4' }} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Age" name="age" fullWidth value={formData.age} disabled />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Typography variant="h6">Official Information</Typography>
                                        <Grid item xs={3}>
                                            <TextField label="Employee ID" name="employeeId" fullWidth value={formData.employeeId} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputLabel>Date of Joining</InputLabel>
                                            <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} style={{ width: '100%', padding: '16.5px 14px', borderRadius: 4, borderColor: '#c4c4c4' }} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Autocomplete
                                                options={departments}
                                                value={formData.designation}
                                                onChange={(e, value) => setFormData((prev) => ({ ...prev, designation: value }))}
                                                renderInput={(params) => <TextField {...params} label="Designation" fullWidth />}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Autocomplete
                                                options={departments}
                                                value={formData.department}
                                                onChange={(e, value) => setFormData((prev) => ({ ...prev, department: value }))}
                                                renderInput={(params) => <TextField {...params} label="Department" fullWidth />}
                                            />
                                        </Grid>
                                        <Grid item xs={6} justifyContent={'center'}>
                                            <InputLabel>Active</InputLabel>
                                            <Switch checked={formData.isActive} onChange={handleChange} name="isActive" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Typography variant="h6">Contact Information</Typography>
                                {[
                                    ['address1', 'Address 1', 'text'],
                                    ['address2', 'Address 2', 'text'],
                                    ['address3', 'Address 3', 'text'],
                                    ['city', 'City', 'select'],
                                    ['state', 'State', 'select'],
                                    ['country', 'Country', 'select'],
                                    ['pinCode', 'Pin Code', 'number'],
                                    ['phone', 'Phone', 'number'],
                                    ['email', 'Email', 'mail'],
                                ].map(([name, label, type]) => (
                                    <Grid item xs={4} key={name}>
                                        <TextField label={label} name={name} fullWidth value={formData[name]} onChange={handleChange} />
                                    </Grid>
                                ))}
                            </Grid>

                        </Grid>

                        {/* Login Info */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Login Information</Typography>
                        </Grid>
                        {[
                            ['username', 'Username'],
                            ['password', 'Password'],
                            ['userType', 'User Type'],
                            ['userPermission', 'User Permission'],
                        ].map(([name, label]) => (
                            <Grid item xs={3} key={name}>
                                <TextField label={label} name={name} type={name === 'password' ? 'password' : 'text'} fullWidth value={formData[name]} onChange={handleChange} />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <TextField
                                label="Comments"
                                name="comments"
                                multiline
                                rows={3}
                                fullWidth
                                value={formData.comments}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Buttons */}
                        <Grid item xs={12} textAlign="center">
                            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                                Save
                            </Button>
                            <Button type="button" variant="outlined" color="secondary">
                                Cancel
                            </Button>
                        </Grid>
                </Grid>
            </form>
        </Paper>
        </Box >
    );
};

export default AddEmployees;
