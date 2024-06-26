import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ComboBox({ Datos, onSelect  }) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Datos}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
                onSelect(newValue ? newValue.value : null); // Llamar a la función onSelect con el valor del tipo seleccionado
            }}
            renderInput={(params) => <TextField {...params} label="Datos Usuario" />}
        />
    );
}
export default ComboBox;
