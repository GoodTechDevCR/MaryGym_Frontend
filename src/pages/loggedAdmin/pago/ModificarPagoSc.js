import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ComboBox from '../../../components/ui/ComboBox';
import TextInputs from '../../../components/ui/TextInput';
import BotonPrincipalFuncional from '../../../components/ui/BotonPrincipalFuncional';
import useUpdateAnything from '../../../hooks/useUpdateAnything';
import TarjetaInformacionPago from '../../../components/showData/TarjetaInformacion';
import HeadAdmin from "../../../components/Header/HeadAdmin";
import Foot from "../../../components/Footer/Foot";
import "../../Home/Home.css";

const datos = [
    { label: 'Fecha Pago', type: 'date' },
    { label: 'Tipo Transacción', type: 'tipoTran' },
    { label: 'Monto', type: 'number' },
];

function ModificarPagoSc() {
    const { updateAnything } = useUpdateAnything('https://marygymbackend-production.up.railway.app/pago/update');
    const { id: pagoId } = useParams();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [newData, setNewData] = useState('');

    const handleModificar = async (event) => {
        event.preventDefault();

        let nombreColumna;
        if (selectedOption.label === 'Fecha Pago') {
            nombreColumna = 'FechaPago';
        } else if (selectedOption.label === 'Tipo Transacción') {
            nombreColumna = 'IdTipoTran';
        } else if (selectedOption.label === 'Monto') {
            nombreColumna = 'Monto';
        } else {
            nombreColumna = selectedOption.label.toLowerCase(); // Ajusta según corresponda
        }

        let formattedData = newData;
        if (selectedOption.label === 'Fecha Pago') {
            formattedData = newData.toISOString().split('T')[0]; // Formatea la fecha a "YYYY-MM-DD"
            console.log("FECHA:  ",formattedData);
        }

        const jsonData = {
            idRegistro: pagoId,
            nombreColumna: nombreColumna,
            nuevoValor: formattedData
        };

        console.log(jsonData);

        const success = await updateAnything(jsonData);
        console.log("Respuesta del servidor:", success);
        if (success) {
            alert('Pago modificado exitosamente');
            navigate('/admin/pago/visualizar');
        } else {
            alert('Error al modificar al pago');
            window.location.reload();
        }
    };

    return (
        <div>
            <HeadAdmin/>
            <div className='centered-title2'> 
                <h1 className='black'>Modificar Pago</h1>
                <TarjetaInformacionPago/>
                <div className = 'elemento2'>
                    <ComboBox datos={datos} onSelect={setSelectedOption} sx={{margin:'auto'}}/>
                </div>
                <div className = 'elemento2'>
                    <TextInputs selectedOption={selectedOption} newData={newData} setNewData={setNewData}/>
                </div>
                <div className = 'elemento2'>
                    <BotonPrincipalFuncional texto="Modificar" onClick={handleModificar}/>
                </div>
            </div>
            <Foot/>
        </div>
    );
}

export default ModificarPagoSc;
