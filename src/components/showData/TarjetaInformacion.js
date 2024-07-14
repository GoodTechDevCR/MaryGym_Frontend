import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import dataUserbyId from '../../utils/dataUserbyId';

const TarjetaInformacion = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await dataUserbyId(id);
            if (Array.isArray(data) && data.length > 0) {
                setUserData(data[0]); // Acceder al primer elemento del array
            } else {
                setUserData(null);
            }
        };
        fetchUserData();
    }, [id]);

    return (
        <Box
            sx={{
                border: '2px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                maxWidth: 700,
                margin: 'auto',
                padding: '20px',
                boxShadow: 3,
            }}
        >
            {userData ? (
                <div >
                    <Typography variant="h5" gutterBottom className='centered-title'>
                        Información del Usuario
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Nombre:</strong> {userData.nombre}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Apellido:</strong> {userData.apellido}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Teléfono:</strong> {userData.telefono}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Estado:</strong> {userData.estado === 1 ? 'Activo' : 'No Activo'}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Fecha de Nacimiento:</strong> {userData.fechanacimiento}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Comentario:</strong> {userData.Comentario}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Aceptación de Términos y Condiciones:</strong> {userData.AceptacionTC ? 'Sí' : 'No'}
                    </Typography>
                </div>
            ) : (
                <Typography variant="body1">
                    Cargando datos del usuario...
                </Typography>
            )}
        </Box>
    );
};

export default TarjetaInformacion;
