import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import PrincipalMenu from '../../../components/menu/PrincipalMenu';
import SelectSingleUsuarioByName from '../../../components/ui/selectSingle/selectSingleUsuarioByName';
import DatePickerPrueba from '../../../components/datePicker/DatePickerPrueba';
import SelectSingleEjercicioByName from '../../../components/ui/selectSingle/SelectSingleEjercicioByName';

const CrearRutinaSc = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        usuario: "",
        fechaInicio: null,
        fechaFin: null,
        cantSemana: 0,
        fechaPago: null
    });

    const [funcionalidades, setFuncionalidades] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newFormData = { ...prevData, [name]: value };
            if (name === 'cantSemana' && newFormData.fechaInicio) {
                newFormData.fechaFin = calcularFechaFin(newFormData.fechaInicio, value);
            }
            return newFormData;
        });
    };

    const handleFechaPago = (date) => {
        const dateFix = date.toISOString().split('T')[0];
        setFormData({...formData,fechaPago: dateFix })
    }

    const handleUsuarioChange = (id) => {
        setFormData({ ...formData, usuario: id });
    };

    const handleDateChange = (name, date) => {
        setFormData((prevData) => {
            const newFormData = { ...prevData, [name]: date };
            if (name === 'fechaInicio' && newFormData.cantSemana) {
                newFormData.fechaFin = calcularFechaFin(date, newFormData.cantSemana);
            }
            return newFormData;
        });
    };

    const calcularFechaFin = (fechaInicio, cantSemana) => {
        const fechaInicioDate = new Date(fechaInicio);
        const diasAdicionales = cantSemana * 7;
        const fechaFinDate = new Date(fechaInicioDate);
        fechaFinDate.setDate(fechaFinDate.getDate() + diasAdicionales);
        return fechaFinDate;
    };

    const handleAddFuncionalidad = () => {
        const nuevaFuncionalidad = {
            nombreFuncionalidad: "",
            ejercicios: []
        };
        setFuncionalidades([...funcionalidades, nuevaFuncionalidad]);
    };

    const handleRemoveFuncionalidad = (index) => {
        setFuncionalidades(funcionalidades.filter((_, i) => i !== index));
    };

    const handleFuncionalidadChange = (index, e) => {
        const { name, value } = e.target;
        const nuevasFuncionalidades = [...funcionalidades];
        nuevasFuncionalidades[index][name] = value;
        setFuncionalidades(nuevasFuncionalidades);
    };

    const handleEjercicioChange = (indexFuncionalidad, indexEjercicio, newValue) => {
        const nuevasFuncionalidades = [...funcionalidades];
        nuevasFuncionalidades[indexFuncionalidad].ejercicios[indexEjercicio].nombreEjercicio = newValue;
        setFuncionalidades(nuevasFuncionalidades);
    };

    const handleAddEjercicio = (indexFuncionalidad) => {
        const nuevoEjercicio = {
            nombreEjercicio: "",
            comentario: "",
            ...Array.from({ length: formData.cantSemana }, (_, i) => ({
                [`semana${i + 1}`]: ""
            })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
        };

        const nuevasFuncionalidades = [...funcionalidades];
        nuevasFuncionalidades[indexFuncionalidad].ejercicios.push(nuevoEjercicio);
        setFuncionalidades(nuevasFuncionalidades);
    };

    const handleRemoveEjercicio = (indexFuncionalidad, indexEjercicio) => {
        const nuevasFuncionalidades = [...funcionalidades];
        nuevasFuncionalidades[indexFuncionalidad].ejercicios = nuevasFuncionalidades[indexFuncionalidad].ejercicios.filter((_, i) => i !== indexEjercicio);
        setFuncionalidades(nuevasFuncionalidades);
    };

    const handleComentarioChange = (indexFuncionalidad, indexEjercicio, e) => {
        const { name, value } = e.target;
        const nuevasFuncionalidades = [...funcionalidades];
        nuevasFuncionalidades[indexFuncionalidad].ejercicios[indexEjercicio][name] = value;
        setFuncionalidades(nuevasFuncionalidades);
    };

    const handleSemanaChange = (indexFuncionalidad, indexEjercicio, e) => {
        const { name, value } = e.target;
        const nuevasFuncionalidades = [...funcionalidades];
        nuevasFuncionalidades[indexFuncionalidad].ejercicios[indexEjercicio][name] = value;
        setFuncionalidades(nuevasFuncionalidades);
    };

    const handleSubmitInitial = (e) => {
        e.preventDefault();
        const { fechaInicio, fechaFin, cantSemana } = formData;

        if (!fechaInicio || !fechaFin) {
            alert("Por favor, seleccione ambas fechas.");
            return;
        }

        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            alert("La fecha de inicio debe ser menor que la fecha de fin.");
            return;
        }

        if (cantSemana < 1) {
            alert("Mínimo debe haber una semana de trabajo.");
            return;
        }

        if (cantSemana > 5) {
            alert("El máximo permitido de semanas son cinco.");
            return;
        }

        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fechaInicioFinal = formData.fechaInicio.toISOString().split('T')[0];
        const fechaFinFinal = formData.fechaFin.toISOString().split('T')[0];

        const jsonData = {
            ...formData,
            fechaInicio: fechaInicioFinal,
            fechaFin: fechaFinFinal,
            funcionalidades
        };

        console.log("Dataaaaa: ", jsonData);

        // Envía los datos al backend para generar el PDF
        const response = await fetch('http://localhost:4000/servicioAPI/generarPDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error('Error generando el PDF');
        }

        // Convierte la respuesta en un blob
        const blob = await response.blob();

        // Guarda el PDF en el navegador
        saveAs(blob, `rutina_${formData.usuario}.pdf`);
    };

    return (
        <div>
            <PrincipalMenu />
            <h1>Crear Rutina</h1>

            {step === 1 && (
                <form onSubmit={handleSubmitInitial}>
                    <h2>Información Inicial</h2>
                    <label>
                        Seleccione el usuario al que pertenece la rutina
                        <SelectSingleUsuarioByName onUsuarioChange={handleUsuarioChange} />
                    </label>
                    <label>
                        Seleccione la fecha de inicio de la Rutina
                        <DatePickerPrueba
                            selected={formData.fechaInicio}
                            onDateChange={(date) => handleDateChange('fechaInicio', date)}
                        />
                    </label>
                    <br />
                    <label>
                        Seleccione la cantidad de semanas de la Rutina
                        <input
                            type="number"
                            name="cantSemana"
                            value={formData.cantSemana}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Seleccione la fecha de pago del cliente
                        <DatePickerPrueba
                            selected={formData.fechaInicio}
                            onDateChange={(date) => handleFechaPago(date)}
                        />
                    </label>
                    <button type="submit">Guardar Información Inicial</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <h2>Agregar Funcionalidades y Ejercicios</h2>
                    {funcionalidades.map((funcionalidad, indexFuncionalidad) => (
                        <div key={indexFuncionalidad}>
                            <label>
                                Nombre de la funcionalidad
                                <input
                                    type="text"
                                    name="nombreFuncionalidad"
                                    value={funcionalidad.nombreFuncionalidad}
                                    onChange={(e) => handleFuncionalidadChange(indexFuncionalidad, e)}
                                />
                            </label>
                            <button type="button" onClick={() => handleRemoveFuncionalidad(indexFuncionalidad)}>
                                Borrar Funcionalidad
                            </button>
                            <button type="button" onClick={() => handleAddEjercicio(indexFuncionalidad)}>
                                Agregar Ejercicio
                            </button>
                            {funcionalidad.ejercicios.map((ejercicio, indexEjercicio) => (
                                <div key={indexEjercicio}>
                                    <label>
                                        Nombre del ejercicio
                                        <SelectSingleEjercicioByName
                                            onEjercicioChange={(value) => handleEjercicioChange(indexFuncionalidad, indexEjercicio, value)}
                                        />
                                    </label>
                                    <button type="button" onClick={() => handleRemoveEjercicio(indexFuncionalidad, indexEjercicio)}>
                                        Borrar Ejercicio
                                    </button>
                                    <label>
                                        Comentario
                                        <input
                                            type="text"
                                            name="comentario"
                                            value={ejercicio.comentario}
                                            onChange={(e) => handleComentarioChange(indexFuncionalidad, indexEjercicio, e)}
                                        />
                                    </label>
                                    {Array.from({ length: formData.cantSemana }, (_, i) => (
                                        <label key={`semana${i + 1}`}>
                                            Semana {i + 1}
                                            <input
                                                type="text"
                                                name={`semana${i + 1}`}
                                                value={ejercicio[`semana${i + 1}`]}
                                                onChange={(e) => handleSemanaChange(indexFuncionalidad, indexEjercicio, e)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddFuncionalidad}>
                        Agregar Funcionalidad
                    </button>
                    <button type="submit">Guardar Rutina</button>
                </form>
            )}
        </div>
    );
};

export default CrearRutinaSc;
