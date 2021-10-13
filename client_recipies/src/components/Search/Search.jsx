import React from 'react';
import { TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const Search = ({
  label = 'Search',
  id = 'search',
  name = 'search',
  onChange = () => {},
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        height: '100%',
        position: 'relative',
      }}
    >
      <TextField
        label={label}
        id={id}
        name={name}
        variant="standard"
        onChange={onChange}
        style={{
          width: '350px',
        }}
      />
      <SearchIcon style={{ position: 'absolute', right: 0, bottom: '10px' }} />
    </div>
  );
};

export default Search;
