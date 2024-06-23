import React from 'react';
import useFetchCatEje from '../hooks/useFetchCatEje';

const CatEjePage = () => {
    const { data, loading, error } = useFetchCatEje();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>CatEje Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default CatEjePage;
