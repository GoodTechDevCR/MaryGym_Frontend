import React from 'react';
import TablaPago from "../../../components/showData/TablaPago";
import Foot from "../../../components/Footer/Foot";
import HeadAdmin from "../../../components/Header/HeadAdmin";
import Box from '@mui/material/Box';

const VisualizarPagoSc = () => {
    return (
        <div>
            <HeadAdmin/>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <h1 className='black' style={{ fontSize: '3rem' }}>Visualizar Pagos</h1>
            </Box>
            
            <TablaPago/>
            <br/><br/><br/><br/>
            <Foot/>
        </div>
    );
};

export default VisualizarPagoSc;