import React from 'react';
import TextField from '@mui/material/TextField';

function TextInputs({ selectedOption, newData, setNewData }) {
    if (!selectedOption) {
        return null;
    }

    return (
        <TextField
            label={selectedOption.label}
            type={selectedOption.type}
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
            sx={{ width: 300 }}
        />
    );
}

export default TextInputs;
