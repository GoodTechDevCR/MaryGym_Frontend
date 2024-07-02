import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UseConsultaContEme from '../../hooks/contactoEmergenciaHooks/useConsultaContEme';

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

function TablaContactoEmergencia(id) {
    console.log("prueba prueba prueba: ",id.id)
    const data = UseConsultaContEme(id.id);
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            {data && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>IdContatoEmergencia</StyledTableCell>
                                <StyledTableCell align="right">Nombre</StyledTableCell>
                                <StyledTableCell align="right">Numero Telefono</StyledTableCell>
                                <StyledTableCell align="right">Relacion</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row.IdContEmer}>
                                    <StyledTableCell>{row.IdContEmer}</StyledTableCell>
                                    <StyledTableCell align="right">{row.Nombre}</StyledTableCell>
                                    <StyledTableCell align="right">{row.NumeroTelefono}</StyledTableCell>
                                    <StyledTableCell align="right">{row.Relacion}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default TablaContactoEmergencia;