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
                    <body> Roble de Alajuela, frente al restaurante coquis ingresando en calle macacona 75 metros, contiguo al super macacona segundo portón color café </body>
                </Box>

                
                <div className='map-section'>
                    <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=9%C2%B059'26.2%22N%2084%C2%B014'24.7%22W+(MaryGym%20Alajuela)&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>
                </div>  


                


            </Box>
        </div>
    );
};

export default ContactoSc;
