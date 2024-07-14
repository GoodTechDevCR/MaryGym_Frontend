import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SelectSingleCatEje from '../../../components/ui/selectSingle/SelectSingleCatEje';
import TablaEjercicioPorCat from '../../../components/showData/TablaEjercicioPorCat';
import CatEjeInsertar from '../../../components/insertar/CatEjeInsertar';
import EjercicioInsertar from '../../../components/insertar/EjercicioInsertar';
import HeadAdmin from '../../../components/Header/HeadAdmin';
import Foot from '../../../components/Footer/Foot';

function EjercicioDisponible() {
    const [formData, setFormData] = useState({
        nombreEjercicio: '',
        categoriaId: 0
    });

    const handleCatEjeChange = (id) => {
        setFormData({ ...formData, categoriaId: id });
    };

    return (
        <div>
            <HeadAdmin />
            <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" sx={{ fontSize: '3rem', marginBottom: '20px' }}> Ejercicios </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ mb: 2, width: '100%' }}>
                        <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: '10px' }}> Seleccione la categoría del ejercicio: </Typography>
                        <SelectSingleCatEje onCatEjeChange={handleCatEjeChange} />
                    </Box>
                    <Box sx={{ mb: 2, width: '100%' }}>
                        <TablaEjercicioPorCat key={formData.categoriaId} categoria={formData.categoriaId} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <CatEjeInsertar />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <EjercicioInsertar />
                    </Box>
                </Box>
            </Box>
            <Foot />
        </div>
    );
}

export default EjercicioDisponible;
