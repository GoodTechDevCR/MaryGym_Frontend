import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function SelectSingleRelacion({ onRelacionChange }) {
    const relaciones = [
        { label: 'Amigo', value: 'amigo' },
        { label: 'Familiar', value: 'familiar' },
        { label: 'Hijo', value: 'hijo' },
        { label: 'Madre', value: 'madre' },
        { label: 'Padre', value: 'padre' }
    ];

    return (
        <Autocomplete
            disablePortal
            id="combo-box-relacion"
            options={relaciones}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
                if (newValue) {
                    onRelacionChange(newValue.value);
                } else {
                    onRelacionChange(null);
                }
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Relación" />}
        />
    );
}

export default SelectSingleRelacion;
