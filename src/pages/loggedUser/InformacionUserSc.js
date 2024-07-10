// InformacionUserSc.jsx
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../UserContext';
import "../../pages/Home/Home.css";
import Head from "../../components/Header/Head";
import Foot from "../../components/Footer/Foot";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
            <Head />
            <UserMenu />

            <div className='fila'>
                <h1 className='black'> Bienvenido&nbsp;</h1>
                <h1 className='grey'> {nombre} </h1>
            </div>
            <div className='fila'>
                {card(ultimaFecha)}
            </div>
        </div>
    );
};

export default InformacionUserSc;

function card(ultimaFecha) {
    return (
        <Box sx={{ minWidth: 0 }} className='card2'>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent className='left'>
                        <div className="body4">
                            Datos de pago
                        </div>
                        <div className="body3">
                            {ultimaFecha ? (
                                <div>Siguiente fecha pago: {new Date(ultimaFecha).toLocaleDateString()}</div>
                            ) : (
                                <div>Cargando siguiente fecha de pago...</div>
                            )}
                        </div>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    );
}
