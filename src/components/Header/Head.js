import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import PrincipalMenu from '../menu/PrincipalMenu';
import GymImagen from '../../assets/logoMaryGym.jpg'

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
        <header style={styles.header}>
            <div stryle = {styles.container} >
                <img src={GymImagen} alt="Gym Image" style={styles.logo}/>
            </div>
            {isNavOpen && (
                    <PrincipalMenu />
            )}
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#000000',
        color: '#000000',
        padding: '0px',
        width: '100%',
        top: 0,
        left: 0,
        alignItems: 'center',
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
