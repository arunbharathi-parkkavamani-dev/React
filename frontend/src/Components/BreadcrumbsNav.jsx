import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

const BreadcrumbsNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isMongoId = (str) => /^[a-f\d]{24}$/i.test(str); // Check if it's a Mongo ObjectId

    // Remove any MongoDB-style ObjectId segments
    const pathnames = location.pathname
        .split('/')
        .filter((x) => x && !isMongoId(x));

    const handleClick = (path, index) => {
        const newPath = `/${pathnames.slice(0, index + 1).join('/')}`;
        navigate(newPath);
    };

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            className="float-end text-secondary small my-2"
            sx={{ margin: '10px', fontSize: '.7rem' }}
        >
            <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate('/')}
                sx={{ cursor: 'pointer' }}
            >
                ERP
            </Link>

            {pathnames.map((value, index) => {
                const isLast = index === pathnames.length - 1;
                const label =
                    value === 'admin'
                        ? 'Admin'
                        : value === 'metal-rates'
                            ? 'Metal Rates'
                            : value === 'add'
                                ? 'Add Metal Rates'
                                : value === 'update-metal-rate'
                                    ? 'Update Metal Rate'
                                    : value.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

                return isLast ? (
                    <span style={{ fontSize: '.7rem' }} key={index}>
                        <Typography color="text.primary">{label}</Typography>
                    </span>
                ) : (
                    <Link
                        key={index}
                        underline="hover"
                        color="inherit"
                        onClick={() => handleClick(value, index)}
                        sx={{ cursor: 'pointer', fontSize: '.7rem' }}
                    >
                        {label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default BreadcrumbsNav;
