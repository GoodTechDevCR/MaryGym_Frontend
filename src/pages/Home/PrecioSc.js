import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import imagenPrueba from '../../assets/dumbblesPrueba.jpg';

const CardWrapper = styled(Box)(({ theme }) => ({
  minWidth: 0,
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    width: 'calc(33.33% - 16px)',
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '80%',
  overflow: 'auto',
};

const plans = [
  {
    tipo: "Sesión",
    precio: "2700",
    informacion: "Sesión completa de un día, calentamiento, acompañamiento de ejercicios además de aporte de ayuda.",
    imageUrl: imagenPrueba,
    detalles: "Para el plan de un día, ofrecemos orientación al gimnasio, un calentamiento completo, acompañamiento durante toda la rutina de ejercicios y vuelta a la calma. Además, proporcionamos consejos y recomendaciones para maximizar tu entrenamiento.",
  },
  {
    tipo: "Semana",
    precio: "5000",
    informacion: "Acompañamiento completo en una semana, asesoría por cinco días hábiles.",
    imageUrl: imagenPrueba,
    detalles: "El plan semanal incluye entrenamiento durante cinco días consecutivos, permitiéndote trabajar todos los grupos musculares. Benefíciate de asesoría continua, planificación personalizada y seguimiento diario para asegurar tu progreso.",
  },
  {
    tipo: "Mensualidad",
    precio: "17500",
    informacion: "Creación de rutina de ejercicios personalizada según el usuario. Seguimiento constante durante el mes además de ayudas.",
    imageUrl: imagenPrueba,
    detalles: "Con el plan mensual, tendrás asistencia total durante todo el mes, incluyendo la creación de una rutina personalizada. Podrás hacer uso completo del gimnasio y de todas sus amenidades. Además, tendrás acceso a todas las funcionalidades de la web, seguimiento constante y soporte especializado.",
  },
];

const PrecioSc = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpen = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div id="Precios" className='centered-title'>
      <Typography variant="h2" component="h1" className='black' align="center" gutterBottom>
        Precios
      </Typography>
      <Grid container justifyContent="center" alignItems="stretch">
        {plans.map((plan) => (
          <CardWrapper key={plan.tipo}>
            <Card variant="outlined" onClick={() => handleOpen(plan)}>
              <CardMedia
                component="img"
                height="140"
                image={plan.imageUrl}
                alt={`${plan.tipo} image`}
              />
              <CardContent>
                <Typography variant="h5" component="div" className='body3'>
                  {plan.tipo}
                </Typography>
                <Typography variant="h3" component="div" className='black'>
                  ₡{plan.precio}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {plan.informacion}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Más Información
                </Button>
              </CardContent>
            </Card>
          </CardWrapper>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          {selectedPlan && (
            <>
              <Typography id="modal-title" variant="h4" component="h2" gutterBottom>
                {selectedPlan.tipo}
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                {selectedPlan.detalles}
              </Typography>
              <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 4 }}>
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PrecioSc;
