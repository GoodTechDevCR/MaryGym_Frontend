import React, { useState, useEffect } from 'react';
import SelectSingleUsuario from "../ui/selectSingle/SelectSingleUsuario";
import SelectSingleTipoTran from "../ui/selectSingle/SelectSingleTipoTran";
import DatePickerPrueba from "../datePicker/DatePickerPrueba";
import useCreateAnything from "../../hooks/useCreateAnything";
import useConsultaAbonos from "../../hooks/AbonoHooks/UseConsultaAbonos"; 

function PagoInsertar() {
    const { createAnything: createCobroYPago } = useCreateAnything('http://localhost:4000/cobro/cobroypago');
    const { createAnything: createAbono } = useCreateAnything('http://localhost:4000/abono');
    const { data: abonos, loading, error, consultaAbonos } = useConsultaAbonos(); // Usa el hook correctamente
    const [selectedAbonos, setSelectedAbonos] = useState([]);

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

    useEffect(() => {
        if (formData.IdUsuario) {
            consultaAbonos(formData.IdUsuario);
        } else {
            setSelectedAbonos([]); // Reset abonos when no user is selected
        }
    }, [formData.IdUsuario]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUsuarioChange = (id) => {
        setFormData({ ...formData, IdUsuario: id });
        setSelectedAbonos([]); // Reset selected abonos when user changes
    };

    const handleTipoTranChange = (id) => {
        setFormData((prevFormData) => {
            let newMonto = '';
            if (id === 7 || id === 8 || id === 9) {
                newMonto = id === 7 ? '17500' : (id === 8 ? '5000' : '2700');
                const montoInput = document.getElementById('monto-input');
                if (montoInput) montoInput.setAttribute('readonly', 'readonly');
            } else if (id === 10) {
                newMonto = '-';
                const montoInput = document.getElementById('monto-input');
                if (montoInput) montoInput.removeAttribute('readonly');
            } else {
                const montoInput = document.getElementById('monto-input');
                if (montoInput) montoInput.removeAttribute('readonly');
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

    const handleAbonoSelection = (id) => {
        setSelectedAbonos((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((abonoId) => abonoId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const calculateAbonoTotal = () => {
        return selectedAbonos.reduce((total, id) => {
            const abono = abonos.find((a) => a.IdAbono === id);
            return abono ? total + abono.MontoAbono : total;
        }, 0);
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
            const abonoTotal = calculateAbonoTotal();

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

                if (abonoTotal > 0) {
                    if (abonoTotal >= montoFinal) {
                        // Eliminar abonos usados y registrar nuevo abono si hay exceso
                        for (const id of selectedAbonos) {
                            await fetch(`http://localhost:4000/abono/${id}`, { method: 'DELETE' });
                        }

                        if (abonoTotal > montoFinal) {
                            const exceso = abonoTotal - montoFinal;
                            const abonoExcesoData = {
                                IdUsuario: formData.IdUsuario,
                                FechaAbono: fechaPagoFinal,
                                MontoAbono: exceso
                            };

                            await createAbono(abonoExcesoData);
                        }
                    } else {
                        // Eliminar abonos usados
                        for (const id of selectedAbonos) {
                            await fetch(`http://localhost:4000/abono/${id}`, { method: 'DELETE' });
                        }
                    }
                }
            } else {
                alert("Error al crear el cobro y el pago");
            }
        }
    };

    const abonoTotal = calculateAbonoTotal();
    const montoTotal = parseFloat(formData.Monto) - abonoTotal;

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
                        <br />
                        {abonos && abonos.length > 0 && (
                            <div>
                                <h3>Seleccionar Abonos</h3>
                                {abonos.map((abono) => (
                                    <div key={abono.IdAbono}>
                                        <input
                                            type="checkbox"
                                            value={abono.IdAbono}
                                            checked={selectedAbonos.includes(abono.IdAbono)}
                                            onChange={() => handleAbonoSelection(abono.IdAbono)}
                                        />
                                        <label>
                                            {`Monto: ${abono.MontoAbono}, Fecha: ${new Date(abono.FechaAbono).toLocaleDateString()}`}
                                        </label>
                                    </div>
                                ))}
                                <p>Total de abonos seleccionados: {abonoTotal}</p>
                                <p>Monto total a cobrar después de abonos: {montoTotal < 0 ? 0 : montoTotal}</p>
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
