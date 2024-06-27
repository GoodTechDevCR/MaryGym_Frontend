import React from 'react';
import BotonPrincipalNavegacion from '../../components/ui/BotonPrincipalNavegacion';
import TextField from '../../components/ui/TextField.js';
import Box from '@mui/material/Box';
import BotonPrincipalFuncional from  '../../components/ui/BotonPrincipalFuncional';
import Button from '@mui/material/Button';

const LogInSc = () => {
    return (
        <div className='centered-title'>
            <h1 className='black'> Iniciar Sesión</h1>
            <Box component="section" className = 'elemento' >
                <body> Ingresa tu correo electrónico y contraseña para ingresar a tu perfil </body>
            </Box>
            <Box component="section" value="texto" className = 'elemento' >
                <TextField/>
            </Box>
            <Box component="section" className = 'elemento' >
                <TextField/>
            </Box>
            <Box component="section" className = 'elemento' >
                <BotonPrincipalFuncional texto="Iniciar Sesión" to="/" />
            </Box>
            <Box component="section" className = 'elemento' >
                <Button  variant="text" onClick={() => {
                    alert('Olvide contraseña');
                    }}>Olvidé mi contraseña

                </Button>
            </Box>


        <br/>
        <br/>
        <br/>

        </div>
    );
};

export default LogInSc;
