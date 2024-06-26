import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ComboBox({ datos, onSelect  }) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={datos}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
                const selectedType = newValue ? newValue.type : null;
                console.log("Selected type:", selectedType); // Imprimir el type seleccionado en la consola
                onSelect(selectedType); // Llamar a la función onSelect con el type del dato seleccionado
            }}
            renderInput={(params) => <TextField {...params} label="Datos Usuario" />}
        />
    );
}
export default ComboBox;
