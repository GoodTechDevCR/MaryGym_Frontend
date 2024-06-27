import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PrecioSc = () => {
    return (
        <div id="Precios" className='centered-title'>
            <h1 className='black'>Precios</h1>
            <Box className = 'fila' >
                {card("Sesión","2700")}
                {card("Semana","5000")}
                {card("Mensualidad","17500")}
            </Box>         
        </div>
    );
};

export default PrecioSc;


function card (tipo, precio) { 
    return (
    <Box sx={{ minWidth: 0 }} className = 'card'>
        <Card variant="outlined">  
            <React.Fragment>
                <CardContent className='left'>
                    <Typography sx={{ fontSize: 30}} color="text.secondary" gutterBottom>
                        {tipo}
                    </Typography>
                    <Typography variant="h2" component="div">
                        ₡{precio}
                    </Typography>
                    
                </CardContent>
                
            </React.Fragment>
        </Card>
    </Box>
    );
}

