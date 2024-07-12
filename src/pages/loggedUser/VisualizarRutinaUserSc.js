import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../UserContext';
import UserMenu from '../../components/menu/UserMenu';

const VisualizarRutinaUserSc = () => {
    const { user } = useContext(UserContext);
    const [rutinaData, setRutinaData] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`https://marygymbackend-production.up.railway.app/rutinaXusuario/${user.id}`)
                .then(response => response.json())
                .then(data => {
                    setRutinaData(data);
                })
                .catch(error => console.error('Error fetching rutina', error));
        }
    }, [user]);

    if (!user) {
        return <p>No user data available</p>;
    }

    const renderRutinaDetails = () => {
        if (rutinaData.length === 0) {
            return <p>No se encontraron datos de la rutina</p>;
        }

        const { IdUsuario, Json } = rutinaData[0];
        const { usuario, fechaFin, fechaPago, cantSemana, fechaInicio } = Json;

        return (
            <div>
                <p>ID del usuario: {IdUsuario}</p>
                <p>Usuario: {usuario}</p>
                <p>Fecha de inicio: {fechaInicio}</p>
                <p>Fecha de fin: {fechaFin}</p>
                <p>Fecha de pago: {fechaPago}</p>
                <p>Cantidad de semanas: {cantSemana}</p>
            </div>
        );
    };

    return (
        <div>
            <UserMenu />
            <h2>Visualizar Rutina</h2>
            {renderRutinaDetails()}
        </div>
    );
};

export default VisualizarRutinaUserSc;
