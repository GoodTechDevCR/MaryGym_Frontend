import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogInSc from '../../pages/Home/LogInSc';
import HomeScreen from '../../pages/Home/HomeScreen';
import PrecioSc from '../../pages/Home/PrecioSc';
import ContactoSc from '../../pages/Home/ContactoSc';
import GymImagen from '../../assets/logoMaryGym.jpg';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function MenuHome() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <header style={isSmallScreen ? styles.headerSmall : styles.header}>
        <img src={GymImagen} alt="Gym Image" style={styles.logo} />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="inherit"
          indicatorColor="primary"
          sx={{
            minHeight: isSmallScreen ? '50px' : '100px',
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tab label="Inicio" sx={{ minHeight: isSmallScreen ? '50px' : '100px', minWidth: '100px' }} />
          <Tab label="Precios" sx={{ minHeight: isSmallScreen ? '50px' : '100px', minWidth: '100px' }} />
          <Tab label="Contacto" sx={{ minHeight: isSmallScreen ? '50px' : '100px', minWidth: '100px' }} />
          <Tab icon={<LoginIcon />} label="Ingresar" sx={{ minHeight: isSmallScreen ? '50px' : '100px', minWidth: '100px' }} />
        </Tabs>
      </header>

      <CustomTabPanel value={value} index={0}>
        <HomeScreen />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PrecioSc />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ContactoSc />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <LogInSc />
      </CustomTabPanel>
    </>
  );
}

const styles = {
  header: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '0px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  headerSmall: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: '0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    width: 'auto',
    height: '50px',
    marginLeft: '10px',
  },
};

export default MenuHome;
