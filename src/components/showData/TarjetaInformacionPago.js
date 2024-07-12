import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dataPagobyId from '../../utils/dataPagobyId';
import "../../pages/Home/Home.css";

const TarjetaInformacionPago = ({ idPago }) => {
    const [pagoData, setPagoData] = useState(null);

    useEffect(() => {
        const fetchPagoData = async () => {
            const data = await dataPagobyId(idPago);
            if (Array.isArray(data) && data.length > 0) {
                setPagoData(data[0]);
            } else {
                setPagoData(null);
            }
        };
        fetchPagoData();
    }, [idPago]);

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
            {pagoData ? (
                <div>
                    <Typography variant="h5" gutterBottom className='centered-title'>
                        Información de Pago
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Nombre Usuario:</strong> {pagoData.NombreUsuario}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Fecha Pago:</strong> {pagoData.FechaPago}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Tipo Transacción:</strong> {pagoData.TipoTran}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <strong>Monto:</strong> {pagoData.Monto}
                    </Typography>
                </div>
            ) : (
                <Typography variant="body1">
                    Cargando datos del pago...
                </Typography>
            )}
        </Box>
    );
};

export default TarjetaInformacionPago;
