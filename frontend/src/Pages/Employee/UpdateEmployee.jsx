import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance.js'
import { Container, Row, Col } from 'react-bootstrap';
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import './static/style.css';
import PincodeData from './static/pincodes.json';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useParams } from 'react-router-dom';
import {
    Typography,
    TextField,
    Autocomplete,
    Button,
    InputLabel,
    Switch,
    Paper,
    MenuItem
} from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const departments = ['HR', 'Sales', 'Billing', 'Estimation'];

const UpdateEmployee = ({ expanded }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', dateOfBirth: '', age: '',
        employeeId: '', dateOfJoining: '', designation: '', department: '', isActive: true,
        address1: '', address2: '', address3: '', city: '', state: '', country: '', pinCode: '',
        area: '', phone: '', email: '', username: '', password: '', userType: '', branchPermission: '',
        comments: '', profilePicture: ''
    });
    const [validationErrors, setValidationErrors] = useState({
        username: '',
        phone: ''
    });
    const [location, setLocation] = useState({ country: '', state: '', city: '' });
    const [dialCode, setDialCode] = useState('in');
    const [areaOptions, setAreaOptions] = useState([]);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axiosInstance.get(`/employees/${id}`);
                const employeeData = response.data;
                setFormData(employeeData);


                // Set selected country, state, and city based on the fetched data
                setLocation({
                    country: Country.getAllCountries().find(c => c.name === employeeData.country)?.isoCode || '',
                    state: State.getStatesOfCountry(
                        Country.getAllCountries().find(c => c.name === employeeData.country)?.isoCode || ''
                    ).find(s => s.name === employeeData.state)?.isoCode || '',
                    city: employeeData.city
                });
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, [id]);

    const validateUniqueFields = async (name, value) => {
        try {
            const response = await axiosInstance.get('/employees');
            const employeeList = response.data?.data || [];

            const exists = employeeList.some(emp => emp[name] === value && emp._id !== id);

            setValidationErrors((prev) => ({
                ...prev,
                [name]: exists ? `${name.charAt(0).toUpperCase() + name.slice(1)} already exists!` : ''
            }));
            return !exists;
        } catch (error) {
            console.error(`Error validating ${name}:`, error);
            return false;
        }
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        if (age < 0) alert("Age cannot be negative!"); // Ensure age is not negative
        return age.toString();
    };

    const handleChange = async (e) => {
        const { name, value, type, checked, files } = e.target;

        // Prepare updated field value
        const updatedValue = type === 'file' ? files[0] :
            type === 'checkbox' ? checked : value;

        // Update form data
        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
            ...(name === 'dateOfBirth' && { age: calculateAge(value) })
        }));

    };

    const handleCountryChange = (_, value) => {
        const isoCode = value?.isoCode || '';
        setFormData((prev) => ({ ...prev, country: value?.name || formData.country }));
        setDialCode(isoCode.toLowerCase());
    };

    const handleStateChange = (_, value) => {
        const isoCode = value?.isoCode || '';
        setLocation((prev) => ({ ...prev, state: isoCode, city: '' }));
        setFormData((prev) => ({ ...prev, state: value?.name || '' }));
    };

    const handleCityChange = (_, value) => {
        setFormData((prev) => ({ ...prev, city: value?.name || formData.city }));
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
            area: '', phone: '', email: '', username: '', password: '', userType: '', branchPermission: '',
            comments: '', profilePicture: null
        });
        navigate(-1);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const isUsernameValid = await validateUniqueFields('username', formData.username);
        const isPhoneValid = await validateUniqueFields('phone', formData.phone);
        if (!isUsernameValid || !isPhoneValid) {
            alert("Please fix validation errors before submitting.");
            return;
        }

        try {
            const formPayload = new FormData();
            for (const key in formData) {
                formPayload.append(key, formData[key]);
            }
            if (formData.profilePicture) {
                formPayload.append("profilePicture", formData.profilePicture);
            }

            // Use the pre-configured axios instance
            await axiosInstance.put(`/employees/${id}`, formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Employee updated successfully!');
            navigate(-1); // go back
        } catch (error) {
            console.error('Error saving employee:', error);
            alert('There was an error saving the employee. Please try again.');
        }
    };
    const isNewFile = formData.profilePicture instanceof File;

    return (
        <Container fluid className="mt-4 employee-form" style={{ width: expanded ? 'calc(100vw - 95px)' : 'calc(100vw - 200px)' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" gutterBottom>Add Employee</Typography>
                    <Row>
                        <Col md={6} className="mb-3 d-flex flex-column align-items-center">
                            <Typography variant="h6">Profile Picture</Typography>

                            <img
                                src={isNewFile ? URL.createObjectURL(formData.profilePicture) : formData.profilePicture || './static/default.png'}
                                alt="Preview"
                                style={{
                                    width: 290,
                                    height: 290,
                                    objectFit: 'cover',
                                    border: '1px solid #ccc',
                                    marginBottom: 10
                                }}
                            />

                            <input
                                accept="image/*"
                                id="profilePicture"
                                type="file"
                                name="profilePicture"
                                onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="profilePicture">
                                <Button variant="outlined" component="span">Choose Image</Button>
                            </label>
                        </Col>

                        <Col md={6}>
                            <Typography variant="h6">Basic Information</Typography>
                            <Row>
                                {[
                                    ['firstName', 'First Name', 'text', false, true],
                                    ['lastName', 'Last Name', 'text', false, true],
                                    ['dateOfBirth', 'Date of Birth', 'date', false, false],
                                    ['age', 'Age', 'text', true, false]
                                ].map(([name, label, type, disabled, required]) => (
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
                                required
                                renderInput={(params) => <TextField {...params} label="Country" fullWidth />}
                            />
                        </Col>
                        <Col md={4} className="mb-3">
                            <Autocomplete
                                options={State.getStatesOfCountry(location.country)}
                                getOptionLabel={(opt) => opt.name}
                                onChange={handleStateChange}
                                required
                                renderInput={(params) => <TextField {...params} label="State" fullWidth />}
                                disabled={!location.country}
                            />
                        </Col>
                        <Col md={4} className="mb-3">
                            <Autocomplete
                                options={City.getCitiesOfState(location.country, location.state)}
                                getOptionLabel={(opt) => opt.name}
                                onChange={handleCityChange}
                                required={true}
                                renderInput={(params) => <TextField {...params} label="City" fullWidth />}
                                disabled={!location.state}
                            />
                        </Col>
                        <Col md={4} className="mb-3">
                            <TextField
                                label="PIN Code"
                                name="pinCode"
                                fullWidth
                                value={formData.pinCode}
                                onChange={(e) => handlePincodeChange(e.target.value)}
                                required={true}
                            />
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
                                onChange={(phone) => {
                                    setFormData((prev) => ({ ...prev, phone }));
                                    setValidationErrors((prev) => ({ ...prev, phone: '' })); // clear error on change
                                }}
                                onBlur={() => validateUniqueFields('phone', formData.phone)}
                                inputStyle={{
                                    width: '100%',
                                    height: '56px', // MUI TextField height
                                    fontSize: '16px',
                                    paddingLeft: '48px', // space for flag
                                    borderRadius: '4px',
                                    borderColor: validationErrors.phone ? 'red' : '#c4c4c4'
                                }}
                                buttonStyle={{
                                    border: 'none',
                                    background: 'none'
                                }}
                                inputProps={{
                                    name: 'phone',
                                    id: 'phone',
                                    onBlur: () => validateUniqueFields('phone', formData.phone)
                                }}
                            />
                            {validationErrors.phone && (
                                <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }}>
                                    {validationErrors.phone}
                                </div>
                            )}
                        </Col>
                    </Row>

                    <Typography variant="h6">Login Information</Typography>
                    <Row>
                        {[
                            { name: 'username', type: 'text' },
                            { name: 'password', type: 'password' },
                            { name: 'userType', type: 'select', options: ['Admin', 'Employee', 'Manager'] },
                            { name: 'branchPermission', type: 'select', options: ['All', 'Coimbatore'] },
                        ].map(({ name, type, options }) => (
                            <Col md={3} className="mb-3" key={name}>
                                {type === 'select' ? (
                                    <TextField
                                        select
                                        label={name.replace(/([A-Z])/g, ' $1')}
                                        name={name}
                                        fullWidth
                                        value={formData[name]}
                                        onChange={handleChange}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                ) : (
                                    <TextField
                                        label={name.replace(/([A-Z])/g, ' $1')}
                                        name={name}
                                        type={type}
                                        fullWidth
                                        value={formData[name]}
                                        onChange={handleChange}
                                        onBlur={() => validateUniqueFields('username', formData[name])}
                                        error={!!validationErrors.username}
                                        helperText={validationErrors.username}
                                    />
                                )}
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

export default UpdateEmployee;