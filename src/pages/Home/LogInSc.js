import React from 'react';
import BotonPrincipalNavegacion from '../../components/ui/BotonPrincipalNavegacion';
import TextInputs from '../../components/ui/TextInput';
import Box from '@mui/material/Box';
import BotonPrincipalFuncional from  '../../components/ui/BotonPrincipalFuncional';
import Button from '@mui/material/Button';

const LogInSc = () => {
    const [newData, setNewData] = "";
    const selectedOptionCorreo = {};
    selectedOptionCorreo.label = "Correo Electrónico";
    const selectedOptionContrasena = {};
    selectedOptionContrasena.label = "Contraseña";
    return (
        <div className='centered-title'>
            <h1 className='black'> Iniciar Sesión</h1>
            <Box component="section" className = 'elemento' >
                <body> Ingresa tu correo electrónico y contraseña para ingresar a tu perfil </body>
            </Box>
            <Box component="section" value="texto" className = 'elemento' >
                <TextInputs selectedOption={selectedOptionCorreo}  newData={newData} setNewData={setNewData}/>
            </Box>
            <Box component="section" className = 'elemento' >
                <TextInputs selectedOption={selectedOptionContrasena}  newData={newData} setNewData={setNewData}/>
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
