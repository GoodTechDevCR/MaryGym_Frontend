import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import dataUserbyId from '../../utils/dataUserbyId';
import "../../pages/Home/Home.css";

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

    useEffect(() => {
        console.log('User Data:', userData);
    }, [userData]);

    return (
        <>
        <Box sx={{ border: '2px solid grey', borderRadius: '8px', backgroundColor: '#f9f9f9' , maxWidth: 700, margin:'auto' }}>
        {userData ? (
                <div>
                    <p><strong>Nombre:</strong> {userData.nombre}</p>
                    <p><strong>Apellido:</strong> {userData.apellido}</p>
                    <p><strong>Teléfono:</strong> {userData.telefono}</p>
                    <p><strong>Saldo:</strong> {userData.saldo}</p>
                    <p><strong>Estado:</strong> {userData.estado}</p>
                    <p><strong>Fecha Nacimiento:</strong> {userData.fechanacimiento}</p>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </Box>
        </>
    );
};

export default TarjetaInformacion;