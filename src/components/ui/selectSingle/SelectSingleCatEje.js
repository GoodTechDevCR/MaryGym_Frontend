import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UseConsultaCatEje from '../../../hooks/catEjeHooks/useConsultaCatEje';

function SelectSingleCatEje({ onCatEjeChange }) {
    const dataCatEje = UseConsultaCatEje();

    if (!dataCatEje) return <div>Loading...</div>;

    const opcionCateEje = dataCatEje.map(catEje => ({
        label: catEje.Nombre,
        value: catEje.IdCategoriaEjercicio
    }));

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={opcionCateEje}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
                if (newValue) {
                    onCatEjeChange(newValue.value);
                } else {
                    onCatEjeChange(null);
                }
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Categoria Ejercicio" />}
        />
    );
}

export default SelectSingleCatEje;