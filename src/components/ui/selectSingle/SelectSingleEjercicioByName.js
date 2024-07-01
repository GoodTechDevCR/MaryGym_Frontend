import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UseConsultaEjercicio from '../../../hooks/ejercicioHooks/useConsultaEjercicio';

function SelectSingleEjercicioByName({ onEjercicioChange }) {
    const dataEjercicio = UseConsultaEjercicio();

    if (!dataEjercicio) return <div>Loading...</div>;

    const opcionesEjercicio = dataEjercicio.map(ejercicio => ({
        label: ejercicio.Nombre,
        value: ejercicio.Nombre
    }));

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={opcionesEjercicio}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
                if (newValue) {
                    onEjercicioChange(newValue.value);
                } else {
                    onEjercicioChange(null);
                }
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Ejercicio" />}
        />
    );
}

export default SelectSingleEjercicioByName;
