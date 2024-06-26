import React from 'react';
import TextField from '@mui/material/TextField';

function TextInputs({ selectedOption, formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (!selectedOption) {
        return null;
    }

    return (
        <div>
            <TextField
                label={selectedOption.label}
                name={selectedOption.label}
                type={selectedOption.type}
                value={formData[selectedOption.label]}
                onChange={handleChange}
            />
        </div>
    );
}

export default TextInputs;
