import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UseConsultaPago from '../../hooks/pagoHooks/useConsultaPago';

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

function TablaPagoForUser({ idUsuario }) {
    const { data, loading, error } = UseConsultaPago(idUsuario);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Verifica si `data` es un arreglo y si tiene elementos
    if ( data.length === 0) {
        return (
            <div>
                <p>No hay pagos registrados para el usuario.</p>
            </div>
        );
    }

    return (
        <div>
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Fecha Pago</StyledTableCell>
                            <StyledTableCell align="right">Tipo Transacción</StyledTableCell>
                            <StyledTableCell align="right">Monto</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.IdPago}>
                                <StyledTableCell align="right">{new Date(row.FechaPago).toLocaleDateString()}</StyledTableCell>
                                <StyledTableCell align="right">{row.TipoTran}</StyledTableCell>
                                <StyledTableCell align="right">{row.Monto}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TablaPagoForUser;
