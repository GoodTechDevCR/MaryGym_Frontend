import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TablaContactoEmergencia from '../../../components/showData/TableContactoEmergencia';
import SelectSingleRelacion from '../../../components/ui/selectSingle/SelectSingleRelacion';
import useCreateAnything from '../../../hooks/useCreateAnything';
import HeadAdmin from "../../../components/Header/HeadAdmin";
import Foot from "../../../components/Footer/Foot";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../../Home/Home.css";

function VisualizarContactoEmergencia() {
    const { createAnything } = useCreateAnything('https://marygymbackend-production.up.railway.app/contactoEme/unico');
    const { id } = useParams();
    
    // Estado inicial con los campos necesarios
    const [formData, setFormData] = useState({
        IdUsuario: id,
        Nombre: '',
        NumeroTelefono: '',
        Relacion: '',
    });

    // Manejar el cambio de nombre
    const handleNombreChange = (event) => {
        setFormData({
            ...formData,
            Nombre: event.target.value,
        });
    };

    // Manejar el cambio de teléfono
    const handleTelefonoChange = (event) => {
        setFormData({
            ...formData,
            NumeroTelefono: event.target.value,
        });
    };

    // Manejar el cambio de relación
    const handleRelacionChange = (relacion) => {
        setFormData({
            ...formData,
            Relacion: relacion,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const success = await createAnything(formData);
            if (success) {
                alert("Contacto de emergencia creado exitosamente");
                window.location.reload();
            } else {
                alert("Error al crear el contacto de emergencia");
            }
        } catch (error) {
            console.error("Error al crear el contacto de emergencia:", error);
            alert("Error al crear el contacto de emergencia");
        }
    };

    return (
        <div>
            <HeadAdmin />
            <Box sx={{ maxWidth: 800, margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>Contactos de Emergencia</Typography>
                <TablaContactoEmergencia id={id} />

                <Box mt={4} p={2} bgcolor="#f9f9f9" borderRadius={2} boxShadow={3}>
                    <Typography variant="h5" align="center" gutterBottom>Nuevo Contacto de Emergencia</Typography>
                    <form onSubmit={handleSubmit} className='centered-title'>
                        <Box mb={2}>
                            <TextField
                                type="text"
                                value={formData.Nombre}
                                onChange={handleNombreChange}
                                label="Nombre"
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                type="text"
                                value={formData.NumeroTelefono}
                                onChange={handleTelefonoChange}
                                label="Teléfono"
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <SelectSingleRelacion onRelacionChange={handleRelacionChange} />
                        </Box>
                        <Box mb={2}>
                            <Button type="submit" variant="contained" color="secondary" fullWidth>
                                Guardar Contacto de Emergencia
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
            <Foot />
        </div>
    );
}

export default VisualizarContactoEmergencia;
