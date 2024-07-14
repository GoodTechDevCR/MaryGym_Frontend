import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import UseConsultaUsuario from '../../hooks/usuarioHooks/useConsultaUsuario';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, Select, MenuItem, Collapse, Grid } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // Remove the white strip between rows
    '& > *': {
        borderBottom: 'unset',
    },
}));

function CustomizedTables() {
    const data = UseConsultaUsuario();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('todos');
    const [openRows, setOpenRows] = useState({}); // Track which rows are open

    if (!data) return <div>Loading...</div>;

    const handleModify = (id) => {
        navigate(`/admin/usuario/modificar/${id}`);
    };

    const handleContactoEmergencia = (id) => {
        navigate(`/admin/usuario/contactoEmergencia/${id}`);
    }

    const isMoroso = (fecha) => {
        if (!fecha) return true;
        const today = new Date();
        const UltimoPago = new Date(fecha);
        return UltimoPago < today;
    };

    const formatFecha = (fecha) => {
        if (!fecha) return '';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredData = data.filter((row) => {
        if (filter === 'todos') return true;
        if (filter === 'activos') return row.estado === 1;
        if (filter === 'noActivos') return row.estado === 0;
        return false;
    });

    const handleCollapseToggle = (id) => {
        setOpenRows((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                        <InputLabel>Filtrar por Estado</InputLabel>
                        <Select
                            value={filter}
                            onChange={handleFilterChange}
                            label="Filtrar por Estado"
                        >
                            <MenuItem value="todos">Todos</MenuItem>
                            <MenuItem value="activos">Activos</MenuItem>
                            <MenuItem value="noActivos">No Activos</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nombre Completo</StyledTableCell>
                                <StyledTableCell align="center">Telefono</StyledTableCell>
                                <StyledTableCell align="center">Correo</StyledTableCell>
                                <StyledTableCell align="center">Estado</StyledTableCell>
                                <StyledTableCell align="center">Fecha Nacimiento</StyledTableCell>
                                <StyledTableCell align="center">Comentario</StyledTableCell>
                                <StyledTableCell align="center">Aceptacion TC</StyledTableCell>
                                <StyledTableCell align="center">Ultimo Dia</StyledTableCell>
                                <StyledTableCell align="center">Acciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((row) => (
                                <React.Fragment key={row.idusuario}>
                                    <StyledTableRow>
                                        <StyledTableCell>{`${row.nombre} ${row.apellido}`}</StyledTableCell>
                                        <StyledTableCell align="center">{row.telefono}</StyledTableCell>
                                        <StyledTableCell align="center">{row.correo}</StyledTableCell>
                                        <StyledTableCell align="center">{row.estado === 1 ? 'Activo' : 'No Activo'}</StyledTableCell>
                                        <StyledTableCell align="center">{formatFecha(row.fechanacimiento)}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Comentario || '- - -'}</StyledTableCell>
                                        <StyledTableCell align="center">{row.AceptacionTC === 1 ? 'Aceptado' : 'No Aceptado'}</StyledTableCell>
                                        <StyledTableCell align="center" style={{ color: isMoroso(row.UltimoPago) ? 'red' : 'inherit' }}>
                                            {formatFecha(row.UltimoPago)}
                                            {isMoroso(row.UltimoPago) && <div>Esta Moroso</div>}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button variant="contained" color="primary" onClick={() => handleCollapseToggle(row.idusuario)}>
                                                {openRows[row.idusuario] ? 'Ocultar Acciones' : 'Mostrar Acciones'}
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <TableRow>
                                        <TableCell colSpan={9} style={{ padding: 0 }}>
                                            <Collapse in={openRows[row.idusuario]} timeout="auto" unmountOnExit>
                                                <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
                                                    <Grid container spacing={2} justifyContent="center">
                                                        <Grid item>
                                                            <Button variant="contained" color="primary" onClick={() => handleModify(row.idusuario)}>
                                                                Modificar
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" color="primary" onClick={() => handleContactoEmergencia(row.idusuario)}>
                                                                Contacto Emergencia
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default CustomizedTables;
