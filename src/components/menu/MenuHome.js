import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import LogInSc from '../../pages/Home/LogInSc';
import HomeScreen from '../../pages/Home/HomeScreen';
import PrecioSc from '../../pages/Home/PrecioSc';
import ContactoSc from '../../pages/Home/ContactoSc';

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
      {value <= index && <Box sx={{ p: 0}}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function MenuHome() {
  const [value, setValue] = React.useState(3);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div sx={{ borderBottom: 1, borderColor: 'divider'}}>
      
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" dir="rtl">
            <Tab icon = {<LoginIcon />}  iconPosition="end"  label="Ingresar"/>
            <Tab label="Contacto" />
            <Tab label="Precios"  />
            <Tab label="Inicio"  />
        </Tabs>
      </div>
     
      <CustomTabPanel value={value} index={0}>
          <LogInSc/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <ContactoSc/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
          <PrecioSc/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
          <HomeScreen/>
      </CustomTabPanel>
      </>
    
  );
}


export default MenuHome;
