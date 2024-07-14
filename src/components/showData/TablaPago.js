import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SelectSingleUsuario from "../ui/selectSingle/SelectSingleUsuario";
import UseConsultaPago from "../../hooks/pagoHooks/useConsultaPago";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Collapse, Grid } from '@mui/material';

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
    // Remove the white strip between rows
    '& > *': {
        borderBottom: 'unset',
    },
}));

function TablaPago() {
    const [selectedUser, setSelectedUser] = useState(null);
    const { data, loading, error } = UseConsultaPago(selectedUser);
    const navigate = useNavigate();
    const [openRows, setOpenRows] = useState({});

    const handleModify = (id) => {
        navigate(`/admin/pago/modificar/${id}`);
    };

    const handleUsuarioChange = (id) => {
        setSelectedUser(id);
    };

    const handleCollapseToggle = (id) => {
        setOpenRows((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Box sx={{ mb: 2 }}>
                <p> Para visualizar los pagos de un usuario en específico, selecciónelo: </p>
            </Box>
            <Box sx={{ mb: 4 }}>
                <SelectSingleUsuario onUsuarioChange={handleUsuarioChange} />
            </Box>
            {data && (
                <TableContainer component={Paper} sx={{ maxWidth: '80%', margin: '0 auto' }}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Nombre Usuario</StyledTableCell>
                                <StyledTableCell align="center">Fecha Pago</StyledTableCell>
                                <StyledTableCell align="center">Tipo Transaccion</StyledTableCell>
                                <StyledTableCell align="center">Monto</StyledTableCell>
                                <StyledTableCell align="center">Acciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <React.Fragment key={row.IdPago}>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">{row.NombreUsuario}</StyledTableCell>
                                        <StyledTableCell align="center">{row.FechaPago}</StyledTableCell>
                                        <StyledTableCell align="center">{row.TipoTran}</StyledTableCell>
                                        <StyledTableCell align="center">{row.Monto}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="contained" color="primary" onClick={() => handleCollapseToggle(row.IdPago)}>
                                                {openRows[row.IdPago] ? 'Ocultar Acciones' : 'Mostrar Acciones'}
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <TableRow>
                                        <TableCell colSpan={5} style={{ padding: 0 }}>
                                            <Collapse in={openRows[row.IdPago]} timeout="auto" unmountOnExit>
                                                <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
                                                    <Grid container spacing={2} justifyContent="center">
                                                        <Grid item>
                                                            <Button variant="contained" color="primary" onClick={() => handleModify(row.IdPago)}>
                                                                Modificar
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
            )}
        </Box>
    );
}

export default TablaPago;
