import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ProcedureSearchBar() {
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);

    const handleInputChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        try {
            // Make a request to your backend API to fetch suggestions
            const response = await axios.get(`/api/search/${query}`)
            const data = await response.data;
            setSuggestions(data);
            setOpen(true); // Open the dropdown when there are suggestions
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        
        if (query === '') {
            setOpen(false); // Close the dropdown when query is empty
        }
    };

    return (
        <>
            <p>Search:</p>
            <Autocomplete
                freeSolo
                options={suggestions}
                getOptionLabel={(option) => `${option.primary_code} - ${option.description}`}
                open={open}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        margin="normal"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                )}
            />
        </>
    );
}

export default ProcedureSearchBar;
