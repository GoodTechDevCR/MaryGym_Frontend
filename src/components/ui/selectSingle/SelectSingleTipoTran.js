import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UseConsultaTipoTran from "../../../hooks/tipoTranHooks/useConsultaTipoTran";

function SelectSingleTipoTran({ onTipoTranChange }) {
    const dataTipoTran = UseConsultaTipoTran();

    if (!dataTipoTran) return <div>Loading...</div>;

    const opcionTipoTran = dataTipoTran.map(tt => ({
        label: tt.TipoTran,
        value: tt.IdTipoTran
    }));

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={opcionTipoTran}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
                if (newValue) {
                    onTipoTranChange(newValue.value);
                } else {
                    onTipoTranChange(null);
                }
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Tipo Transaccion" />}
        />
    );
}

export default SelectSingleTipoTran;
