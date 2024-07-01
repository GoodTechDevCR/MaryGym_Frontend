import React, { useState } from 'react';
import SelectSingleUsuario from "../ui/selectSingle/SelectSingleUsuario";
import SelectSingleTipoTran from "../ui/selectSingle/SelectSingleTipoTran";
import DatePickerPrueba from "../datePicker/DatePickerPrueba";
import useCreateAnything from "../../hooks/useCreateAnything";

function PagoInsertar() {
    const { createAnything: createCobroYPago } = useCreateAnything('http://localhost:4000/cobro/cobroypago');
    const { createAnything: createAbono } = useCreateAnything('http://localhost:4000/abono');

    const [formData, setFormData] = useState({
        IdUsuario: null,
        Monto: '',
        FechaPago: null,
        IdTipoTran: null,
        DiasAdicionales: '',
        FechaFinalEspecial: null,
        OpcionSeleccionada: '',
        MontoAbono: '',
        FechaAbono: null
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
            return { ...prevFormData, IdTipoTran: id, Monto: newMonto, DiasAdicionales: '', FechaFinalEspecial: null, OpcionSeleccionada: '' };
        });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, FechaPago: date });
    };

    const handleFechaFinalEspecialChange = (date) => {
        setFormData({ ...formData, FechaFinalEspecial: date });
    };

    const handleDiasAdicionalesChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, DiasAdicionales: value });
    };

    const handleOpcionSeleccionadaChange = (e) => {
        setFormData({ ...formData, OpcionSeleccionada: e.target.value, DiasAdicionales: '', FechaFinalEspecial: null });
    };

    const handleFechaAbonoChange = (date) => {
        setFormData({ ...formData, FechaAbono: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.IdTipoTran === 6) {
            // Registro de abono
            const fechaAbonoFinal = formData.FechaAbono.toISOString().split('T')[0];
            const montoAbonoFinal = parseFloat(formData.MontoAbono);

            const abonoData = {
                IdUsuario: formData.IdUsuario,
                FechaAbono: fechaAbonoFinal,
                MontoAbono: montoAbonoFinal
            };

            const abonoResult = await createAbono(abonoData);

            if (abonoResult) {
                alert("Abono registrado exitosamente");
            } else {
                alert("Error al registrar el abono");
            }
        } else {
            // Registro de cobro y pago
            const fechaPagoFinal = formData.FechaPago.toISOString().split('T')[0];
            const montoFinal = parseFloat(formData.Monto);

            const jsonData = {
                IdUsuario: formData.IdUsuario,
                Monto: montoFinal,
                FechaPago: fechaPagoFinal,
                IdTipoTran: formData.IdTipoTran,
                DiasAdicionales: formData.DiasAdicionales ? parseInt(formData.DiasAdicionales) : null,
                FechaFinalEspecial: formData.FechaFinalEspecial ? formData.FechaFinalEspecial.toISOString().split('T')[0] : null
            };

            const result = await createCobroYPago(jsonData);

            if (result) {
                alert("Cobro y pago creados/actualizados exitosamente");
            } else {
                alert("Error al crear el cobro y el pago");
            }
        }
    };

    return (
        <div>
            <h2>Formulario de Pago</h2>
            <form onSubmit={handleSubmit}>
                <SelectSingleUsuario onUsuarioChange={handleUsuarioChange} />
                <SelectSingleTipoTran onTipoTranChange={handleTipoTranChange} />
                {formData.IdTipoTran !== 6 && (
                    <>
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
                        <br />
                        <label>
                            Fecha de pago:
                            <DatePickerPrueba onDateChange={handleDateChange} />
                        </label>
                        {formData.IdTipoTran === 10 && (
                            <div>
                                <label>
                                    Seleccione una opción:
                                    <select name="OpcionSeleccionada" value={formData.OpcionSeleccionada} onChange={handleOpcionSeleccionadaChange}>
                                        <option value="">Seleccione</option>
                                        <option value="DiasAdicionales">Días adicionales</option>
                                        <option value="FechaFinalEspecial">Fecha final especial</option>
                                    </select>
                                </label>
                                <br />
                                {formData.OpcionSeleccionada === 'DiasAdicionales' && (
                                    <label>
                                        Días adicionales:
                                        <input
                                            type="number"
                                            name="DiasAdicionales"
                                            value={formData.DiasAdicionales}
                                            onChange={handleDiasAdicionalesChange}
                                        />
                                    </label>
                                )}
                                {formData.OpcionSeleccionada === 'FechaFinalEspecial' && (
                                    <label>
                                        Fecha final especial:
                                        <DatePickerPrueba onDateChange={handleFechaFinalEspecialChange} />
                                    </label>
                                )}
                            </div>
                        )}
                    </>
                )}
                {formData.IdTipoTran === 6 && (
                    <div>
                        <label>
                            Monto del Abono:
                            <input
                                type="text"
                                name="MontoAbono"
                                value={formData.MontoAbono}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Fecha del Abono:
                            <DatePickerPrueba onDateChange={handleFechaAbonoChange} />
                        </label>
                    </div>
                )}
                <br />
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default PagoInsertar;
