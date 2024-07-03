// InformacionUserSc.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import UserMenu from '../../components/menu/UserMenu';

const VisualizarRutinaUserSc = () => {
    const { id } = useParams();

    console.log("id a mostrar: ", id);

    return (
        <div>
            <UserMenu/>
            <h2>IVisualizar Rutina del user</h2>
            <p>ID recibido: {id}</p> 
        </div>
    );
};

export default VisualizarRutinaUserSc;