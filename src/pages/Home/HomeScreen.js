import "./Home.css";
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Gym1 from '@mui/icons-material/SportsGymnastics';
import Gym2 from '@mui/icons-material/FitnessCenter';
import Gym3 from '@mui/icons-material/Diversity3';
import GymImagen from '../../assets/gym-interior.jpg'

function HomeScreen(){
    return(
        <>
        <div className="background-image">
            <div className='centered-title'>
                <h1>Entrena con nosotros</h1>
                <body className= 'white-body'> Transforma tu esfuerzo en fuerza, en nuestro gimnasio.</body>
                <br></br>
                <button className='home-button'> Contáctanos </button>
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
                    <body> Gimnasio full equipado con mancuernas, caminadoras y todas las máquinas necesarias para tu entrenamiento. </body>
                </Box>
                <Box component="section" className = 'box'>
                    <Gym3 sx={{ color: 'black'  , fontSize: 40}}/>
                    <h3>Comunidad</h3>
                    <body> xxx </body>
                </Box>
                
            </Box>
        </div>
        
        <div className="background-blank">
            <div className='centered-title'>
                <h2> Nosotros</h2>
            </div>

            <Box  sx={{ p: 5}} component="section" className = 'fila' >
                <Box component="section" className = 'box-grande' >
                    <body> Nuestro equipo con x años de experiencia en entrenamiento. </body>
                </Box>
                <img src={GymImagen} alt="Gym Image" className="imagen"/>
            </Box>
        </div>



        <br/>
        <br/>
        <br/>
        <br/>
        </>
    );  
} 

export default HomeScreen;