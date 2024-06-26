import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import HomeScreen from '../../pages/Home/HomeScreen';
import PrecioSc from '../../pages/Home/PrecioSc';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MenuHome() {
  const [value, setValue] = React.useState(4);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <Box sx={{ width: '100%' }}>
      <header sx={{ borderBottom: 1, borderColor: 'divider'}}>
      
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" dir="rtl">
           
            <Tab icon = {<LoginIcon />}  iconPosition="end"  label="Ingresar" {...a11yProps(2)} />
            <Tab label="Contacto" {...a11yProps(0)} />
            <Tab label="Precios" {...a11yProps(2)} />
            <Tab label="Nosotros" {...a11yProps(1)} />
            <Tab label="Inicio" {...a11yProps(0)} />
        </Tabs>
      </header>
     
      <CustomTabPanel value={value} index={0}>
        Ingresar
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Contacto
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PrecioSc/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Nosotros
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <HomeScreen/>
        Hola
      </CustomTabPanel>
      
    </Box>
    
  );
}


export default MenuHome;
