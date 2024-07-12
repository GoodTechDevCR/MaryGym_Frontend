import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ComboBox from '../../../components/ui/ComboBox';
import TextInputs from '../../../components/ui/TextInput';
import BotonPrincipalFuncional from '../../../components/ui/BotonPrincipalFuncional';
import useUpdateAnything from '../../../hooks/useUpdateAnything';
import TarjetaInformacion from '../../../components/showData/TarjetaInformacion';
import HeadAdmin from "../../../components/Header/HeadAdmin";
import Foot from "../../../components/Footer/Foot";
import "../../Home/Home.css";

const datos = [
    { label: 'Nombre', type: 'text' },
    { label: 'Apellido', type: 'text' },
    { label: 'Teléfono', type: 'number' },
    { label: 'Estado', type: 'bit' },
    { label: 'Fecha Nacimiento', type: 'date' },
    { label: 'Comentario', type: 'text' },
    { label: 'Aceptacion de terminos y condiciones', type: 'bitTC' }
];

function ModificarUsuarioSc() {
    const { updateAnything } = useUpdateAnything('https://marygymbackend-production.up.railway.app/usuario/update');
    const { id: userId } = useParams();
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
        if (selectedOption.label === 'Fecha Nacimiento') {
            nombreColumna = 'fechanacimiento';
        } else if (selectedOption.label === 'Teléfono') {
            nombreColumna = 'telefono';
        } else if (selectedOption.label === 'Aceptacion de terminos y condiciones') {
            nombreColumna = 'AceptacionTC';
        } else {
            nombreColumna = selectedOption.label.toLowerCase(); // Ajusta según corresponda
        }

        let formattedData = newData;
        if (selectedOption.label === 'Fecha Nacimiento') {
            formattedData = newData.toISOString().split('T')[0]; // Formatea la fecha a "YYYY-MM-DD"
        }

        const jsonData = {
            idRegistro: userId,
            nombreColumna: nombreColumna,
            nuevoValor: formattedData
        };

        console.log(jsonData);

        const success = await updateAnything(jsonData);
        console.log("Respuesta del servidor:", success);
        if (success) {
            alert('Usuario modificado exitosamente');
            navigate('/admin/usuario/visualizar');
        } else {
            alert('Error al modificar al usuario');
            window.location.reload();
        }
    };

    return (
        <div>
            <HeadAdmin />
            <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" sx={{ fontSize: '3rem', marginBottom: '20px' }}>Modificar Usuario</Typography>
                <TarjetaInformacion />
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

export default ModificarUsuarioSc;
