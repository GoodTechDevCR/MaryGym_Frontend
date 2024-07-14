import React, { useState } from 'react';
import PaisesTelefono from '../ui/PaisesTelefono';
import useCreateAnything from '../../hooks/useCreateAnything';
import DatePickerPrueba from "../datePicker/DatePickerPrueba";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContactoEmergenciaInsertar from './ContactoEmergenciaInsertar';

function UsuarioInsertar() {
    const { createAnything} = useCreateAnything('https://marygymbackend-production.up.railway.app/usuario');
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        Password: '123',
        Telefono: '',
        Correo: '',
        Estado: 'activo',
        Pais: '',
        CodigoPais: '',
        FechaNacimiento: '',
        Comentario: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCountryChange = (event, value) => {
        setFormData({
            ...formData,
            Pais: value ? value.label : '',
            CodigoPais: value ? value.phone : ''
        });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, FechaNacimiento: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let key in formData) {
            if (formData[key] === '' && key !== 'Comentario') {
                alert('Error: Todos los campos deben de estar llenos');
                return;
            }
        }

        const telefonoCompleto = `${formData.CodigoPais}${formData.Telefono}`;
        const estadoNumerico = formData.Estado === 'activo' ? 1 : 0;
        const fechaNacimientoFinal = formData.FechaNacimiento.toISOString().split('T')[0];

        const jsonData = {
            ...formData,
            Telefono: telefonoCompleto,
            Estado: estadoNumerico,
            FechaNacimiento: fechaNacimientoFinal
        };
        delete jsonData.CodigoPais;
        delete jsonData.Pais;

        try {
            const success = await createAnything(jsonData);
            if (success.success) {
                alert("Usuario Creado Exitosamente");
                setStep(2);
            } else {
                alert("Error al crear el Usuario:", success.error);
            }
        } catch (error) {
            console.error("Error al crear el Usuario:", error);
            alert("Error al crear el Usuario");
        }
    };

    return (
        <div>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <h1 className='black' style={{ fontSize: '3rem' }}>Registro de usuarios</h1>
            </Box>
            {step === 1 && (
                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
                    <Typography className='black' variant="h4" gutterBottom textAlign="center">Información del Usuario</Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type="text"
                            name="Nombre"
                            label="Nombre"
                            value={formData.Nombre}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type="text"
                            name="Apellido"
                            label="Apellido"
                            value={formData.Apellido}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type="email"
                            name="Correo"
                            label="Correo"
                            value={formData.Correo}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <PaisesTelefono onCountryChange={handleCountryChange} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type="text"
                            name="Telefono"
                            label="Teléfono"
                            value={formData.Telefono}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1">Estado:</Typography>
                        <TextField
                            select
                            name="Estado"
                            value={formData.Estado}
                            onChange={handleInputChange}
                            SelectProps={{ native: true }}
                            fullWidth
                        >
                            <option value="activo">Activo</option>
                            <option value="noActivo">No Activo</option>
                        </TextField>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1">Fecha de nacimiento:</Typography>
                        <DatePickerPrueba onDateChange={handleDateChange} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type="text"
                            name="Comentario"
                            label="Comentario"
                            value={formData.Comentario}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Enviar
                        </Button>
                    </Box>
                </Box>
            )}

            {step === 2 && (
                <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
                    <ContactoEmergenciaInsertar correo={formData.Correo} />
                </Box>
            )}
        </div>
    );
}

export default UsuarioInsertar;
