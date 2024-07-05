// VisualizarRutinaUserSc.jsx
import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import UserMenu from '../../components/menu/UserMenu';

const VisualizarRutinaUserSc = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p>No user data available</p>;
    }

    return (
        <div>
            <UserMenu />
            <h2>Visualizar Rutina</h2>
            <p>ID del usuario: {user.id}</p>
        </div>
    );
};

export default VisualizarRutinaUserSc;
