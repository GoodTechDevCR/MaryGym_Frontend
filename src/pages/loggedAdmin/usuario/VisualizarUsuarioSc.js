import React from 'react';
import TablaUsuario from "../../../components/showData/TablaUsuario";
import HeadAdmin from "../../../components/Header/HeadAdmin";
import Foot from "../../../components/Footer/Foot";
import Box from '@mui/material/Box';

const VisualizarUsuarioSc = () => {
    return (
        <div >
            <HeadAdmin/>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <h1 className='black' style={{ fontSize: '3rem' }}>Usuarios</h1>
            </Box>
            <TablaUsuario/>
            <Foot />
        </div>
    );
};

export default VisualizarUsuarioSc;
