import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ComboBox from '../../../components/ui/ComboBox';
import TextInputs from '../../../components/ui/TextInput';
import BotonPrincipalFuncional from '../../../components/ui/BotonPrincipalFuncional';
import useUpdateAnything from '../../../hooks/useUpdateAnything';
import TarjetaInformacionPago from '../../../components/showData/TarjetaInformacionPago';
import HeadAdmin from "../../../components/Header/HeadAdmin";
import Foot from "../../../components/Footer/Foot";
import "../../Home/Home.css";

const datos = [
    { label: 'Fecha Pago', type: 'date' }
];

function ModificarPagoSc() {
    const { updateAnything } = useUpdateAnything('https://marygymbackend-production.up.railway.app/pago/');
    const { id: pagoId } = useParams();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [newData, setNewData] = useState('');

    const handleModificar = async (event) => {
        event.preventDefault();

        if (!newData) {
            alert('Debes ingresar un valor para modificar.');
            return;
        }

        let nombreColumna;
        if (selectedOption.type === 'date') {
            nombreColumna = 'FechaPago';
        }

        let formattedData = newData;
        if (selectedOption.type === 'date') {
            formattedData = newData.toISOString().split('T')[0]; // Formatea la fecha a "YYYY-MM-DD"
        }

        const jsonData = {
            idRegistro: pagoId,
            nombreColumna: nombreColumna,
            nuevoValor: formattedData
        };

        try {
            const success = await updateAnything(jsonData);
            if (success) {
                alert('Pago modificado exitosamente');
                navigate('/admin/pago/visualizar');
            } else {
                alert('Error al modificar el pago');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al modificar el pago:', error);
            alert('Error al modificar el pago');
        }
    };

    return (
        <div>
            <HeadAdmin />
            <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" sx={{ fontSize: '3rem', marginBottom: '20px' }}>Modificar Pago</Typography>
                <TarjetaInformacionPago idPago={pagoId} />
                <div className='centered-title'>
                    <Box sx={{ mt: 3 }}>
                        <ComboBox datos={datos} onSelect={setSelectedOption} />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextInputs selectedOption={selectedOption} newData={newData} setNewData={setNewData} />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <BotonPrincipalFuncional texto="Modificar" onClick={handleModificar} />
                    </Box>
                </div>
            </Box>
            <Foot />
        </div>
    );
}

export default ModificarPagoSc;
