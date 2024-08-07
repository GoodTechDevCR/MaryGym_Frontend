import React, { useState, useEffect } from 'react';
import SelectSingleUsuario from "../ui/selectSingle/SelectSingleUsuario";
import SelectSingleTipoTran from "../ui/selectSingle/SelectSingleTipoTran";
import DatePickerPrueba from "../datePicker/DatePickerPrueba";
import useCreateAnything from "../../hooks/useCreateAnything";
import useConsultaAbonos from "../../hooks/AbonoHooks/UseConsultaAbonos";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function PagoInsertar() {
    const { createAnything: createCobroYPago } = useCreateAnything('https://marygymbackend-production.up.railway.app/cobro/cobroypago');
    const { createAnything: createAbono } = useCreateAnything('https://marygymbackend-production.up.railway.app/abono');
    const { data: abonos, consultaAbonos } = useConsultaAbonos();
    const [selectedAbonos, setSelectedAbonos] = useState([]);
    const [notificacion, setNotificacion] = useState("");
    const navigate = useNavigate();

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
            setSelectedAbonos([]);
        }
    }, [formData.IdUsuario]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUsuarioChange = (id) => {
        setFormData({ ...formData, IdUsuario: id });
        setSelectedAbonos([]);
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
        setNotificacion("");
    
        // Catch para no mandar nada vacío 
        if (formData.IdUsuario === null) {
            alert("Error, debe de seleccionar un usuario");
            return;
        }
        if (formData.IdTipoTran === null) {
            alert("Error, debe de seleccionar un tipo de transaccion");
            return;
        }
        if (formData.IdTipoTran !== 11 && formData.Monto === '' && formData.Monto === '-') {
            alert("Error, debe de seleccionar un monto");
            return;
        }
        if (formData.IdTipoTran !== 11 && formData.FechaInicio === null) {
            alert("Error, debe de haber una fecha de inicio");
            return;
        }
        if (formData.IdTipoTran !== 11 && formData.FechaPago === null) {
            alert("Error, debe de haber una fecha de pago");
            return;
        }

        if(formData.IdTipoTran === 15 && formData.Monto === "-"){
            alert("Error, debe de digitar un monto para el precio especial")
            return;
        }

        if(formData.IdTipoTran === 15 && formData.Monto === ''){
            alert("Error, debe de digitar un monto para el precio especial")
            return;
        }
        //comprobaciones de precio especial
        if (formData.IdTipoTran === 15) {
            if (formData.OpcionSeleccionada === '') {
                alert("Error, debe de digitar una opción");
                return;
            }
            if (formData.OpcionSeleccionada === "DiasAdicionales" && formData.DiasAdicionales === '') {
                alert("Error, debe de digitar la cantidad de días adicionales");
                return;
            }
            if (formData.OpcionSeleccionada === "FechaFinalEspecial" && formData.FechaFinalEspecial === null) {
                alert("Error, debe de digitar la fecha final especial");
                return;
            }
        }
        
    
        try {
            if (formData.IdTipoTran === 11) {
                if (formData.MontoAbono === '') {
                    alert("Error, debe digitar una cantidad para el abono");
                    return;
                }
                if (formData.FechaAbono === null) {
                    alert("Error, debe digitar una fecha para el abono");
                    return;
                }
    
                const fechaAbonoFinal = formData.FechaAbono.toISOString().split('T')[0];
                const montoAbonoFinal = parseFloat(formData.MontoAbono);
    
                const abonoData = {
                    IdUsuario: formData.IdUsuario,
                    FechaAbono: fechaAbonoFinal,
                    MontoAbono: montoAbonoFinal
                };
    
    
                try {
                    const response = await fetch('https://marygymbackend-production.up.railway.app/abono', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(abonoData)
                    });
                
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error al crear abono');
                    }
                
                    const data = await response.json();
                    
                    if (data.success) {
                        alert("Abono registrado exitosamente");
                        navigate(`/admin/pago/visualizar`);
                    } else {
                        alert("Algo salió mal al registrar el abono");
                    }
                } catch (err) {
                    if (err.message.includes("Unexpected token 'A'")) {
                        alert("Abono registrado exitosamente");
                    } else {
                        alert(`Error: ${err.message}`);
                    }
                }
                    
            } else {
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
    
                const { success } = await createCobroYPago(jsonData);
    
                if (success) {
                    alert("Cobro y pago creados/actualizados exitosamente");
    
                    if (abonoTotal > 0) {
                        if (abonoTotal >= montoFinal) {
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
                            for (const id of selectedAbonos) {
                                await fetch(`https://marygymbackend-production.up.railway.app/abono/${id}`, { method: 'DELETE' });
                            }
                        }
                    }
    
                    //navigate(`/admin/pago/visualizar`);
                } else {
                    throw new Error('Error al crear el cobro y el pago');
                }
            }
        } catch (error) {
            console.error("Error en handleSubmit:", error);
            alert(`Error: ${error.message}`);
        }
    };
    

    const abonoTotal = calculateAbonoTotal();
    const montoTotal = parseFloat(formData.Monto) - abonoTotal;

    return (
        <Box sx={{paddingBottom: 9 }}>
        <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom textAlign="center">Formulario de Pago</Typography>
            {notificacion && <Typography variant="body1" textAlign="center" style={{ color: 'green', marginBottom: '20px' }}>{notificacion}</Typography>}
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <SelectSingleUsuario onUsuarioChange={handleUsuarioChange} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <SelectSingleTipoTran onTipoTranChange={handleTipoTranChange} />
                </Box>
                {formData.IdTipoTran !== 11 && (
                    <>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                id="monto-input"
                                placeholder='Monto'
                                type="text"
                                name="Monto"
                                value={formData.Monto}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom className='body3'> Fecha de inicio de Membresia: </Typography>
                            <DatePickerPrueba onDateChange={(date) => handleDateChange(date, 'FechaInicio')} />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom className='body3'> Fecha de pago: </Typography>
                            <DatePickerPrueba onDateChange={(date) => handleDateChange(date, 'FechaPago')} />
                        </Box>

                        {formData.IdTipoTran === 15 && (
                            <Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" gutterBottom className='body3'> Seleccione una opción: </Typography>
                                    <select name="OpcionSeleccionada" value={formData.OpcionSeleccionada} onChange={handleOpcionSeleccionadaChange}>
                                        <option value="">Seleccione</option>
                                        <option value="DiasAdicionales">Días adicionales</option>
                                        <option value="FechaFinalEspecial">Fecha final especial</option>
                                    </select>
                                </Box>
                                {formData.OpcionSeleccionada === 'DiasAdicionales' && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" gutterBottom className='body3'> Digite la cantidad de días adicionales: </Typography>
                                        <TextField
                                            placeholder='Días adicionales'
                                            type="number"
                                            name="DiasAdicionales"
                                            value={formData.DiasAdicionales}
                                            onChange={handleDiasAdicionalesChange}
                                            fullWidth
                                        />
                                    </Box>
                                )}
                                {formData.OpcionSeleccionada === 'FechaFinalEspecial' && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" gutterBottom className='body3'> Fecha final especial: </Typography>
                                        <DatePickerPrueba onDateChange={handleFechaFinalEspecialChange} />
                                    </Box>
                                )}
                            </Box>
                        )}

                        {abonos && abonos.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" gutterBottom textAlign="center">Seleccionar Abonos</Typography>
                                {abonos.map((abono) => (
                                    <Box key={abono.IdAbono} sx={{ mb: 1 }}>
                                        <input
                                            type="checkbox"
                                            value={abono.IdAbono}
                                            checked={selectedAbonos.includes(abono.IdAbono)}
                                            onChange={() => handleAbonoSelection(abono.IdAbono)}
                                        />
                                        <label>
                                            {`Monto: ${abono.MontoAbono}, Fecha: ${new Date(abono.FechaAbono).toLocaleDateString()}`}
                                        </label>
                                    </Box>
                                ))}
                                <Typography variant="body1" gutterBottom textAlign="center">Total de abonos seleccionados: {abonoTotal}</Typography>
                                <Typography variant="body1" gutterBottom textAlign="center">Monto total a cobrar después de abonos: {montoTotal < 0 ? 0 : montoTotal}</Typography>
                            </Box>
                        )}
                    </>
                )}
                {formData.IdTipoTran === 11 && (
                    <Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                placeholder='Monto del abono'
                                type="text"
                                name="MontoAbono"
                                value={formData.MontoAbono}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom className='body3'> Fecha del Abono: </Typography>
                            <DatePickerPrueba onDateChange={handleFechaAbonoChange} />
                        </Box>
                    </Box>
                )}

                <Button type="submit" variant="contained" className='black-button' fullWidth>Guardar</Button>
            </form>
        </Box>
        </Box>
    );
}

export default PagoInsertar;
