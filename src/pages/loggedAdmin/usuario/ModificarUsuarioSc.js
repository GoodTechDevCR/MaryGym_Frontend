import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ComboBox from '../../../components/ui/ComboBox';
import TextInputs from '../../../components/ui/TextInput';
import BotonPrincipalFuncional from '../../../components/ui/BotonPrincipalFuncional';
import useUpdateAnything from '../../../hooks/useUpdateAnything';
import TarjetaInformacion from '../../../components/showData/TarjetaInformacion';
import Head from "../../../components/Header/Head";
import Foot from "../../../components/Footer/Foot";

const datos = [
    { label: 'Nombre', type: 'text' },
    { label: 'Apellido', type: 'text' },
    { label: 'Teléfono', type: 'text' },
    { label: 'Saldo', type: 'number' },
    { label: 'Estado', type: 'bit' },
    { label: 'Fecha Nacimiento', type: 'date' }
];

function ModificarUsuarioSc() {
    const { updateAnything } = useUpdateAnything('http://25.7.30.30:4000/usuario/update');
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [newData, setNewData] = useState('');

    const handleModificar = async (event) => {
        event.preventDefault();
        let nombreColumna;
        if (selectedOption.label === 'Fecha Nacimiento') {
            nombreColumna = 'fechanacimiento';
        } else if (selectedOption.label === 'Teléfono') {
            nombreColumna = 'telefono';
        } else {
            nombreColumna = selectedOption.label.toLowerCase(); // Ajusta según corresponda
        }

        const jsonData = {
            idRegistro: userId,
            nombreColumna: nombreColumna,
            nuevoValor: newData
        };
        console.log(jsonData);

        const success = await updateAnything(jsonData);
        console.log("holaaa: ", success);
        if (success) {
            alert('Usuario modificado exitosamente');
            navigate('/');
        } else {
            alert('Error al modificar al usuario');
            window.location.reload();
        }
    };

    return (
        <div>
            <Head/>
            <h1>Modificar Usuario</h1>
            <TarjetaInformacion/>
            <ComboBox datos={datos} onSelect={setSelectedOption}/>
            <TextInputs selectedOption={selectedOption} newData={newData} setNewData={setNewData}/>
            <BotonPrincipalFuncional texto="Modificar" onClick={handleModificar}/>
            <Foot/>
        </div>
    );
}

export default ModificarUsuarioSc;