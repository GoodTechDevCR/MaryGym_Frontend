import React, { useState } from 'react';
import SelectSingleUsuario from "../ui/selectSingle/SelectSingleUsuario";
import SelectSingleTipoTran from "../ui/selectSingle/SelectSingleTipoTran";
import DatePickerPrueba from "../datePicker/DatePickerPrueba";
import useCreateAnything from "../../hooks/useCreateAnything";

function PagoInsertar() {
    const { createAnything } = useCreateAnything('http://localhost:4000/cobro/cobroypago');

    const [formData, setFormData] = useState({
        IdUsuario: null,
        Monto: '',
        FechaPago: null,
        IdTipoTran: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUsuarioChange = (id) => {
        setFormData({ ...formData, IdUsuario: id });
    };

    const handleTipoTranChange = (id) => {
        setFormData((prevFormData) => {
            let newMonto = '';
            if (id === 7 || id === 8 || id === 9) {
                newMonto = id === 7 ? '17500' : (id === 8 ? '5000' : '2700');
                document.getElementById('monto-input').setAttribute('readonly', 'readonly');
            } else if (id === 10) {
                newMonto = '-';
                document.getElementById('monto-input').removeAttribute('readonly');
            } else {
                document.getElementById('monto-input').removeAttribute('readonly');
            }
            return { ...prevFormData, IdTipoTran: id, Monto: newMonto };
        });
    };

    const handleReload = () => {
        window.location.reload();
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, FechaPago: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fechaPagoFinal = formData.FechaPago.toISOString().split('T')[0];
        const montoFinal = parseFloat(formData.Monto);

        const jsonData = {
            IdUsuario: formData.IdUsuario,
            Monto: montoFinal,
            FechaPago: fechaPagoFinal,
            IdTipoTran: formData.IdTipoTran
        };

        const result = await createAnything(jsonData);

        if (result) {
            alert("Cobro y pago creados/actualizados exitosamente");
        } else {
            alert("Error al crear el cobro y el pago");
        }
    };

    return (
        <div>
            <h2>Formulario de Pago</h2>
            <form onSubmit={handleSubmit}>
                <SelectSingleUsuario onUsuarioChange={handleUsuarioChange}/>
                <SelectSingleTipoTran onTipoTranChange={handleTipoTranChange}/>
                <label>
                    Monto:
                    <input
                        id="monto-input"
                        type="text"
                        name="Monto"
                        value={formData.Monto}
                        onChange={handleInputChange}
                    />
                </label>
                <br/>
                <label>
                    Fecha de pago:
                    <DatePickerPrueba onDateChange={handleDateChange}/>
                </label>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default PagoInsertar;
