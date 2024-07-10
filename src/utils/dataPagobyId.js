const dataPagobyId = async (pagoId) => {
    try {
        const response = await fetch(`https://marygymbackend-production.up.railway.app/pago/idPago/${pagoId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export default dataPagobyId;