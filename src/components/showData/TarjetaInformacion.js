import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import dataUserbyId from '../../utils/dataUserbyId';

const TarjetaInformacion = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await dataUserbyId(id);
            setUserData(data);
        };
        fetchUserData();
    }, [id]);

    return (
        <Box
            height={300}
            width={300}
            my={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
            sx={{ border: '2px solid grey', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
        >
            {userData ? (
                <>
                    <h2>Información del Usuario</h2>
                    <p><strong>Nombre:</strong> {userData.Nombre}</p>
                    <p><strong>Apellido:</strong> {userData.Apellido}</p>
                    <p><strong>Teléfono:</strong> {userData.Telefono}</p>
                    <p><strong>Saldo:</strong> {userData.Saldo}</p>
                    <p><strong>Estado:</strong> {userData.Estado}</p>
                    <p><strong>Fecha Nacimiento:</strong> {userData.FechaNacimiento}</p>
                </>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </Box>
    );
};

export default TarjetaInformacion;

