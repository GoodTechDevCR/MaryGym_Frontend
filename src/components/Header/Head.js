import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import PrincipalMenu from '../menu/PrincipalMenu';
import GymImagen from '../../assets/logoMaryGym.jpg'
import { Block } from '@mui/icons-material';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <>
        <header style={styles.header} >
            <div >
                <img src={GymImagen} alt="Gym Image" style={styles.logo}/>
                
                <nav className={isNavOpen ? 'nav-open' : 'nav-closed'}>
                    <a href="/" onClick={closeNav}>Inicio</a>
                    <a href="/" onClick={closeNav}>Rutinas</a>
                    <a href="/" onClick={closeNav}>Usuarios</a>
                    <a href="/" onClick={closeNav}>Pagos</a>
                </nav>
                <button className="nav-btn" onClick={toggleNav}>
                    {isNavOpen ? <FaTimes style={styles.icon} /> : <FaBars style={styles.icon} />}
                </button>
            </div>
            {isNavOpen && (

                    <PrincipalMenu />

            )}
            
        </header>
        <PrincipalMenu />
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
    container: {
        maxWidth: '960px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: '1.5rem',
        color: '#000000',
    },
    principalMenuOverlay: {
        position: 'fixed',
        top: '80px', // Ajusta según el tamaño del header
        left: 0,
        width: '100%',
        height: 'calc(100% - 80px)', // Ajusta según el tamaño del header
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default Header;
