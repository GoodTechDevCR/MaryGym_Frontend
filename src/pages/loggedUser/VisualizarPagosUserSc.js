import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import UserMenu from '../../components/menu/UserMenu';
import TablaPagoForUser from '../../components/showData/TablePagoUsuario';

const VisualizarPagosUserSc = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p>No user data available</p>;
    }

    return (
        <div>
            <UserMenu />
            <h2>Visualizar Pagos</h2>
            <p>ID del usuario: {user.id}</p>
            <TablaPagoForUser idUsuario={user.id} />
        </div>
    );
};

export default VisualizarPagosUserSc;
