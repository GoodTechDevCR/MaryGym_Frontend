import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import WelcomeImage from '../../assets/MaryGymPicture1.jpg'; // Importa la imagen aquí

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', textAlign: 'left' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="auto" // Ajusta la altura automáticamente
          width="100%" // Ocupa el ancho completo del contenedor
          image={WelcomeImage}
          alt="MaryGymPicture"
          sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} // Centra la imagen horizontalmente
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '2rem' }}>
            ¡Bienvenido Administrador!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
            Utiliza el menú que está a la izquierda para manejar rutinas, usuarios y pagos.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
