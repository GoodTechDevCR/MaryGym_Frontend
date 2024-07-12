import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import UserMenu from '../../components/menu/UserMenu';
import TablaPagoForUser from '../../components/showData/TablePagoUsuario';
import Box from '@mui/material/Box';
import Foot from "../../components/Footer/Foot";
import HeadUser from "../../components/Header/HeadUser";

const VisualizarPagosUserSc = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p>No user data available</p>;
    }

    return (
        <div>
            <HeadUser />
            <UserMenu />
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <h1 className='black' style={{ fontSize: '3rem' }}>Visualizar Pagos</h1>
                <p>ID del usuario: {user.id}</p>
            </Box>
            
            <TablaPagoForUser idUsuario={user.id} />
            <Foot/>
        </div>
    );
};

export default VisualizarPagosUserSc;
