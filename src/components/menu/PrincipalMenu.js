import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import DataIcon from '@mui/icons-material/DataUsage';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function PrincipalMenu() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key="login" disablePadding>
                    <ListItemButton component={Link} to="/login">
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ir a Login" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="data" disablePadding>
                    <ListItemButton component={Link} to="/data">
                        <ListItemIcon>
                            <DataIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ir a mostrar data" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="data" disablePadding>
                    <ListItemButton component={Link} to="/date">
                        <ListItemIcon>
                            <DataIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ir a date picker" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open Menu</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default PrincipalMenu;
