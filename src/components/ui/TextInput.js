import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers'; // Asegúrate de tener instalado @mui/x-date-pickers y @mui/lab

const TextInput = ({ selectedOption }) => {
    const renderInputField = () => {
        if (!selectedOption) return null;

        switch (selectedOption.type) {
            case 'text':
                return (
                    <TextField
                        required
                        id="outlined-text"
                        label={selectedOption.label}
                        type="text"
                    />
                );
            case 'number':
                return (
                    <TextField
                        required
                        id="outlined-number"
                        label={selectedOption.label}
                        type="number"
                    />
                );
            case 'bit':
                return (
                    <TextField
                        required
                        id="outlined-bit"
                        label={selectedOption.label}
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 1 } }}
                    />
                );
            case 'date':
                return (
                    <DatePicker
                        required
                        id="outlined-date"
                        label={selectedOption.label}
                        renderInput={(params) => <TextField {...params} />}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                {renderInputField()}
            </div>
        </Box>
    );
};

export default TextInput;
