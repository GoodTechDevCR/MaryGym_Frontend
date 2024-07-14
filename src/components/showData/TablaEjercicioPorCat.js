import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ConsultaEjercicioByCat from "../../hooks/ejercicioHooks/useConsultaEjercicioByCat";

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

function TablaEjercicioPorCat({ categoria }) {
    const cat = categoria || 0;
    const data = ConsultaEjercicioByCat(cat);

    // Función para renderizar la tabla
    const renderTable = () => {
        if (!data) return <div>Loading...</div>;

        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Nombre</StyledTableCell>
                            <StyledTableCell align='center'>Categoria</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.IdEjercicio}>
                                <StyledTableCell align='center'>{row.Nombre}</StyledTableCell>
                                <StyledTableCell align='center'>{row.nombreCat}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <div>
            {renderTable()}
        </div>
    );
}

export default TablaEjercicioPorCat;
