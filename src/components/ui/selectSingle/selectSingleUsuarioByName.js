import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UseConsultaUsuario from "../../../hooks/usuarioHooks/useConsultaUsuario";

function SelectSingleUsuario({ onUsuarioChange }) {
    const dataUsuario = UseConsultaUsuario();

    if (!dataUsuario) return <div>Loading...</div>;
    const opcionUsuario = dataUsuario.map(usuario => ({
        label: `${usuario.nombre} ${usuario.apellido} - ${usuario.correo} `,
        value: usuario.idusuario, // Aquí solo guardamos el ID del usuario
        correo: usuario.correo // Guardamos también el correo del usuario
    }));
    
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={opcionUsuario}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
                if (newValue) {
                    onUsuarioChange(newValue.value, newValue.correo);;
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