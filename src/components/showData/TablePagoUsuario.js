import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useConsultaPago from '../../hooks/pagoHooks/useConsultaPago';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const TableWrapper = styled(TableContainer)(({ theme }) => ({
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(3),
}));

function TablaPagoForUser({ idUsuario }) {
    const { data, loading, error } = useConsultaPago(idUsuario);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (data.length === 0) {
        return (
            <div>
                <p>No hay pagos registrados para el usuario.</p>
            </div>
        );
    }

    return (
        <TableWrapper component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Fecha Pago</StyledTableCell>
                        <StyledTableCell align="center">Tipo Transacción</StyledTableCell>
                        <StyledTableCell align="center">Monto</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.IdPago}>
                            <StyledTableCell align="center">{new Date(row.FechaPago).toLocaleDateString()}</StyledTableCell>
                            <StyledTableCell align="center">{row.TipoTran}</StyledTableCell>
                            <StyledTableCell align="center">{row.Monto}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableWrapper>
    );
}

export default TablaPagoForUser;
