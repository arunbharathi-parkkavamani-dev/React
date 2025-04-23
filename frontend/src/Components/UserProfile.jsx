import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Button, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
    const firstName = localStorage.getItem('firstName') || 'User';
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditProfile = () => {
        handleClose();
        // navigate to profile or open modal
        console.log("Edit Profile clicked");
    };

    const handleSignOut = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users/logout', {
                method: 'POST',
                credentials: 'include', // Important to send the session cookie
            });

            if (res.ok) {
                console.log('✅ Logout successful');
                navigate('/login'); // Or your desired redirect
            } else {
                const errData = await res.json();
                console.error('❌ Logout failed:', errData);
            }
        } catch (err) {
            console.error('❌ Error during logout:', err);
        }
    };

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{ color: 'inherit', textTransform: 'none' }}
                startIcon={<FaUserCircle size={24} />}
            >
                {firstName}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <MenuItem disabled>
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                    {firstName}
                </MenuItem>
                <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
        </>
    );
};

export default UserDropdown;
