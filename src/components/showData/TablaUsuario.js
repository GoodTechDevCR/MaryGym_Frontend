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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>IdUsuario</StyledTableCell>
                        <StyledTableCell>Nombre Completo</StyledTableCell>
                        <StyledTableCell align="right">Telefono</StyledTableCell>
                        <StyledTableCell align="right">Correo</StyledTableCell>
                        <StyledTableCell align="right">Saldo</StyledTableCell>
                        <StyledTableCell align="right">Estado</StyledTableCell>
                        <StyledTableCell align="right">Fecha Nacimiento</StyledTableCell>
                        <StyledTableCell align="right">Acciones</StyledTableCell> {/* Nueva columna para el botón */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.idusuario}>
                            <StyledTableCell>{row.idusuario}</StyledTableCell>
                            <StyledTableCell>{`${row.nombre} ${row.apellido}`}</StyledTableCell>
                            <StyledTableCell align="right">{row.telefono}</StyledTableCell>
                            <StyledTableCell align="right">{row.correo}</StyledTableCell>
                            <StyledTableCell align="right">{row.saldo}</StyledTableCell>
                            <StyledTableCell align="right">{row.estado === 1 ? 'Activo' : 'NO activo'}</StyledTableCell>
                            <StyledTableCell align="right">{row.fechanacimiento}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button variant="contained" color="primary" onClick={() => handleModify(row.idusuario)}>
                                    Modificar
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomizedTables;
