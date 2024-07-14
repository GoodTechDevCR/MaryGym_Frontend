import React, { useState } from 'react';
import SelectSingleCatEje from '../ui/selectSingle/SelectSingleCatEje';
import useCreateAnything from '../../hooks/useCreateAnything';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const handleReload = () => {
    window.location.reload();
};

function EjercicioInsertar() {
    const { createAnything } = useCreateAnything('https://marygymbackend-production.up.railway.app/ejercicio');
    const [formData, setFormData] = useState({
        nombreEjercicio: '',
        categoriaId: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCatEjeChange = (id) => {
        setFormData({ ...formData, categoriaId: id });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jsonData = {
            ...formData
        };

        try {
            const success = await createAnything(jsonData);
            if (success) {
                alert("Ejercicio Creado Exitosamente");
                handleReload();
            } else {
                alert("Error al crear el ejercicio");
            }
        } catch (error) {
            console.error("Error al crear el Ejercicio:", error);
            alert("Error al crear el Ejercicio");
        }
    };

    return (
        <div className='centered-title'>
            <Typography variant="h4" align="center" gutterBottom>Insertar Ejercicio</Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <Typography variant="body1" className='elemento2'>Seleccione la categoría del ejercicio:</Typography>
                    <SelectSingleCatEje onCatEjeChange={handleCatEjeChange} />
                </Box>
                <Box mb={2}>
                    <TextField
                        type="text"
                        name="nombreEjercicio"
                        value={formData.nombreEjercicio}
                        onChange={handleInputChange}
                        label="Nombre del Ejercicio"
                        fullWidth
                    />
                </Box>
                <Button type="submit" size="large" variant="contained" color="primary" fullWidth>
                    Guardar Ejercicio
                </Button>
            </form>
        </div>
    );
}

export default EjercicioInsertar;
