import React from 'react';
import "./Home.css";
import { Grid, Box } from '@mui/material';

import Gym1 from '@mui/icons-material/SportsGymnastics';
import Gym2 from '@mui/icons-material/FitnessCenter';
import Gym3 from '@mui/icons-material/Diversity3';
import GymImagen from '../../assets/MaryGymPicture1.jpg';
import MariaJose from '../../assets/MariaJose.jpg';
import MamaMary from '../../assets/MaritzaMena.jpeg';
import instalacion1 from '../../assets/instalacion1.png';
import instalacion2 from '../../assets/instalacion2.png';
import instalacion3 from '../../assets/instalacion3.png';



function HomeScreen() {
    return (
        <>
            <div id="Inicio" className="background-image">
                <div className='centered-title' style={{ textShadow: '2px 2px 15px rgba(0, 0, 0, 100)' }}>
                    <h1 className="white" style={{ fontSize: '3rem' }}>Entrena con nosotros</h1>
                    <p className='white-body' style={{ fontSize: '1.5rem' }}>Transforma tu esfuerzo en fuerza en nuestro gimnasio.</p>
                </div>
            </div>

            <div className="background-blank">
                <div className='centered-title'>
                    <h2 style={{ fontSize: '2rem' }}>¿Por qué MaryGym?</h2>
                </div>
                <Grid container spacing={3} className='fila'>
                    <Grid item xs={12} sm={4}>
                        <Box className='box' textAlign="center" sx={{ height: '100%' }}>
                            <Gym1 sx={{ color: 'black', fontSize: 40 }} />
                            <h3>Rutina</h3>
                            <p>Rutina de entrenamiento totalmente personalizada para tus necesidades y objetivos.</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className='box' textAlign="center" sx={{ height: '100%' }}>
                            <Gym2 sx={{ color: 'black', fontSize: 40 }} />
                            <h3>Equipo</h3>
                            <p>Equipos de vanguardia que te ayudarán a entrenar con eficiencia y precisión.</p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className='box' textAlign="center" sx={{ height: '100%' }}>
                            <Gym3 sx={{ color: 'black', fontSize: 40 }} />
                            <h3>Comunidad</h3>
                            <p >Comunidad unida donde cada miembro encuentra apoyo y motivación para alcanzar sus metas de fitness.</p>
                        </Box>
                    </Grid>
                </Grid>
            </div>

            <div className="background-blank">
                <div className='centered-title'>
                    <h2 style={{ fontSize: '2rem' }}>Nosotros</h2>
                </div>
                <div className="centered-content">
                    <Grid container spacing={2} className='fila'>
                        <Grid item xs={12} md={6}>
                            <Box component="section" className='box-grande' sx={{ paddingRight: { xs: 0, md: 2 }, paddingLeft: { xs: 0, md: 2 } }}>
                                <p>
                                    En MaryGym, bajo la dirección de María José Barquero, nos enfocamos en elevar el estándar del fitness.
                                    Ofrecemos un ambiente acogedor y motivador donde todos, desde principiantes hasta atletas experimentados,
                                    encuentran el apoyo para alcanzar sus metas de salud y bienestar. En MaryGym, cultivamos fuerza física,
                                    determinación y comunidad. Únete a nosotros para descubrir cómo podemos ayudarte a alcanzar tus objetivos
                                    personales de forma efectiva y satisfactoria.
                                </p>
                            </Box>
                        </Grid>
                        <img src={GymImagen} alt="Gym" className="imagen" />
                    </Grid>
                    <div className="background-blank">
                                <div className='centered-title'>
                                    <h1 className="black">Horario</h1>
                                    <Box component="section" className='columna'>
                                        <p>5:30 am - 9:30 am</p>
                                        <p>4:30 pm - 9:00 pm</p>
                                    </Box>
                                </div>
                    </div>
                </div>
            </div>


            <div className="background-blank">
                <div className='centered-title'>
                    <h2 style={{ fontSize: '2rem' }}>Nuestras Instalaciones</h2>
                </div>
                <div className="centered-content">
                    <Grid container spacing={2} className='fila'>
                    <img src={instalacion1} alt="instalacion1" className="imagen" />
                    <img src={instalacion2} alt="instalacion2" className="imagen" />
                    <img src={instalacion3} alt="instalacion3" className="imagen" />
                        <Grid item xs={12} md={6}>
                            <Box component="section" className='box-grande' sx={{ paddingRight: { xs: 0, md: 2 }, paddingLeft: { xs: 0, md: 2 } }}>
                                <p>
                                En MaryGym contamos con amplias y modernas instalaciones equipadas con todo lo necesario para que tu entrenamiento sea efectivo y agradable. Disfruta de nuestras áreas de pesas, máquinas de cardio, zona de estiramientos y mucho más.
                                </p>
                            </Box>
                        </Grid>
                        
                        
                    </Grid>
                </div>
            </div>

            <div className="background-blank">
                <div className='centered-title'>
                    <h2 style={{ fontSize: '2rem' }}>Testimonios</h2>
                </div>
                    <Grid container spacing={3} className='fila'>
                <Grid item xs={12} sm={4}>
                    <Box className='box' textAlign="center" sx={{ backgroundColor: '#98D8EA', padding: 2, height: '100%' }}>
                            <p style={{ fontSize: '1.2rem' }}>
                            "Gracias a MaryGym he logrado alcanzar mis objetivos de forma rápida y efectiva. La comunidad es increíble y siempre me siento motivado para seguir adelante."
                            </p>
                            <p style={{ fontSize: '1.2rem' }}>
                             - Luis Víquez
                            </p>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box className='box' textAlign="center" sx={{ backgroundColor: '#98D8EA', padding: 2, height: '100%' }}>
                            <p style={{ fontSize: '1.2rem' }}>
                            "El equipo es de alta calidad y el ambiente es muy acogedor. Me encanta entrenar en MaryGym."
                            </p>
                            <p style={{ fontSize: '1.2rem' }}>
                             - Aaron Ramirez
                            </p>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box className='box' textAlign="center" sx={{ backgroundColor: '#98D8EA', padding: 2, height: '100%' }}>
                            <p style={{ fontSize: '1.2rem' }}>
                            "La rutina personalizada que me hicieron ha sido perfecta para mí. He visto grandes resultados en poco tiempo."
                            </p>

                            <p style={{ fontSize: '1.2rem' }}>
                             - Carlos García
                            </p>

                    </Box>
                </Grid>
            </Grid>
            </div>

            <div id="Entrenadoras" className="background-blank">
                <div className='centered-title'>
                    <h2 style={{ fontSize: '2rem' }}>Nuestras Entrenadoras</h2>
                </div>
                
                <div className="centered-content">
                    <Grid container spacing={2} className='fila'>
                        <Grid item xs={12} md={6}>
                            <Box component="section" className='box-grande' sx={{ paddingRight: { xs: 0, md: 2 }, paddingLeft: { xs: 0, md: 2 } }}>
                        
                            <h3>María José Barquero</h3>
                            <p><strong>Power Lifter</strong> con varios años de experiencia en el ámbito del fitness. Conocimiento profundo del cuerpo humano gracias a estudios de enfermería. Experta en el uso de equipos de gimnasio y planificación de rutinas personalizadas. María José te ayudará a alcanzar tus metas de fuerza y bienestar con su enfoque profesional y personalizado.</p>
                            <p></p>
                            <p><strong>Certificaciones:</strong></p>

                                <p>    - Licenciatura en Enfermería</p>
                                <p>     - Entrenadora Personal Certificada</p>
                                <p>     - Especialista en Powerlifting</p>
   
                            </Box>
                        </Grid>
                        <img src={MariaJose} alt="María José Barquero" className="imagen-entrenadora" />
                    </Grid>
                </div>

                <div  className="centered-content">
                    <Grid container spacing={2} className='fila'>
                        <img src={MamaMary}  alt="Maritza Mena" className="imagen-entrenadoraMaritza" />
                        <Grid item xs={12} md={6}>
                            <Box component="section" className='box-grande' sx={{ paddingRight: { xs: 0, md: 2 }, paddingLeft: { xs: 0, md: 2 } }}>
                        
                            <h3>Maritza Mena</h3>
                            <p><strong>Instructora de Zumba, Spinning y Cardio</strong> con muchos años de experiencia en clases grupales. Mamá Mary ofrece clases de Zumba, Spinning y Cardio, proporcionando una experiencia divertida y energizante. Sus clases están diseñadas para todos los niveles, promoviendo un estilo de vida activo y saludable en un ambiente inclusivo.</p>
                            <p><strong>Certificaciones:</strong></p>
                        
                                <p>Instructora de Zumba</p>
                                <p>Certificación en Spinning</p>
                                <p>Entrenadora de Cardio</p>
                            
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default HomeScreen;
