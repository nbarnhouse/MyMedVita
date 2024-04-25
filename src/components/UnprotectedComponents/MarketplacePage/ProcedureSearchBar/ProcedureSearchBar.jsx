// Import 3rd Party Libraries
import React, { useState } from 'react';
import axios from 'axios';

// Import Material UI
import { InputAdornment, TextField, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function ProcedureSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      // Make a request to your backend API to fetch suggestions
      const response = await axios.get(`/api/search/${query}`);
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
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) =>
          `${option.primary_code} - ${option.description}`
        }
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
