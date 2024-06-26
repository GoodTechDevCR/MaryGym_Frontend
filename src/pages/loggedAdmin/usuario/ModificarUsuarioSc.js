import React, { useState } from 'react';
import PrincipalMenu from "../../../components/menu/PrincipalMenu";
import ComboBox from "../../../components/ui/ComboBox";
import TextInputs from "../../../components/ui/TextInput";
import BotonPrincipalFuncional from "../../../components/ui/BotonPrincipalFuncional";

const datos = [
    { label: 'Nombre', type: 'text' },
    { label: 'Apellido', type: 'text' },
    { label: 'Teléfono', type: 'number' },
    { label: 'Saldo', type: 'number' },
    { label: 'Estado', type: 'bit' },
    { label: 'Fecha Nacimiento', type: 'date' }
];

const ModificarUsuarioSc = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [newData, setNewData] = useState('');
    const [userId, setUserId] = useState('');

    const handleModificar = () => {
        console.log("Selected Option:", selectedOption);
        console.log("Form Data:", newData);

        // Realizar la solicitud POST con el ID al final de la URL
        fetch(`http://25.7.30.30:4000/usuario/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Aquí puedes manejar la respuesta del servidor
            })
            .catch((error) => {
                console.error('Error:', error);
                // Aquí puedes manejar errores de la solicitud
            });
    };

    return (
        <div>
            <PrincipalMenu />
            <h1>Modificar Usuario</h1>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <ComboBox datos={datos} onSelect={setSelectedOption} />
            <TextInputs selectedOption={selectedOption} formData={newData} setFormData={setNewData} />
            <BotonPrincipalFuncional texto="Modificar" onClick={handleModificar} />
        </div>
    );
};

export default ModificarUsuarioSc;
