import "./Home.css";
import Box from '@mui/material/Box';
import Gym1 from '@mui/icons-material/SportsGymnastics';
import Gym2 from '@mui/icons-material/FitnessCenter';
import Gym3 from '@mui/icons-material/Diversity3';
import GymImagen from '../../assets/MaryGymPicture1.jpg'

function scroll(name){
    document.getElementById(name).scrollIntoView();
}

function HomeScreen(){
    return(
        <>
        <div id= "Inicio" className="background-image">
            <div className='centered-title'>
                <h1>Entrena con nosotros</h1>
                <br></br>
                <body className= 'white-body'> Transforma tu esfuerzo en fuerza, en nuestro gimnasio.</body>
                <br></br>
            </div>
        </div>
        
        <div className="background-blank">
            <div className='centered-title'>
                <h2> ¿Por qué MaryGym?</h2>
            </div>
            <Box component="section" className = 'fila' >
                <Box component="section" className = 'box' >
                    <Gym1 sx={{ color: 'black'  , fontSize: 40}}/>
                    <h3>Rutina</h3>
                    <body> Rutina de entrenamiento totalmente personalizado para tus necesidades y objetivos. </body>
                </Box>
                <Box component="section" className = 'box' >
                    <Gym2 sx={{ color: 'black' , fontSize: 40}}/>
                    <h3>Equipo</h3>
                    <body>  Equipos de vanguardia que te ayudarán a entrenar con eficiencia y precisión. </body>
                </Box>
                <Box component="section" className = 'box'>
                    <Gym3 sx={{ color: 'black'  , fontSize: 40}}/>
                    <h3>Comunidad</h3>
                    <body> Comunidad unida donde cada miembro encuentra apoyo y motivación para alcanzar sus metas de fitness. </body>
                </Box>
                
            </Box>
        </div>
        
        <div className="background-blank">
            <div className='centered-title'>
                <h2> Nosotros</h2>
            </div>

            <Box  sx={{ paddingLeft:5, paddingRight:5 }} component="section" className = 'fila' >
                <Box component="section" className = 'box-grande' >
                    <body> En MaryGym, bajo la dirección de María José Barquero, nos enfocamos en elevar el estándar del fitness. Ofrecemos un ambiente acogedor y motivador donde todos, desde principiantes hasta atletas experimentados, encuentran el apoyo para alcanzar sus metas de salud y bienestar. En MaryGym, cultivamos fuerza física, determinación y comunidad. Únete a nosotros para descubrir cómo podemos ayudarte a alcanzar tus objetivos personales de forma efectiva y satisfactoria. </body>
                </Box>
                <img src={GymImagen} alt="Gym Image" className="imagen"/>
            </Box>
        </div>

        <div>
            <div className='centered-title'>
                <h1 className="black"> Horario </h1>
                <Box component="section" className = 'columna' >
                    <body> 5:30 am -  9:30 am</body>
                    <body> 4:30 pm -  9:00 pm</body>
                </Box>
            </div>
        </div>
        <br/>
        <br/>
        <br/>
        </>
    );  
} 

export default HomeScreen;