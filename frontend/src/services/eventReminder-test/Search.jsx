import React, { useState } from "react";
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Call onSearch directly to update results on input change
  }

  function handleSearch() {
    onSearch(searchTerm);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        fullWidth
        sx={{ maxWidth: 400 }}
      />
      <IconButton onClick={handleSearch} color="primary" sx={{ ml: 1 }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default Search;
