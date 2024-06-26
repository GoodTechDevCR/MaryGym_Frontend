const dataUserbyId = async (userId) => {
    try {
        const response = await fetch(`http://25.7.30.30:4000/usuario/${userId}`);
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

export default dataUserbyId;