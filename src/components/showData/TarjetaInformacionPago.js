import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import dataPagobyId from '../../utils/dataPagobyId';
import "../../pages/Home/Home.css";

const TarjetaInformacionPago = () => {
    const { idPago } = useParams();
    const [pagoData, setPagoData] = useState(null);

    useEffect(() => {
        const fetchPagoData = async () => {
            const data = await dataPagobyId(idPago);
            if (Array.isArray(data) && data.length > 0) {
                setPagoData(data[0]); // Acceder al primer elemento del array
            } else {
                setPagoData(null);
            }
        };
        fetchPagoData();
    }, [idPago]);

    useEffect(() => {
        console.log('User Data:', pagoData);
    }, [pagoData]);

    return (
        <>
        <Box sx={{ border: '2px solid grey', borderRadius: '8px', backgroundColor: '#f9f9f9' , maxWidth: 700, margin:'auto' }}>
        {pagoData ? (
                <div>
                    <p><strong>Nombre Usuario:</strong> {pagoData.NombreUsuario}</p>
                    <p><strong>Fecha Pago:</strong> {pagoData.FechaPago}</p>
                    <p><strong>Tipo Transacción:</strong> {pagoData.TipoTran}</p>
                    <p><strong>Monto:</strong> {pagoData.Monto}</p>
                </div>
            ) : (
                <p>Cargando datos del pago...</p>
            )}
        </Box>
        </>
    );
};

export default TarjetaInformacionPago;