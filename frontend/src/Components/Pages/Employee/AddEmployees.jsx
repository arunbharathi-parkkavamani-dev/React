import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import './static/style.css';
import PincodeData from './static/pincodes.json';
import {
    Typography,
    TextField,
    Autocomplete,
    Button,
    InputLabel,
    Switch,
    Paper
} from '@mui/material';

const departments = ['HR', 'Sales', 'Billing', 'Estimation'];

const AddEmployees = ({ expanded }) => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', dateOfBirth: '', age: '',
        employeeId: '', dateOfJoining: '', designation: '', department: '', isActive: true,
        address1: '', address2: '', address3: '', city: '', state: '', country: '', pinCode: '',
        area: '', phone: '', email: '', username: '', password: '', userType: '', userPermission: '',
        comments: '', profilePicture: null
    });

    const [location, setLocation] = useState({ country: '', state: '', city: '' });
    const [dialCode, setDialCode] = useState('in');
    const [areaOptions, setAreaOptions] = useState([]);
    const navigate = useNavigate();

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age.toString();
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0]
                : type === 'checkbox' ? checked
                    : value,
            ...(name === 'dateOfBirth' && { age: calculateAge(value) })
        }));
    };

    const handleCountryChange = (_, value) => {
        const isoCode = value?.isoCode || '';
        setLocation({ country: isoCode, state: '', city: '' });
        setFormData((prev) => ({ ...prev, country: value?.name || '' }));
        setDialCode(isoCode.toLowerCase());
    };

    const handleStateChange = (_, value) => {
        const isoCode = value?.isoCode || '';
        setLocation((prev) => ({ ...prev, state: isoCode, city: '' }));
        setFormData((prev) => ({ ...prev, state: value?.name || '' }));
    };

    const handleCityChange = (_, value) => {
        setFormData((prev) => ({ ...prev, city: value?.name || '' }));
    };

    const handlePincodeChange = (value) => {
        setFormData((prev) => ({ ...prev, pinCode: value }));

        if (value.length >= 5) {
            const filtered = PincodeData.filter(item =>
                String(item.pincode).startsWith(value)
            );
            setAreaOptions(filtered.map(item => ({
                label: item.officeName,
                value: item.officeName
            })));
        } else {
            setAreaOptions([]);
        }
    };

    const handleCancel = () => {
        setFormData({
            firstName: '', lastName: '', dateOfBirth: '', age: '',
            employeeId: '', dateOfJoining: '', designation: '', department: '', isActive: true,
            address1: '', address2: '', address3: '', city: '', state: '', country: '', pinCode: '',
            area: '', phone: '', email: '', username: '', password: '', userType: '', userPermission: '',
            comments: '', profilePicture: null
        });
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your submission logic here
        console.log('Form submitted', formData);
    };

    return (
        <Container fluid className="mt-4 employee-form" style={{ width: expanded ? 'calc(100vw - 95px)' : 'calc(100vw - 200px)' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" gutterBottom>Add Employee</Typography>
                    <Row>
                        <Col md={6} className="mb-3 d-flex flex-column align-items-center">
                            <Typography variant="h6">Profile Picture</Typography>
                            <img
                                src={formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : './static/default.png'}
                                alt="Preview"
                                style={{ width: 290, height: 290, objectFit: 'cover', border: '1px solid #ccc', marginBottom: 10 }}
                            />
                            <input
                                accept="image/*"
                                id="profilePictureInput"
                                type="file"
                                name="profilePicture"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="profilePictureInput">
                                <Button variant="outlined" component="span">Choose Image</Button>
                            </label>
                        </Col>

                        <Col md={6}>
                            <Typography variant="h6">Basic Information</Typography>
                            <Row>
                                {[
                                    ['firstName', 'First Name', false, true],
                                    ['lastName', 'Last Name', false, true],
                                    ['dateOfBirth', 'Date of Birth', 'date', false],
                                    ['age', 'Age', 'text', true, false]
                                ].map(([name, label, type = 'text', disabled = false], required = true) => (
                                    <Col md={6} className="mb-3" key={name}>
                                        <TextField
                                            label={label}
                                            name={name}
                                            type={type}
                                            fullWidth
                                            required={required}
                                            disabled={disabled}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            InputLabelProps={type === 'date' ? { shrink: true } : undefined}
                                        />
                                    </Col>
                                ))}
                            </Row>

                            <Typography variant="h6">Official Information</Typography>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <TextField label="Employee ID" name="employeeId" fullWidth value={formData.employeeId} onChange={handleChange} />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <TextField label="Date of Joining" name="dateOfJoining" type="date" fullWidth value={formData.dateOfJoining} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Autocomplete
                                        options={departments}
                                        value={formData.designation}
                                        onChange={(_, value) => setFormData((prev) => ({ ...prev, designation: value || '' }))}
                                        renderInput={(params) => <TextField {...params} label="Designation" fullWidth />}
                                    />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Autocomplete
                                        options={departments}
                                        value={formData.department}
                                        onChange={(_, value) => setFormData((prev) => ({ ...prev, department: value || '' }))}
                                        renderInput={(params) => <TextField {...params} label="Department" fullWidth />}
                                    />
                                </Col>
                                <Col md={12} className="d-flex align-items-center justify-content-center mb-3">
                                    <InputLabel>Active</InputLabel>
                                    <Switch checked={formData.isActive} onChange={handleChange} name="isActive" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Typography variant="h6">Contact Information</Typography>
                    <Row>
                        {['address1', 'address2', 'address3'].map((name) => (
                            <Col md={4} className="mb-3" key={name}>
                                <TextField label={name.replace('address', 'Address ')} name={name} fullWidth value={formData[name]} onChange={handleChange} />
                            </Col>
                        ))}
                        <Col md={4} className="mb-3">
                            <Autocomplete
                                options={Country.getAllCountries()}
                                getOptionLabel={(opt) => opt.name}
                                onChange={handleCountryChange}
                                renderInput={(params) => <TextField {...params} label="Country" fullWidth />}
                            />
                        </Col>
                        <Col md={4} className="mb-3">
                            <Autocomplete
                                options={State.getStatesOfCountry(location.country)}
                                getOptionLabel={(opt) => opt.name}
                                onChange={handleStateChange}
                                renderInput={(params) => <TextField {...params} label="State" fullWidth />}
                                disabled={!location.country}
                            />
                        </Col>
                        <Col md={4} className="mb-3">
                            <Autocomplete
                                options={City.getCitiesOfState(location.country, location.state)}
                                getOptionLabel={(opt) => opt.name}
                                onChange={handleCityChange}
                                renderInput={(params) => <TextField {...params} label="City" fullWidth />}
                                disabled={!location.state}
                            />
                        </Col>
                        <Col md={4} className="mb-3">
                            <TextField label="PIN Code" name="pinCode" fullWidth value={formData.pinCode} onChange={(e) => handlePincodeChange(e.target.value)} />
                        </Col>
                        <Col md={4} className="mb-3">
                            <Autocomplete
                                options={areaOptions}
                                getOptionLabel={(opt) => opt.label}
                                onChange={(_, value) => setFormData((prev) => ({ ...prev, area: value?.label || '' }))}
                                renderInput={(params) => <TextField {...params} label="Area" fullWidth />}
                                value={areaOptions.find((opt) => opt.label === formData.area) || null}
                            />
                        </Col>
                        <Col md={4} className="mb-3">
                            <PhoneInput
                                country={dialCode}
                                value={formData.phone}
                                onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                                inputStyle={{
                                    width: '100%',
                                    height: '56px', // MUI TextField height
                                    fontSize: '16px',
                                    paddingLeft: '48px', // space for flag
                                    borderRadius: '4px',
                                    borderColor: '#c4c4c4'
                                }}
                                buttonStyle={{
                                    border: 'none',
                                    background: 'none'
                                }}
                                inputProps={{
                                    name: 'phone',
                                    id: 'phone'
                                }}
                            />
                        </Col>
                    </Row>

                    <Typography variant="h6">Login Information</Typography>
                    <Row>
                        {['username', 'password', 'userType', 'userPermission'].map((name) => (
                            <Col md={3} className="mb-3" key={name}>
                                <TextField
                                    label={name.replace(/([A-Z])/g, ' $1')}
                                    name={name}
                                    type={name === 'password' ? 'password' : 'text'}
                                    fullWidth
                                    value={formData[name]}
                                    onChange={handleChange}
                                />
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        <Col md={12} className="mb-3">
                            <TextField label="Comments" name="comments" multiline rows={3} fullWidth value={formData.comments} onChange={handleChange} />
                        </Col>
                    </Row>

                    <Row>
                        <Col className="text-center">
                            <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
                            <Button type="button" variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
                        </Col>
                    </Row>
                </form>
            </Paper>
        </Container>
    );
};

export default AddEmployees;
