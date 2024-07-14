import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../UserContext';
import "../../pages/Home/Home.css";
import HeadUser from "../../components/Header/HeadUser";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserMenu from '../../components/menu/UserMenu';
import TablaPagoForUser from '../../components/showData/TablePagoUsuario';
import Foot from "../../components/Footer/Foot";

const InformacionUserSc = ({ nombre, fecha1, fecha2, saldo }) => {
    const { user } = useContext(UserContext);
    const [ultimaFecha, setUltimaFecha] = useState(null);
    const [loadingFecha, setLoadingFecha] = useState(true);

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
                    console.log("Fecha de pago:", data);
                    if (data.length > 0 && data[0].FechaFinal) {
                        setUltimaFecha(data[0].FechaFinal);
                    } else {
                        console.error('FechaFinal is not in the response', data);
                    }
                    setLoadingFecha(false);
                })
                .catch(error => {
                    console.error('Error fetching fecha limite:', error);
                    setLoadingFecha(false);
                });
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

                <Box sx={{ mt: 3 }}>
                    {renderCard(ultimaFecha, loadingFecha)}
                </Box>

                <Typography variant="h2" className='black' sx={{ fontSize: '2rem', marginTop: '30px' }}>
                    Pagos realizados
                </Typography>
                <TablaPagoForUser idUsuario={user.id} />
                <Typography variant="h2" className='black' sx={{ fontSize: '2rem', marginBottom: '30px' }}>
                    
                </Typography>
            </div>
            <Foot />
        </div>
    );
};

export default InformacionUserSc;

function renderCard(ultimaFecha, loadingFecha) {
    return (
        <Box sx={{ minWidth: 0 }} className='card2'>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" className='body4'>
                        Datos de pago
                    </Typography>
                    <Typography variant="body1" className='body3'>
                        {loadingFecha ? (
                            <div>Cargando siguiente fecha de pago...</div>
                        ) : ultimaFecha ? (
                            <div>Siguiente fecha de pago: {new Date(ultimaFecha).toLocaleDateString()}</div>
                        ) : (
                            <div>No se ha registrado la fecha siguiente de pago, consulte con su entrenadora.</div>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
