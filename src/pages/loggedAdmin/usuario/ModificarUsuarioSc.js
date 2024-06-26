import React, { useState } from 'react';
import PrincipalMenu from "../../../components/menu/PrincipalMenu";
import ComboBox from "../../../components/ui/ComboBox";
import TextInputs from "../../../components/ui/TextInput"; // Asegúrate de que el nombre del archivo sea correcto

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

    return (
        <div>
            <PrincipalMenu />
            <h1>Modificar Usuario</h1>
            <ComboBox Datos={datos} onSelect={setSelectedOption} />
            <TextInputs selectedOption={selectedOption} />
        </div>
    );
};

export default ModificarUsuarioSc;
