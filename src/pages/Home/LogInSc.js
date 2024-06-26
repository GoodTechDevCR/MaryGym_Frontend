import React from 'react';
import BotonPrincipalNavegacion from '../../components/ui/BotonPrincipalNavegacion';
import TextField from '../../components/ui/TextField.js';
import Box from '@mui/material/Box';

const LogInSc = () => {
    return (
        <div>
            <div className='centered-title'>
                <h1 className='black'> Iniciar Sesión</h1>
                <Box sx={{ paddingLeft: 10, paddingRight:10}}>
                    <body> Ingresa tu correo electrónico para ingresar a tu perfil </body>
                    <TextField/>
                    hello
                    <TextField/>
                </Box>
                


            </div>



            <BotonPrincipalNavegacion texto="Regresar" to="/" />
            
        </div>
    );
};

export default LogInSc;
