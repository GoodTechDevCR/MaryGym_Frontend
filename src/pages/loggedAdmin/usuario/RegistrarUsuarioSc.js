import React from 'react';
import Foot from "../../../components/Footer/Foot";
import HeadAdmin from "../../../components/Header/HeadAdmin";
import TextInputs from '../../../components/ui/TextInput';
import Box from '@mui/material/Box';
import BotonPrincipalFuncional from  '../../../components/ui/BotonPrincipalFuncional';

const RegistrarUsuarioSc = () => {
    const [newData, setNewData] = "";
    return (
        <div>
            <HeadAdmin/>
            <div className='centered-title2'> 
                <h1 className='black'>Registro de usuarios</h1>  
                <Box component="section" className = 'elemento' >
                    <TextInputs selectedOption="correo electronico"  newData={newData} setNewData={setNewData}/>
                </Box>
                <Box component="section" className = 'elemento' >
                    <TextInputs selectedOption='nombre' newData={newData} setNewData={setNewData}/>
                </Box> 
                <Box component="section" className = 'elemento' >
                    <TextInputs selectedOption='contraseña' newData={newData} setNewData={setNewData}/>
                </Box> 
                <Box component="section" className = 'elemento' >
                    <BotonPrincipalFuncional texto="Registrar usuario" to="/" />
                </Box>
            </div>
            <Foot/>
        </div>
    );
};

export default RegistrarUsuarioSc;
