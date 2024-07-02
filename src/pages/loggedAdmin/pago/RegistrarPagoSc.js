import React from 'react';
import Foot from "../../../components/Footer/Foot";
import HeadAdmin from "../../../components/Header/HeadAdmin";
import TextInputs from '../../../components/ui/TextInput';
import Box from '@mui/material/Box';
import BotonPrincipalFuncional from  '../../../components/ui/BotonPrincipalFuncional';
import PrincipalMenu from "../../../components/menu/PrincipalMenu";
import PagoInsertar from "../../../components/insertar/PagoInsertar";

const RegistrarPagoSc = () => {
    const [newData, setNewData] = "";
    return (
        <div>
            <HeadAdmin/>
            <PrincipalMenu/>
            <PagoInsertar/>
            <div className='centered-title2'> 
                <h1 className='black'>Registro de pagos</h1>  
                <Box component="section" className = 'elemento' >
                    <TextInputs selectedOption="id usuario"  newData={newData} setNewData={setNewData}/>
                </Box>
                <Box component="section" className = 'elemento' >
                    <TextInputs selectedOption='monto' newData={newData} setNewData={setNewData}/>
                </Box> 
                <Box component="section" className = 'elemento' >
                    <TextInputs selectedOption='fecha pago' newData={newData} setNewData={setNewData}/>
                </Box> 
                <Box component="section" className = 'elemento' >
                    <TextInputs selectedOption='tipo transferencia' newData={newData} setNewData={setNewData}/>
                </Box>
                <Box component="section" className = 'elemento' >
                    <BotonPrincipalFuncional texto="Registrar pago" to="/" />
                </Box>
                <br/><br/><br/><br/>
            </div>
            <Foot/>
            
        </div>
    );
};

export default RegistrarPagoSc;