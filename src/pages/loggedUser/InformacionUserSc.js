// InformacionUserSc.jsx
import React from 'react';
import "../../pages/Home/Home.css";
import Head from "../../components/Header/Head";
import Foot from "../../components/Footer/Foot";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

/* 
Se llama asi:
{InformacionUserSc("Samir", "hoy","manana","1000")}
*/

function InformacionUserSc (nombre, fecha1, fecha2, saldo) {
    return (
        <div>
            <Head/>

            <div className='fila'> 
                <h1 className='black'> Bienvenido&nbsp;</h1>
                <h1 className='grey'> {nombre} </h1>
            </div>
            <div className='fila'>   
                {card(fecha1,fecha2, saldo)}
            </div>
            
            <Foot />
            
        </div>
    );
};

export default InformacionUserSc;

function card (fecha1, fecha2, saldo) { 
    return (
    <Box sx={{ minWidth: 0 }} className = 'card2'>
        <Card variant="outlined">  
            <React.Fragment>
                <CardContent className='left'>
                    <div className="body4">
                        Datos de pago
                    </div>
                    <div className="body3">
                        Fecha último pago:
                    </div>
                    <h1 className='black'> {fecha1} </h1>
                    <div className="body3">
                        Siguiente fecha pago:
                    </div>
                    <h1 className='black'> {fecha2} </h1>
                    <div className="body3">
                        Saldo actual:
                    </div>
                    <h1 className='black'> ₡{saldo} </h1>
                </CardContent>
            </React.Fragment>
        </Card>
    </Box>
    );
}