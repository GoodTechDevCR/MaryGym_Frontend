import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p>© 2024 MaryGym. Todos los derechos reservados.</p>
                <p>Contacto: info@tucompania.com</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px 0',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
    },
    container: {
        maxWidth: '960px',
        margin: '0 auto',
    },
};

export default Footer;
