import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UseConsultaUsuario from "../../../hooks/usuarioHooks/useConsultaUsuario";

function SelectSingleUsuario({ onUsuarioChange }) {
    const dataUsuario = UseConsultaUsuario();

    if (!dataUsuario) return <div>Loading...</div>;

    const opcionUsuario = dataUsuario.map(usuario => ({
        label: `${usuario.nombre} ${usuario.apellido}`,
        value: `${usuario.nombre} ${usuario.apellido}`
    }));

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={opcionUsuario}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
                if (newValue) {
                    onUsuarioChange(newValue.value);
                } else {
                    onUsuarioChange(null);
                }
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Usuario" />}
        />
    );
}

export default SelectSingleUsuario;