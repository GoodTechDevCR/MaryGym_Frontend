import React from 'react';
import Head from "../../components/Header/Head";
import Foot from "../../components/Footer/Foot";
import Box from '@mui/material/Box';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';

const ContactoSc = () => {
    return (
        <div className='centered-title'>
            <h1 className='black'> Contáctanos</h1>
            <Box sx={{ p: 10}}>
                <Box component="section" className = 'elemento' >
                    <InstagramIcon sx={{ color: 'black'  , fontSize: 40}}/>
                    <body> marygyminsta </body>
                </Box>
                <Box component="section" className = 'elemento' >
                    <CallIcon sx={{ color: 'black' , fontSize: 40}}/>
                    <body> +506 8888 8888 / +506 8888 8888 </body>
                </Box>
                <Box component="section" className = 'elemento'>
                    <WhatsAppIcon sx={{ color: 'black'  , fontSize: 40}}/>
                    <Button variant="outlined"  color="success"> Habla con nosotros</Button>
                </Box>
                <Box component="section" className = 'elemento'>
                    <LocationOnIcon sx={{ color: 'black'  , fontSize: 40}}/>
                    <body> Direcccion larga de la ubicacion de este lugar la cual no me la se lol pero quiero ver si se corta en la pantalla de forma bonita </body>
                </Box>

                
                <div className='map-section'>
                    <iframe width="100%" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=2QCR+P88,%20Ruta%20Nacional%20Secundaria%20125,%20Provincia%20de%20Alajuela,%20Alajuela,%20Llano+(Estadio%20Alejandro%20Morera%20Soto)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        <a href="https://www.gps.ie/">gps vehicle tracker</a>
                    </iframe>
                </div>
                
                
                




            </Box>
            
                
            




        </div>
    );
};

export default ContactoSc;
