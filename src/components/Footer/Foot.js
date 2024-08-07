import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p>© 2024 MaryGym. Todos los derechos reservados.</p>
                <p>Contacto: goodtechdev@gmail.com</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px 0',
        position: 'bottom',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        marginTop: 'auto',
    },
    container: {
        maxWidth: '960px',
        margin: 'auto',
    },
};

export default Footer;
