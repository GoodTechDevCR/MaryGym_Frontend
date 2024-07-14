import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function ComboBox({ datos, onSelect }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={datos}
                sx={{ width: 300 }}
                onChange={(event, newValue) => {
                    onSelect(newValue); // Pasar el objeto completo de la opción seleccionada
                }}
                renderInput={(params) => <TextField {...params} label="Datos" />}
            />
        </div>
    );
}

export default ComboBox;
