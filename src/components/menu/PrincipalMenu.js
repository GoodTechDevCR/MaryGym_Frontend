import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate} from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import UserContext from '../../UserContext';


function PrincipalMenu() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { logout } = React.useContext(UserContext);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <Divider/>
            <List>
                <ListItem key="Admin Home" disablePadding>
                    <ListItemButton component={Link} to="/admin">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admin Home" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem key="Rutina Ejercicios" disablePadding>
                    <ListItemButton component={Link} to="/admin/crearRutina">
                        <ListItemIcon>
                            <FitnessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Rutina Ejercicios" />
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem key="Visualizar Ejercicios" disablePadding>
                    <ListItemButton component={Link} to="/admin/ejeDisp">
                        <ListItemIcon>
                            <FitnessCenterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Visualizar Ejercicios" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="Registrar Usuario" disablePadding>
                    <ListItemButton component={Link} to="/admin/usuario/registrar">
                        <ListItemIcon>
                            <PersonAddAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Registrar Usuario" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Visualizar Usuario" disablePadding>
                    <ListItemButton component={Link} to="/admin/usuario/visualizar">
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="Visualizar Usuario" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="Registrar Pago" disablePadding>
                    <ListItemButton component={Link} to="/admin/pago/registrar">
                        <ListItemIcon>
                            <AddShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Registrar Pago" />
                    </ListItemButton>
                </ListItem>
                
                <ListItem key="Visualizar Pago" disablePadding>
                    <ListItemButton component={Link} to="/admin/pago/visualizar">
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Visualizar Pago" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key="Log Out" disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton aria-label="Menu" onClick={toggleDrawer(true)} >
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default PrincipalMenu;
