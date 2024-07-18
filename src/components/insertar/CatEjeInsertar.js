import React, { useState } from 'react';
import useCreateAnything from '../../hooks/useCreateAnything';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function CatEjeInsertar({ onSuccess }) {
    const { createAnything } = useCreateAnything('https://marygymbackend-production.up.railway.app/catEje');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        NombreCatEje: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonData = {
            ...formData
        };

        if (formData.NombreCatEje === '') {
            alert("Error, la categoría debe tener nombre");
        } else {
            try {
                const success = await createAnything(jsonData);
                if (success) {
                    alert("Categoría Ejercicio Creada Exitosamente");
                    setFormData({ NombreCatEje: '' });
                    onSuccess();  
                    navigate('/admin/crearRutina');
                } else {
                    alert("Error al crear la Categoría Ejercicio");
                }
            } catch (error) {
                console.error("Error al crear la Categoría Ejercicio:", error);
                alert("Error al crear la Categoría Ejercicio");
            }
        }
    };

    return (
        <div className='centered-title'>
            <Typography variant="h4" align="center" gutterBottom className='black'>Insertar Categoría de Ejercicio</Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        type="text"
                        name="NombreCatEje"
                        value={formData.NombreCatEje}
                        onChange={handleInputChange}
                        label="Nombre de la Categoría de Ejercicio"
                        fullWidth
                    />
                </Box>
                <Button type="submit" variant="contained" size="large" color="primary" fullWidth>
                    Guardar Categoría de Ejercicio
                </Button>
            </form>
        </div>
    );
}

export default CatEjeInsertar;
