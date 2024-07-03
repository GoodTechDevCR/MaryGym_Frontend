// InformacionUserSc.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import UserMenu from '../../components/menu/UserMenu';
import TablaPago from '../../components/showData/TablaPago';

const VisualizarPagosUserSc = () => {
    const { id } = useParams();

    console.log("id a mostrar: ", id);

    return (
        <div>
            <UserMenu/>
            <h2>VisualizarPagosUserSc</h2>
            <p>ID recibido: {id}</p> 
            <TablaPago/>
        </div>
    );
};

export default VisualizarPagosUserSc;