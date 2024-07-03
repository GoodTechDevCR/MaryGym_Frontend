// InformacionUserSc.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const InformacionUserSc = () => {
    const { id } = useParams();

    console.log("id a mostrar: ", id);

    return (
        <div>
            <h1>InformacionUserSc</h1>
            <p>ID recibido: {id}</p> 
        </div>
    );
};

export default InformacionUserSc;   );
}