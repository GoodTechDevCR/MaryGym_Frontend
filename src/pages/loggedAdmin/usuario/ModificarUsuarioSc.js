import React, { useState } from 'react';
import PrincipalMenu from "../../../components/menu/PrincipalMenu";
import ComboBox from "../../../components/ui/ComboBox";
import TextInputs from "../../../components/ui/TextInput";
import BotonPrincipalFuncional from "../../../components/ui/BotonPrincipalFuncional";
import useUpdateAnything from "../../../hooks/useUpdateAnything";
import { useParams, useNavigate } from 'react-router-dom';

const datos = [
    { label: 'Nombre', type: 'text' },
    { label: 'Apellido', type: 'text' },
    { label: 'Teléfono', type: 'number' },
    { label: 'Saldo', type: 'number' },
    { label: 'Estado', type: 'bit' },
    { label: 'Fecha Nacimiento', type: 'date' }
];

function ModificarUsuarioSc() {
    const { updateAnything } = useUpdateAnything('http://localhost:4000/usuario/update');
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [newData, setNewData] = useState('');
    const { id } = useParams(); // Asegúrate de que userId se obtenga correctamente aquí


    console.log("UserId:", id);

    const handleModificar = (event) => {
        event.preventDefault();
        const jsonData = {
            idRegistro: id,
            nombreColumna: selectedOption.label,
            nuevoValor: newData
        };
        console.log(jsonData);

        if (updateAnything(jsonData)) {
            alert('Usuario modificado exitosamente');
            //navigate('/');
        } else {
            alert('Error al modificar al usuario');
            window.location.reload();
        }
    };

    return (
        <div>
            <PrincipalMenu />
            <h1>Modificar Usuario</h1>
            <ComboBox datos={datos} onSelect={setSelectedOption} />
            <TextInputs selectedOption={selectedOption} newData={newData} setNewData={setNewData} />
            <BotonPrincipalFuncional texto="Modificar" onClick={handleModificar} />
        </div>
    );
}

export default ModificarUsuarioSc;
