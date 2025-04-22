import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Button, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
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

    const handleSignOut = () => {
        handleClose();

        // Clear all cookies (basic way)
        document.cookie.split(";").forEach(cookie => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; Max-Age=0; path=/;`;
        });

        // You could also clear localStorage/sessionStorage if needed
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to login (home) without hardcoding domain
        navigate('/');
    };

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{ color: 'inherit', textTransform: 'none' }}
                startIcon={<FaUserCircle size={24} />}
            >
                LMXETAIL
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <MenuItem disabled>
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                    LMXETAIL
                </MenuItem>
                <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
        </>
    );
};

export default UserDropdown;
