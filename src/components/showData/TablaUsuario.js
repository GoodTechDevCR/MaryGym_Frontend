import * as React from 'react';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function CustomizedTables() {
    const data = UseConsultaUsuario(); // Usar la función useFetchUsuario para obtener los datos
    const navigate = useNavigate();

    if (!data) return <div>Loading...</div>;

    const handleModify = (id) => {
        // Redirigir a la página de modificación con el id del usuario
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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>IdUsuario</StyledTableCell>
                        <StyledTableCell>Nombre Completo</StyledTableCell>
                        <StyledTableCell align="center">Telefono</StyledTableCell>
                        <StyledTableCell align="center">Correo</StyledTableCell>
                        <StyledTableCell align="center">Estado</StyledTableCell>
                        <StyledTableCell align="center">Fecha Nacimiento</StyledTableCell>
                        <StyledTableCell align="center">Comentario</StyledTableCell>
                        <StyledTableCell align="center">Aceptacion TC</StyledTableCell>
                        <StyledTableCell align="center">Ultimo Dia</StyledTableCell>
                        <StyledTableCell align="center">Acciones</StyledTableCell> {/* Nueva columna para el botón */}
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => {
                        return (
                            <StyledTableRow key={row.idusuario}>
                                <StyledTableCell>{row.idusuario}</StyledTableCell>
                                <StyledTableCell>{`${row.nombre} ${row.apellido}`}</StyledTableCell>
                                <StyledTableCell align="center">{row.telefono}</StyledTableCell>
                                <StyledTableCell align="center">{row.correo}</StyledTableCell>
                                <StyledTableCell align="center">{row.estado === 1 ? 'Activo' : 'NO activo'}</StyledTableCell>
                                <StyledTableCell align="center">{formatFecha(row.fechanacimiento)}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.Comentario || '- - -'}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.AceptacionTC === 1 ? 'Aceptado' : 'No Aceptado'}</StyledTableCell>
                                <StyledTableCell align="center" style={{ color: isMoroso(row.UltimoPago) ? 'red' : 'inherit' }}>
                                    {formatFecha(row.UltimoPago)}
                                    {isMoroso(row.UltimoPago) && <div>Esta Moroso</div>}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" color="primary" onClick={() => handleModify(row.idusuario)}>
                                        Modificar
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => handleContactoEmergencia(row.idusuario)}>
                                        Contacto Emergencia
                                    </Button>
                                </StyledTableCell>
                                
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomizedTables;
