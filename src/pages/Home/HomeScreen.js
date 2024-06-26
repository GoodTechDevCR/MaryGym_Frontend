import background from '../../assets/gym-interior.jpg';

function HomeScreen(){
    return(
        <div style = {{backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: '100%',
            height: '1000PX'
        
        }}>   
            <h1>Entrena con nosotros</h1>
            Transforma tu esfuerzo en fuerza, en nuestro gimnasio.
        
        
        </div>
    );  
} 

export default HomeScreen;