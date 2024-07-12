import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../UserContext';
import "../../pages/Home/Home.css";
import HeadUser from "../../components/Header/HeadUser";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserMenu from '../../components/menu/UserMenu';

const InformacionUserSc = ({ nombre, fecha1, fecha2, saldo }) => {
    const { user } = useContext(UserContext);
    const [ultimaFecha, setUltimaFecha] = useState(null);

    useEffect(() => {
        if (user && user.id) {
            fetch(`https://marygymbackend-production.up.railway.app/cobro/fechaLimite/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Fecha de pago fetched:", data);
                    if (data.length > 0 && data[0].FechaFinal) {
                        setUltimaFecha(data[0].FechaFinal);
                    } else {
                        console.error('FechaFinal is not in the response', data);
                    }
                })
                .catch(error => console.error('Error fetching fecha limite:', error));
        }
    }, [user]);

    if (!user) {
        return <p>No user data available</p>;
    }

    return (
        <div>
            <HeadUser />
            <UserMenu />

            <div className='container'>
                <Typography variant="h2" className='black'>
                    Bienvenido {user.nombre}
                </Typography>
                <p>ID del usuario: {user.id}</p>

                <Box sx={{ mt: 3 }}>
                    {renderCard(ultimaFecha)}
                </Box>
            </div>
        </div>
    );
};

export default InformacionUserSc;

function renderCard(ultimaFecha) {
    return (
        <Box sx={{ minWidth: 0 }} className='card2'>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" className='body4'>
                        Datos de pago
                    </Typography>
                    <Typography variant="body1" className='body3'>
                        {ultimaFecha ? (
                            <div>Siguiente fecha de pago: {new Date(ultimaFecha).toLocaleDateString()}</div>
                        ) : (
                            <div>Cargando siguiente fecha de pago...</div>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
