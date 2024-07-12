import React from 'react';
import "./Home.css";
import Box from '@mui/material/Box';
import Gym1 from '@mui/icons-material/SportsGymnastics';
import Gym2 from '@mui/icons-material/FitnessCenter';
import Gym3 from '@mui/icons-material/Diversity3';
import GymImagen from '../../assets/MaryGymPicture1.jpg';
import MariaJose from '../../assets/MariaJose.jpg';
import MamaMary from '../../assets/MariaJose.jpg';

function scroll(name) {
    document.getElementById(name).scrollIntoView({ behavior: 'smooth' });
}

function HomeScreen() {
    return (
        <>
            <div id="Inicio" className="background-image">
                <div className='centered-title'>
                    <h1 className="white">Entrena con nosotros</h1>
                    <p className='white-body'>Transforma tu esfuerzo en fuerza, en nuestro gimnasio.</p>
                </div>
            </div>

            <div className="background-blank">
                <div className='centered-title'>
                    <h2>¿Por qué MaryGym?</h2>
                </div>
                <Box component="section" className='fila'>
                    <Box component="section" className='box'>
                        <Gym1 sx={{ color: 'black', fontSize: 40 }} />
                        <h3>Rutina</h3>
                        <p>Rutina de entrenamiento totalmente personalizada para tus necesidades y objetivos.</p>
                    </Box>
                    <Box component="section" className='box'>
                        <Gym2 sx={{ color: 'black', fontSize: 40 }} />
                        <h3>Equipo</h3>
                        <p>Equipos de vanguardia que te ayudarán a entrenar con eficiencia y precisión.</p>
                    </Box>
                    <Box component="section" className='box'>
                        <Gym3 sx={{ color: 'black', fontSize: 40 }} />
                        <h3>Comunidad</h3>
                        <p>Comunidad unida donde cada miembro encuentra apoyo y motivación para alcanzar sus metas de fitness.</p>
                    </Box>
                </Box>
            </div>

            <div className="background-blank">
                <div className='centered-title'>
                    <h2>Nosotros</h2>
                </div>
                <Box sx={{ paddingLeft: 5, paddingRight: 5 }} component="section" className='fila'>
                    <Box component="section" className='box-grande'>
                        <p>En MaryGym, bajo la dirección de María José Barquero, nos enfocamos en elevar el estándar del fitness. Ofrecemos un ambiente acogedor y motivador donde todos, desde principiantes hasta atletas experimentados, encuentran el apoyo para alcanzar sus metas de salud y bienestar. En MaryGym, cultivamos fuerza física, determinación y comunidad. Únete a nosotros para descubrir cómo podemos ayudarte a alcanzar tus objetivos personales de forma efectiva y satisfactoria.</p>
                    </Box>
                    <img src={GymImagen} alt="Gym" className="imagen" />
                </Box>
            </div>

            <div className="background-blank">
                <div className='centered-title'>
                    <h2>Nuestras Instalaciones</h2>
                </div>
                <Box component="section" className='fila'>
                    <img src={GymImagen} alt="Instalaciones" className="imagen" />
                    <Box component="section" className='box-grande'>
                        <p>En MaryGym contamos con amplias y modernas instalaciones equipadas con todo lo necesario para que tu entrenamiento sea efectivo y agradable. Disfruta de nuestras áreas de pesas, máquinas de cardio, zona de estiramientos y mucho más.</p>
                    </Box>
                </Box>
            </div>

            <div className="background-blank">
                <div className='centered-title'>
                    <h2>Testimonios</h2>
                </div>
                <Box component="section" className='fila'>
                    <Box component="section" className='box'>
                        <p>"Gracias a MaryGym he logrado alcanzar mis objetivos de forma rápida y efectiva. La comunidad es increíble y siempre me siento motivado para seguir adelante." - Luis Viquez</p>
                    </Box>
                    <Box component="section" className='box'>
                        <p>"El equipo es de alta calidad y el ambiente es muy acogedor. Me encanta entrenar en MaryGym." - Aaron</p>
                    </Box>
                    <Box component="section" className='box'>
                        <p>"La rutina personalizada que me hicieron ha sido perfecta para mí. He visto grandes resultados en poco tiempo." - Carlos García</p>
                    </Box>
                </Box>
            </div>

            <div id="Entrenadoras" className="background-blank">
                <div className='centered-title'>
                    <h2>Nuestras Entrenadoras</h2>
                </div>
                <Box component="section" className='fila'>
                    <Box component="section" className='box'>
                        <img src={MariaJose} alt="María José Barquero" className="imagen-entrenadora" />
                        <h3>María José Barquero</h3>
                        <p><strong>Power Lifter</strong> con varios años de experiencia en el ámbito del fitness. Conocimiento profundo del cuerpo humano gracias a estudios de enfermería. Experta en el uso de equipos de gimnasio y planificación de rutinas personalizadas. María José te ayudará a alcanzar tus metas de fuerza y bienestar con su enfoque profesional y personalizado.</p>
                        <p><strong>Certificaciones:</strong></p>
                        <ul>
                            <li>Licenciatura en Enfermería</li>
                            <li>Entrenadora Personal Certificada</li>
                            <li>Especialista en Powerlifting</li>
                        </ul>
                    </Box>
                    <Box component="section" className='box'>
                        <img src={MamaMary} alt="Mamá Mary" className="imagen-entrenadora" />
                        <h3>Mamá Mary</h3>
                        <p><strong>Instructora de Zumba, Spinning y Cardio</strong> con muchos años de experiencia en clases grupales. Mamá Mary ofrece clases de Zumba, Spinning y Cardio, proporcionando una experiencia divertida y energizante. Sus clases están diseñadas para todos los niveles, promoviendo un estilo de vida activo y saludable en un ambiente inclusivo.</p>
                        <p><strong>Certificaciones:</strong></p>
                        <ul>
                            <li>Instructora de Zumba</li>
                            <li>Certificación en Spinning</li>
                            <li>Entrenadora de Cardio</li>
                        </ul>
                    </Box>
                </Box>
            </div>

            <div className="background-blank">
                <div className='centered-title'>
                    <h1 className="black">Horario</h1>
                    <Box component="section" className='columna'>
                        <p>5:30 am - 9:30 am</p>
                        <p>4:30 pm - 9:00 pm</p>
                    </Box>
                </div>
            </div>

            <br />
            <br />
            <br />
        </>
    );
}

export default HomeScreen;
