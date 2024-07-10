import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Box from '@mui/material/Box';
import SelectSingleUsuarioByName from '../../../components/ui/selectSingle/selectSingleUsuarioByName';
import DatePickerPrueba from '../../../components/datePicker/DatePickerPrueba';
import SelectSingleEjercicioByName from '../../../components/ui/selectSingle/SelectSingleEjercicioByName';
import HeadAdmin from '../../../components/Header/HeadAdmin';
import Foot from '../../../components/Footer/Foot';

const CrearRutinaSc = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        usuario: "",
        fechaInicio: null,
        fechaFin: null,
        cantSemana: 0,
        fechaPago: null,
        initialComment: "",
        finalComment: ""
    });

    /*const [formData, setFormData] = useState({
        usuario: "12345",
        fechaInicio: new Date(),
        fechaFin: new Date(new Date().setDate(new Date().getDate() + 7 * 4)), // 4 weeks from now
        cantSemana: 4,
        fechaPago: new Date(),
        initialComment: "",
        finalComment: ""

    });*/

    const [funcionalidades, setFuncionalidades] = useState([]);

    
    const [addInitialComment, setAddInitialComment] = useState(false);
    const [initialComment, setInitialComment] = useState('');
    const [addFinalComment, setAddFinalComment] = useState(false);
    const [finalComment, setFinalComment] = useState('');

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
            funcionalidades,
            initialComment: addInitialComment ? initialComment : '',
            finalComment: addFinalComment ? finalComment : ''
        };

        console.log("Dataaaaa: ", jsonData);

        // Envía los datos al backend para generar el PDF
        const response = await fetch('https://marygymbackend-production.up.railway.app/servicioAPI/generarPDF', {
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

    const handleCheckboxChangeInitial = (e) => {
        setAddInitialComment(e.target.checked);
    };

    const handleCheckboxChangeFinal = (e) => {
        setAddFinalComment(e.target.checked);
    };

    const handleInitialCommentChange = (e) => {
        setInitialComment(e.target.value);
    };

    const handleFinalCommentChange = (e) => {
        setFinalComment(e.target.value);
    };
    
    return (
        <div>
        <HeadAdmin/>
        <div className='centered-title2'>
            <h1 className='black'>Crear Rutina</h1>
            <br/>
            {step === 1 && (
                <form onSubmit={handleSubmitInitial}>
                    <h3>Información Inicial</h3>
                    <label className='elemento2'> Seleccione el usuario al que pertenece la rutina </label>
                    <label className='elemento2'> <SelectSingleUsuarioByName onUsuarioChange={handleUsuarioChange} /> </label>    
                    <label className='elemento2'> Seleccione la fecha de inicio de la Rutina </label>   
                    <label className='elemento2'> 
                        <DatePickerPrueba
                            selected={formData.fechaInicio}
                            onDateChange={(date) => handleDateChange('fechaInicio', date)}
                        />
                    </label>
                    <label className='elemento2'> Seleccione la cantidad de semanas de la Rutina</label>
                    <label className='elemento2'> 
                        <input
                            type="number"
                            name="cantSemana"
                            value={formData.cantSemana}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className='elemento2'>  Seleccione la fecha de pago del cliente </label>
                    <label className='elemento2'> 
                        <DatePickerPrueba
                            selected={formData.fechaInicio}
                            onDateChange={(date) => handleFechaPago(date)}
                        />
                    </label>
                    <label className='elemento2'> 
                        <button type="submit" className='black-button'>Guardar Información Inicial</button>
                    </label>
                    <label className='elemento2'> </label>

                    
                    <br/><br/><br/><br/><br/>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <h2>Agregar Funcionalidades y Ejercicios</h2>
                    <div className='elemento2'>
                        <label>
                            <input
                                type="checkbox"
                                checked={addInitialComment}
                                onChange={handleCheckboxChangeInitial}
                            />
                            Agregar un comentario inicial
                        </label>
                        {addInitialComment && (
                            <input
                                type="text"
                                placeholder="Comentario inicial"
                                value={initialComment}
                                onChange={handleInitialCommentChange}
                            />
                        )}
                        
                    </div>
                    {funcionalidades.map((funcionalidad, indexFuncionalidad) => (
                        <Box key={indexFuncionalidad}
                             sx={{
                                 border: '5px solid grey',
                                 borderRadius: '8px',
                                 backgroundColor: '#f9f9f9',
                                 maxWidth: 750,
                                 margin: 2
                             }}
                        >
                            <label>
                                <input
                                    placeholder="Funcionalidad"
                                    type="text"
                                    name="nombreFuncionalidad"
                                    value={funcionalidad.nombreFuncionalidad}
                                    onChange={(e) => handleFuncionalidadChange(indexFuncionalidad, e)}
                                />
                            </label>
                            <button type="button" className='delete-button'
                                    onClick={() => handleRemoveFuncionalidad(indexFuncionalidad)}>
                                Borrar Funcionalidad
                            </button>
                            <div className='elemento2'>
                                <button type="button" className='black-button'
                                        onClick={() => handleAddEjercicio(indexFuncionalidad)}>
                                    Agregar Ejercicio
                                </button>
                            </div>

                            {funcionalidad.ejercicios.map((ejercicio, indexEjercicio) => (
                                <Box key={indexEjercicio}
                                     sx={{
                                         border: '2px solid grey',
                                         borderRadius: '8px',
                                         backgroundColor: '#f9f9f9',
                                         maxWidth: 700,
                                         margin: 3
                                     }}>
                                    <label className='elemento'>
                                        <SelectSingleEjercicioByName
                                            onEjercicioChange={(value) => handleEjercicioChange(indexFuncionalidad, indexEjercicio, value)}
                                        />
                                        <button type="button" className='delete-button'
                                                onClick={() => handleRemoveEjercicio(indexFuncionalidad, indexEjercicio)}>
                                            Borrar ejercicio
                                        </button>
                                    </label>

                                    <label className='elemento'>

                                        <input
                                            type="text"
                                            placeholder='Comentario'
                                            name="comentario"
                                            value={ejercicio.comentario}
                                            onChange={(e) => handleComentarioChange(indexFuncionalidad, indexEjercicio, e)}
                                        />
                                    </label>
                                    {Array.from({length: formData.cantSemana}, (_, i) => (
                                        <label key={`semana${i + 1}`} className='elemento'>

                                            <input sx={{margin: 2}}
                                                   type="text"
                                                   placeholder={`Semana ${i + 1}`}
                                                   name={`semana${i + 1}`}
                                                   value={ejercicio[`semana${i + 1}`]}
                                                   onChange={(e) => handleSemanaChange(indexFuncionalidad, indexEjercicio, e)}
                                            />
                                        </label>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    ))}
                    <div className='centered-title2'>
                        <button type="button" className='black-button' onClick={handleAddFuncionalidad}> Agregar
                            Funcionalidad
                        </button>
                    </div>
                    <div className='comentarioFinal'>
                        <label>
                            <input
                                type="checkbox"
                                checked={addFinalComment}
                                onChange={handleCheckboxChangeFinal}
                            />
                            Agregar un comentario final
                        </label>
                        {addFinalComment && (
                            <input
                                type="text"
                                placeholder="Comentario final"
                                value={finalComment}
                                onChange={handleFinalCommentChange}
                            />
                        )}
                        
                    </div>
                    <div className='centered-title2'>
                        <button type="submit" className='black-button'>Guardar Rutina</button>
                    </div>


                </form>
                )}
        </div>
            <Foot/>
        </div>
    );
};

export default CrearRutinaSc;
