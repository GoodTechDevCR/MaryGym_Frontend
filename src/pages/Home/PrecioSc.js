import React from 'react';
import Head from "../../components/Header/Head";
import Foot from "../../components/Footer/Foot";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PrecioSc = () => {
    return (
        <div className='centered-title'>
            <h2>Precios</h2>
            <Box className = 'fila' >
                {card("Sesión","2700", "Entrenador personal certificado", "Evaluación física inicial", "Plan de entrenamiento personalizado")}
                {card("Semana","5000", "hola")}
                {card("Mensualidad","17500", "Entrenador personal certificado", "Evaluaciones físicas mensualmente", "Plan de entrenamiento")}
            </Box>         
        </div>
    );
};

export default PrecioSc;


function card (tipo, precio, desc1, desc2, desc3) { 
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
                    <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                        {bull}{desc1}
                    </Typography>
                    <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                        {bull}{desc2}
                    </Typography>
                    <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                        {bull}{desc3}
                    </Typography>
                </CardContent>
                
                <CardActions className = 'center' >
                    <Button className='black-button'> Seleccionar </Button>
                </CardActions>
                
            </React.Fragment>
        </Card>
    </Box>
    );
}

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
