import React, { useState, useEffect } from 'react';
import SelectSingleUsuario from "../ui/selectSingle/SelectSingleUsuario";
import SelectSingleTipoTran from "../ui/selectSingle/SelectSingleTipoTran";
import DatePickerPrueba from "../datePicker/DatePickerPrueba";
import useCreateAnything from "../../hooks/useCreateAnything";
import useConsultaAbonos from "../../hooks/AbonoHooks/UseConsultaAbonos";

function PagoInsertar() {
    const { createAnything: createCobroYPago } = useCreateAnything('https://marygymbackend-production.up.railway.app/cobro/cobroypago');
    const { createAnything: createAbono } = useCreateAnything('https://marygymbackend-production.up.railway.app/abono');
    const { data: abonos, loading, error, consultaAbonos } = useConsultaAbonos(); // Usa el hook correctamente
    const [selectedAbonos, setSelectedAbonos] = useState([]);
    const [notificacion, setNotificacion] = useState("");

    const [formData, setFormData] = useState({
        IdUsuario: null,
        Monto: '',
        FechaInicio: null,
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
            if (id === 12 || id === 13 || id === 14) {
                newMonto = id === 12 ? '17500' : (id === 13 ? '5000' : '2700');
                const montoInput = document.getElementById('monto-input');
                if (montoInput) montoInput.setAttribute('readonly', 'readonly');
            } else if (id === 15) {
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

    const handleDateChange = (date, field) => {
        setFormData({ ...formData, [field]: date });
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
        setNotificacion(""); // Reset notification
    
        if (formData.IdTipoTran ===11) {
            // Registro de abono
            const fechaAbonoFinal = formData.FechaAbono.toISOString().split('T')[0];
            const montoAbonoFinal = parseFloat(formData.MontoAbono);
    
            const abonoData = {
                IdUsuario: formData.IdUsuario,
                FechaAbono: fechaAbonoFinal,
                MontoAbono: montoAbonoFinal
            };
    
            const { success, error } = await createAbono(abonoData);
    
            if (success) {
                alert("Abono registrado exitosamente");
            } else {
                alert(`Error al registrar el abono: ${error.message}`);
            }
        } else {
            // Registro de cobro y pago
            const fechaInicioFinal = formData.FechaInicio.toISOString().split('T')[0];
            const fechaPagoFinal = formData.FechaPago.toISOString().split('T')[0];
            const montoFinal = parseFloat(formData.Monto);
            const abonoTotal = calculateAbonoTotal();
    
            const jsonData = {
                IdUsuario: formData.IdUsuario,
                Monto: montoFinal,
                FechaInicio: fechaInicioFinal,
                FechaPago: fechaPagoFinal,
                IdTipoTran: formData.IdTipoTran,
                DiasAdicionales: formData.DiasAdicionales ? parseInt(formData.DiasAdicionales) : null,
                FechaFinalEspecial: formData.FechaFinalEspecial ? formData.FechaFinalEspecial.toISOString().split('T')[0] : null
            };
    
            const { success, error } = await createCobroYPago(jsonData);
    
            if (success) {
                alert("Cobro y pago creados/actualizados exitosamente");
    
                if (abonoTotal > 0) {
                    if (abonoTotal >= montoFinal) {
                        // Eliminar abonos usados y registrar nuevo abono si hay exceso
                        for (const id of selectedAbonos) {
                            await fetch(`https://marygymbackend-production.up.railway.app/abono/${id}`, { method: 'DELETE' });
                        }
    
                        if (abonoTotal > montoFinal) {
                            const exceso = abonoTotal - montoFinal;
                            const abonoExcesoData = {
                                IdUsuario: formData.IdUsuario,
                                FechaAbono: fechaPagoFinal,
                                MontoAbono: exceso
                            };
    
                            await createAbono(abonoExcesoData);
                            setNotificacion(`Se creo un nuevo abono con el sobrante de este pago, el monto es ${exceso}`);
                        }
                    } else {
                        // Eliminar abonos usados
                        for (const id of selectedAbonos) {
                            await fetch(`https://marygymbackend-production.up.railway.app/abono/${id}`, { method: 'DELETE' });
                        }
                    }
                }
            } else {
                alert(`Error al crear el cobro y el pago: ${error.message}`);
            }
        }
    };       

    const abonoTotal = calculateAbonoTotal();
    const montoTotal = parseFloat(formData.Monto) - abonoTotal;

    return (
        <div className='centered-title2'>
            <h1 className="black">Formulario de Pago </h1>
            {notificacion && <p style={{ color: 'green' }}>{notificacion}</p>}
            <form onSubmit={handleSubmit}>
                <div className='elemento2'> <SelectSingleUsuario onUsuarioChange={handleUsuarioChange} /> </div>
                <div className='elemento2'> <SelectSingleTipoTran onTipoTranChange={handleTipoTranChange} /> </div>
                {formData.IdTipoTran !== 11 && (
                    <>
                        <div className='elemento2'>
                            <label>
                            <div className='body3'> Monto: </div> 
                                <input
                                    id="monto-input"
                                    placeholder='Monto'
                                    type="text"
                                    name="Monto"
                                    value={formData.Monto}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className='elemento2'>
                            <div className='body3'> Fecha de inicio de Membresia: </div> 
                            <DatePickerPrueba onDateChange={(date) => handleDateChange(date, 'FechaInicio')} /> 
                        </div>
                        <div className='elemento2'> 
                            <div className='body3'> Fecha de pago: </div> 
                            <DatePickerPrueba onDateChange={(date) => handleDateChange(date, 'FechaPago')} /> 
                        </div>
                        
                        {formData.IdTipoTran === 15 && (
                            <div>
                                <label className='elemento2'>
                                    <div className='body3'> Seleccione una opción: </div>
                                    <select name="OpcionSeleccionada" value={formData.OpcionSeleccionada} onChange={handleOpcionSeleccionadaChange}>
                                        <option value="">Seleccione</option>
                                        <option value="DiasAdicionales">Días adicionales</option>
                                        <option value="FechaFinalEspecial">Fecha final especial</option>
                                    </select>
                                </label>
                                {formData.OpcionSeleccionada === 'DiasAdicionales' && (
                                    <label className='elemento2'>
                                        <div className='body3'> Digite la cantidad de dias adicionales</div>
                                        <input
                                            placeholder='Dias adicionales'
                                            type="number"
                                            name="DiasAdicionales"
                                            value={formData.DiasAdicionales}
                                            onChange={handleDiasAdicionalesChange}
                                        />
                                    </label>
                                )}
                                {formData.OpcionSeleccionada === 'FechaFinalEspecial' && (
                                    <label className='elemento2'>
                                        <div className='body3'> Fecha final especial:</div>
                                        <DatePickerPrueba onDateChange={handleFechaFinalEspecialChange} />
                                    </label>
                                )}
                            </div>
                        )}
                       
                        {abonos && abonos.length > 0 && (
                            <div className='centered-title'>
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
                {formData.IdTipoTran === 11 && (
                    <div>
                        <label className='elemento2'>
                            <input
                                placeholder='Monto del abono'
                                type="text"
                                name="MontoAbono"
                                value={formData.MontoAbono}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className='elemento2'>
                            <div className='body3'> Fecha del Abono: </div>
                            <DatePickerPrueba onDateChange={handleFechaAbonoChange} />
                        </label>
                    </div>
                )}
                
                <button type="submit" className='black-button'>Guardar</button>
            </form>
        </div>
    );
}

export default PagoInsertar;
