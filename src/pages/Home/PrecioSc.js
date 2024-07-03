import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

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
                    <div className="body3">
                        {tipo}
                    </div>
                    <h1 className='black' >
                        ₡{precio}
                    </h1>
                    
                </CardContent>
                
            </React.Fragment>
        </Card>
    </Box>
    );
}

