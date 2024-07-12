import React from 'react';
import GymImagen from '../../assets/logoMaryGym.jpg'

function HeadAdmin () {
    return (
        <>
        <header style={styles.header} >
            <div >
                <img src={GymImagen} alt="Gym Image" style={styles.logo}/>
            </div>
        </header>
        </>
        
    );
};

const styles = {
    header: {
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: '20px',
        width: '100%',
        /*position: 'fixed',*/
        alignItems: 'center',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    },
    logo: {
        display:'center',
        width:'auto',
        height:'50px',
        color: '#000000',
        textDecoration: 'none',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
};

export default HeadAdmin;