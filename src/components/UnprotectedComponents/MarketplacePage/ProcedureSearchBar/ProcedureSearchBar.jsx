//import 3rd party libraries
import React, { useState } from 'react';
import axios from 'axios';

//import Material UI 
import { TextField, Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function ProcedureSearchBar({ onSearchQueryChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleInputChange = async (event, newValue) => {
    const query = newValue || event.target.value; // Use newValue if available (autocomplete selection), otherwise use event.target.value
    setSearchQuery(query);

    console.log('Sending request to:', `/api/search/${encodeURIComponent(query)}`);

    try {
      // Make a request to your backend API to fetch suggestions
      const response = await axios.get(`/api/search/query/${encodeURIComponent(query)}`);
      const data = await response.data;
      console.log('Data received:', data); // Log the data received from the backend
      setSuggestions(data);
      setOpen(true); // Open the dropdown when there are suggestions
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }

    if (query === '') {
      setOpen(false); // Close the dropdown when query is empty
    }

    // Invoke the callback function with the search query value
    onSearchQueryChange(query);
  };

  return (
    <>
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => `${option.primary_code} - ${option.description}`}
        open={open}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for CPT code or Keyword"
            margin="normal"
            variant="outlined"
            value={searchQuery}
            onChange={handleInputChange}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
}

export default ProcedureSearchBar;
