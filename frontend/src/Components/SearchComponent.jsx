import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import axiosInstance from '../api/axiosInstance'; // Adjust the import path as necessary
import { FaSearch } from 'react-icons/fa';


const SearchBar = ({ onResults, placeholder = "Search...", searchUrl }) => {
    const [query, setQuery] = useState('');

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        try {
            const res = await axiosInstance.get(`${searchUrl}?q=${encodeURIComponent(value)}`);
            onResults(res.data);
        } catch (err) {
            console.error('Search failed:', err);
        }
    };

    return (
        <>
            <br />
            <TextField
                variant="outlined"
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FaSearch />
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
};

export default SearchBar;
