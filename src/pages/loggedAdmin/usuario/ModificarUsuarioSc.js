import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PrincipalMenu from '../../../components/menu/PrincipalMenu';
import ComboBox from '../../../components/ui/ComboBox';
import TextInputs from '../../../components/ui/TextInput';
import BotonPrincipalFuncional from '../../../components/ui/BotonPrincipalFuncional';
import useUpdateAnything from '../../../hooks/useUpdateAnything';
import TarjetaInformacion from '../../../components/showData/TarjetaInformacion';
import HeadAdmin from "../../../components/Header/HeadAdmin";
import Foot from "../../../components/Footer/Foot";

const datos = [
    { label: 'Nombre', type: 'text' },
    { label: 'Apellido', type: 'text' },
    { label: 'Teléfono', type: 'number' },
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
        const jsonData = {
            idRegistro: userId,
            nombreColumna: selectedOption.label,
            nuevoValor: newData
        };
        console.log(jsonData);

        const success = await updateAnything(jsonData);
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
            <HeadAdmin/>
            <div className='centered-title2'> 
                <h1 className='black'>Modificar Usuario</h1>
                <TarjetaInformacion/>
            </div>
            
            <ComboBox datos={datos} onSelect={setSelectedOption}/>
            <TextInputs selectedOption={selectedOption} newData={newData} setNewData={setNewData}/>
            <BotonPrincipalFuncional texto="Modificar" onClick={handleModificar}/>
            <Foot/>
        </div>
    );
}

export default ModificarUsuarioSc;
