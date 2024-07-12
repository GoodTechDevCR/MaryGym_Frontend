import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Box from '@mui/material/Box';
import SelectSingleUsuarioByName from '../../../components/ui/selectSingle/selectSingleUsuarioByName';
import DatePickerPrueba from '../../../components/datePicker/DatePickerPrueba';
import SelectSingleEjercicioByName from '../../../components/ui/selectSingle/SelectSingleEjercicioByName';
import HeadAdmin from '../../../components/Header/HeadAdmin';
import Foot from '../../../components/Footer/Foot';
import UseConsultaUsuarioByCorreo from '../../../hooks/usuarioHooks/useConsultaUsuarioByCorreo';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
 
const CrearRutinaSc = () => {
    const [step, setStep] = useState(1);
    const [routineData, setRoutineData] = useState({
        idUsuario: null,
        json: null
    });
    const [formData, setFormData] = useState({
        usuario: "", // Almacena el ID del usuario
        fechaInicio: null,
        fechaFin: null,
        cantSemana: 0,
        fechaPago: null,
        initialComment: "",
        finalComment: ""
    });
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

    const handleUsuarioChange = (id, correo) => {
        setFormData({ ...formData, usuario: correo });
        setRoutineData({ idUsuario: id});
        console.log("ID: ", routineData);
        console.log("correo: ", correo);
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
        
        console.log("JSON 111: ", jsonData);

        if (!response.ok) {
            throw new Error('Error generando el PDF');
        }

            // Convierte la respuesta en un blob
            const blob = await response.blob();

            // Guarda el PDF en el navegador
            saveAs(blob, `rutina_${formData.usuario}.pdf`);

            console.log("JSON: ", jsonData);
            setRoutineData({
                ...routineData,
                json: jsonData
            });
            console.log("Datos rutina x usuario: ", routineData);

            const rutinaXusuario = await fetch('https://marygymbackend-production.up.railway.app/rutinaXusuario/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(routineData),
            });
    
            if (!rutinaXusuario.ok) {
                throw new Error('Error almacenando la rutina al usuario');
            }


        
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
        <HeadAdmin />
        <div >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <h1 className='black' style={{ fontSize: '3rem' }}> Crear Rutina</h1>
            </Box>
            {step === 1 && (
                <Box component="form" onSubmit={handleSubmitInitial} sx={{ maxWidth: '600px', margin: 'auto', justifyContent: 'center', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
                    <h1 className='black' style={{ fontSize: '2rem' }}> Información Inicial</h1>
                <Box sx={{ mb: 2 }}>
                    <p style={{ fontSize: '1.2rem', marginTop: '10px' }}> Seleccione el usuario al que pertenece la rutina: </p>
                    <SelectSingleUsuarioByName onUsuarioChange={handleUsuarioChange} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <p style={{ fontSize: '1.2rem', marginTop: '10px' }}> Seleccione la fecha de inicio de la rutina: </p>
                    <DatePickerPrueba
                    selected={formData.fechaInicio}
                    onDateChange={(date) => handleDateChange('fechaInicio', date)}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <p style={{ fontSize: '1.2rem', marginTop: '10px' }}> Seleccione la cantidad de semanas de la rutina: </p>
                    <TextField
                    type="number"
                    name="cantSemana"
                    value={formData.cantSemana}
                    onChange={handleInputChange}
                    fullWidth
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <p style={{ fontSize: '1.2rem', marginTop: '10px' }}> Seleccione la fecha de pago del cliente: </p>
                    <DatePickerPrueba
                    selected={formData.fechaInicio}
                    onDateChange={(date) => handleFechaPago(date)}
                    />
                </Box>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <Button type="submit" variant="contained" color="primary" className='black-button'>
                    Guardar Información Inicial
                    </Button>
                </Box>
                </Box>
            )}

             (

      {step === 2 && (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '800px', margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
          <h1 className='black' style={{ fontSize: '2rem' }}>Agregar funcionalidades y ejercicios</h1>
          <Box sx={{ mb: 2 }}>
            <Checkbox checked={addInitialComment} onChange={handleCheckboxChangeInitial} />
            <Typography variant="body1" component="span">
              Agregar un comentario inicial
            </Typography>
            {addInitialComment && (
              <TextField
                type="text"
                placeholder="Comentario inicial"
                value={initialComment}
                onChange={handleInitialCommentChange}
                fullWidth
                sx={{ mt: 1 }}
              />
            )}
          </Box>
          {funcionalidades.map((funcionalidad, indexFuncionalidad) => (
            <Box key={indexFuncionalidad} sx={{ border: '1px solid grey', borderRadius: '8px', backgroundColor: '#f9f9f9', padding: '16px', mb: 2 }}>
              <TextField
                placeholder="Funcionalidad"
                type="text"
                name="nombreFuncionalidad"
                value={funcionalidad.nombreFuncionalidad}
                onChange={(e) => handleFuncionalidadChange(indexFuncionalidad, e)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button type="button" variant="contained" color="secondary" onClick={() => handleRemoveFuncionalidad(indexFuncionalidad)}>
                  Borrar Funcionalidad
                </Button>
                <Button type="button" variant="contained" color="primary" onClick={() => handleAddEjercicio(indexFuncionalidad)}>
                  Agregar Ejercicio
                </Button>
              </Box>
              {funcionalidad.ejercicios.map((ejercicio, indexEjercicio) => (
                <Box key={indexEjercicio} sx={{ border: '1px solid grey', borderRadius: '8px', backgroundColor: '#f9f9f9', padding: '16px', mb: 2 }}>
                  <SelectSingleEjercicioByName
                    onEjercicioChange={(value) => handleEjercicioChange(indexFuncionalidad, indexEjercicio, value)}
                    sx={{ flex: 1 }}
                  />
                  <Button type="button" variant="contained" color="secondary" sx={{ mb: 2 }} onClick={() => handleRemoveEjercicio(indexFuncionalidad, indexEjercicio)}>
                    Borrar ejercicio
                  </Button>
                  <TextField
                    type="text"
                    placeholder="Comentario"
                    name="comentario"
                    value={ejercicio.comentario}
                    onChange={(e) => handleComentarioChange(indexFuncionalidad, indexEjercicio, e)}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                  {Array.from({ length: formData.cantSemana }, (_, i) => (
                    <TextField
                      key={`semana${i + 1}`}
                      type="text"
                      placeholder={`Semana ${i + 1}`}
                      name={`semana${i + 1}`}
                      value={ejercicio[`semana${i + 1}`]}
                      onChange={(e) => handleSemanaChange(indexFuncionalidad, indexEjercicio, e)}
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  ))}
                </Box>
              ))}
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button type="button" variant="contained" color="primary" onClick={handleAddFuncionalidad}>
              Agregar Funcionalidad
            </Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Checkbox checked={addFinalComment} onChange={handleCheckboxChangeFinal} />
            <Typography variant="body1" component="span">
              Agregar un comentario final
            </Typography>
            {addFinalComment && (
              <TextField
                type="text"
                placeholder="Comentario final"
                value={finalComment}
                onChange={handleFinalCommentChange}
                fullWidth
                sx={{ mt: 1 }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Guardar Rutina
            </Button>
          </Box>
        </Box>
      )}
        </div>
            <Foot/>
        </div>
    );
};

export default CrearRutinaSc;