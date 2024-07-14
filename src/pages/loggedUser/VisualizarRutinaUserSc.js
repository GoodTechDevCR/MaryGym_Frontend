import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserContext from '../../UserContext';
import UserMenu from '../../components/menu/UserMenu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import HeadUser from "../../components/Header/HeadUser";
import Foot from "../../components/Footer/Foot";


const VisualizarRutinaUserSc = () => {
    const { user } = useContext(UserContext);
    const [rutinaData, setRutinaData] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`https://marygymbackend-production.up.railway.app/rutinaXusuario/${user.id}`)
                .then(response => response.json())
                .then(data => {
                    setRutinaData(data);
                })
                .catch(error => console.error('Error fetching rutina', error));
        }
    }, [user]);

    if (!user) {
        return <Typography variant="body1" color="error">No user data available</Typography>;
    }

    const renderRutinaDetails = () => {
        if (rutinaData.length === 0) {
            return <Typography variant="body1" color="textSecondary">No se encontraron datos de la rutina</Typography>;
        }

        const { IdUsuario, Json } = rutinaData[0];
        const {
            usuario,
            fechaFin,
            fechaPago,
            cantSemana,
            fechaInicio,
            finalComment,
            initialComment,
            funcionalidades
        } = Json;

        return (
            <Paper elevation={4} sx={{ padding: 3, marginTop: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Información de la Rutina
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666' }}>
                            Fecha de inicio: {fechaInicio}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666' }}>
                            Fecha de fin: {fechaFin}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666' }}>
                            Fecha de pago: {fechaPago}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#666' }}>
                            Cantidad de semanas: {cantSemana}
                        </Typography>
                    </Grid>
                    {initialComment && (
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ color: '#888' }}>
                                Comentario inicial: {initialComment}
                            </Typography>
                        </Grid>
                    )}
                    {funcionalidades && funcionalidades.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444' }}>
                                Funcionalidades
                            </Typography>
                            {funcionalidades.map((funcionalidad, index) => (
                                <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 2, backgroundColor: '#e0e0e0' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444' }}>
                                        {funcionalidad.nombreFuncionalidad}
                                    </Typography>
                                    {funcionalidad.ejercicios && funcionalidad.ejercicios.length > 0 && (
                                        <ul>
                                            {funcionalidad.ejercicios.map((ejercicio, idx) => (
                                                <li key={idx}>
                                                    <Typography variant="body1" sx={{ color: '#555' }}>
                                                        Nombre del ejercicio: {ejercicio.nombreEjercicio}
                                                    </Typography>
                                                    {ejercicio.comentario && (
                                                        <Typography variant="body1" sx={{ color: '#777' }}>
                                                            Comentario: {ejercicio.comentario}
                                                        </Typography>
                                                    )}
                                                    {[...Array(5)].map((_, semanaIdx) => (
                                                        ejercicio[`semana${semanaIdx + 1}`] && (
                                                            <Typography variant="body1" key={semanaIdx} sx={{ color: '#555' }}>
                                                                Semana {semanaIdx + 1}: {ejercicio[`semana${semanaIdx + 1}`]}
                                                            </Typography>
                                                        )
                                                    ))}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </Paper>
                            ))}
                        </Grid>
                    )}
                    {finalComment && (
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ color: '#888' }}>
                                Comentario final: {finalComment}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        );
    };

    return (
        
        <div>
            <HeadUser />
            <UserMenu />
            <Box sx={{ padding: 2, maxWidth: 800, margin: 'auto', marginTop: 3 }}>
                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Visualizar Rutina
                </Typography>
                {renderRutinaDetails()}
            </Box>
            <Foot />
        </div>
    );
};

export default VisualizarRutinaUserSc;
