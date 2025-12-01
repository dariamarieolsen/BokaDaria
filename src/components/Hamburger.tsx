import { Drawer } from '@mui/material';
import '../styles/header.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';

export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Home', 'Login'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => window.location.href = index === 0 ? '/' : 'login'}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <HomeIcon /> : <LoginIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );
    return (
        <>
            <div className="hamburger">
                <button onClick={() => setIsOpen(!isOpen)} className="hamburger-button" aria-expanded={isOpen} aria-label="Menu">
                    <MenuIcon aria-label={isOpen ? "Close menu" : "Open menu"} />
                </button>
            </div>
            {isOpen && (
                <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            )}
        </>
    )
}