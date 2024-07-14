import React from 'react';
import Box from '@mui/material/Box';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';

const ContactoSc = () => {
    return (
        <div id="Contacto" className='centered-title'>
            <h1 className='black'> Contáctanos</h1>
            <Box sx={{ p: 10 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 8, boxShadow: 1, height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box component="section" className='elemento'>
                                <a href="https://www.instagram.com/mariajbarquero" target="_blank" rel="noopener noreferrer">
                                    <InstagramIcon sx={{ color: 'black', fontSize: 40 }} />
                                </a>
                                <p style={{ margin: '10px 0' }}>mariajbarquero</p>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 8, boxShadow: 1, height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box component="section" className='elemento'>
                                <CallIcon sx={{ color: 'black', fontSize: 40 }} />
                                <p style={{ margin: '10px 0' }}>+506 8412 1006</p>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 8, boxShadow: 1, height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box component="section" className='elemento'>
                                <WhatsAppIcon sx={{ color: 'black', fontSize: 40, marginRight: 1 }} />
                                <Button variant="contained" color="success" href="https://wa.me/50684121006"> Habla con nosotros</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 8, boxShadow: 1, height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box component="section" className='elemento'>
                                <LocationOnIcon sx={{ color: 'black', fontSize: 40 }} />
                                <p style={{ margin: '10px 0' }}>Roble de Alajuela, frente al restaurante Coquis ingresando en calle Macacona 75 metros, contiguo al Super Macacona segundo portón color café</p>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 8, boxShadow: 1, height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box component="section" className='elemento'>
                                <ScheduleIcon sx={{ color: 'black', fontSize: 40 }} />
                                <p style={{ margin: '10px 0' }}>5:30 am - 9:30 am y 4:30 pm - 9:00 pm</p>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 8, boxShadow: 1, height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box component="section" className='elemento'>
                            <StarIcon sx={{ color: 'black', fontSize: 40 }} />
                                <p style={{ margin: '10px 0' }}>¡Muchas gracias por preferirnos!</p>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ bgcolor: '#f0f0f0', p: 3, borderRadius: 8, boxShadow: 1, mt: 3, textAlign: 'center' }}>
                    <div className='map-section'>
                        <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=9%C2%B059'26.2%22N%2084%C2%B014'24.7%22W+(MaryGym%20Alajuela)&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>
                    </div>
                </Box>
            </Box>
        </div>
    );
};

export default ContactoSc;
