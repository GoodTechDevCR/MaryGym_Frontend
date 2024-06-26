import { rgbToHex } from '@mui/material';
import background from '../../assets/gym-interior.jpg';
import "./Home.css";

function HomeScreen(){
    return(
        <>
        <div className="background-image">
            <div className='centered-title'>
                <h1>Entrena con nosotros</h1>
                <body> Transforma tu esfuerzo en fuerza, en nuestro gimnasio.</body>
                <br></br>
                <button className='home-button'> Contáctanos </button>
            </div>
        </div>
        
        <div className="background-blank">
            <div className='centered-title'>
                <h2> ¿Por qué nosotros?</h2>
            </div>
            
        
        
        </div>
        
        
        </>
    );  
} 

export default HomeScreen;