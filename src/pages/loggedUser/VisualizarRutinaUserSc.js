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
        const {
            usuario,
            fechaFin,
            fechaPago,
            cantSemana,
            fechaInicio,
            finalComment,
            initialComment,
            funcionalidades
        } = Json;

        return (
            <div>
                <p>ID del usuario: {IdUsuario}</p>
                <p>Usuario: {usuario}</p>
                <p>Fecha de inicio: {fechaInicio}</p>
                <p>Fecha de fin: {fechaFin}</p>
                <p>Fecha de pago: {fechaPago}</p>
                <p>Cantidad de semanas: {cantSemana}</p>
                {initialComment && <p>Comentario inicial: {initialComment}</p>}
                {finalComment && <p>Comentario final: {finalComment}</p>}
                {funcionalidades && funcionalidades.length > 0 && (
                    <div>
                        <h3>Funcionalidades</h3>
                        {funcionalidades.map((funcionalidad, index) => (
                            <div key={index}>
                                <h4>{funcionalidad.nombreFuncionalidad}</h4>
                                {funcionalidad.ejercicios && funcionalidad.ejercicios.length > 0 && (
                                    <ul>
                                        {funcionalidad.ejercicios.map((ejercicio, idx) => (
                                            <li key={idx}>
                                                <p>Nombre del ejercicio: {ejercicio.nombreEjercicio}</p>
                                                {[...Array(5)].map((_, semanaIdx) => (
                                                    ejercicio[`semana${semanaIdx + 1}`] && (
                                                        <p key={semanaIdx}>
                                                            Semana {semanaIdx + 1}: {ejercicio[`semana${semanaIdx + 1}`]}
                                                        </p>
                                                    )
                                                ))}
                                                {ejercicio.comentario && <p>Comentario: {ejercicio.comentario}</p>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
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
