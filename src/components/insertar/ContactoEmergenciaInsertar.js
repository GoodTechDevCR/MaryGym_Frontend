import React, { useState } from 'react';
import useCreateAnything from '../../hooks/useCreateAnything';
import SelectSingleRelacion from '../ui/selectSingle/SelectSingleRelacion';
import UseConsultaByCorreo from '../../hooks/usuarioHooks/useConsultaUsuarioByCorreo';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

function ContactoEmergenciaInsertar({ correo }) {
    const { createAnything } = useCreateAnything('https://marygymbackend-production.up.railway.app/contactoEme');
    const IdUsuarioGuardar = UseConsultaByCorreo(correo);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        IdUsuario: '', 
        Nombre: '',
        NumeroTelefono: '',
        Relacion: '',
    });

    const [contactos, setContactos] = useState([]);

    const handleNombreChange = (event) => {
        setFormData({
            ...formData,
            Nombre: event.target.value,
        });
    };

    const handleTelefonoChange = (event) => {
        setFormData({
            ...formData,
            NumeroTelefono: event.target.value,
        });
    };

    const handleRelacionChange = (relacion) => {
        setFormData({
            ...formData,
            Relacion: relacion 
        });
    };

    const handleAddContact = () => {
        if (formData.Nombre && formData.NumeroTelefono && formData.Relacion) {
            setContactos([
                ...contactos,
                { ...formData, IdUsuario: IdUsuarioGuardar[0].IdUsuario }
            ]);
            setFormData({
                IdUsuario: IdUsuarioGuardar[0].IdUsuario,
                Nombre: '',
                NumeroTelefono: '',
                Relacion: '',
            });
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const success = await createAnything(contactos);
            if (success) {
                alert("Contactos Creados Exitosamente");
                navigate(`/admin/usuario/visualizar`);
            } else {
                alert("Error al crear el Usuario");
            }
        } catch (error) {
            console.error("Error al crear el Usuario:", error);
            alert("Error al crear el Usuario");
        }
    };

    const handleSalir = async(event) => {
        event.preventDefault();
        navigate(`/admin/usuario/visualizar`);
    }

    return (
        <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
            <Typography className='black' variant="h4" gutterBottom textAlign="center">Insertar contacto de emergencia</Typography>
            <Typography variant="body1" textAlign="center" mb={2}>
                Para agregar los contactos de emergencia se debe de ir llenando los datos y oprimir el boton "Agregar", 
                una vez digitados todos los contactos se debe digitar el boton "Enviar", en caso de NO querer agregar contactos 
                digitar el boton "Salir".
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        type="text"
                        value={formData.Nombre}
                        onChange={handleNombreChange}
                        label="Nombre Contacto"
                        fullWidth
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        type="text"
                        value={formData.NumeroTelefono}
                        onChange={handleTelefonoChange}
                        label="Teléfono"
                        fullWidth
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <SelectSingleRelacion onRelacionChange={handleRelacionChange} />
                </Box>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button type="button" variant="contained" color="primary" onClick={handleAddContact} fullWidth>
                            Agregar Contacto
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Enviar
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button type="button" variant="contained" color="secondary" onClick={handleSalir} fullWidth>
                            Salir
                        </Button>
                    </Grid>
                </Grid>
            </form>
            
            {/* Mostrar lista de contactos solo si hay contactos registrados */}
            {contactos.length > 0 && (
                <Box mt={4}>
                    <Typography className='black' variant="h4" gutterBottom textAlign="center">Contactos de Emergencia</Typography>
                                      
                    <List>
                        {contactos.map((contacto, index) => (
                            <div key={index}>
                                <ListItem>
                                    <ListItemText primary={`${contacto.Nombre} - ${contacto.NumeroTelefono} - ${contacto.Relacion}`} />
                                </ListItem>
                                {index < contactos.length - 1 && <Divider />}
                            </div>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
}

export default ContactoEmergenciaInsertar;
