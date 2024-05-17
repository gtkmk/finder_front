import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

const SideMenu = ({ isOpen, toggleDrawer }) => {
  const theme = useTheme();
  const router = useRouter();
  const isExtraLargeScreen = useMediaQuery('(min-width:1600px)');
  const isLargeScreen = useMediaQuery('(min-width:1000px)');
  const isMediumScreen = useMediaQuery('(min-width:620px)');

  const handleNavigation = (route) => {
    router.push(route);
    toggleDrawer(); // Fecha o menu lateral após clicar em um item
  };
  
  const getImageWidth = () => {
    if (isExtraLargeScreen) {
      return '15%';
    } else if (isLargeScreen) {
      return '20%';
    } else if (isMediumScreen) {
      return '35%';
    } else {
      return '50%';
    }
  };


  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      variant={isLargeScreen ? 'permanent' : 'temporary'}
      anchor="right"
      sx={{
        width: getImageWidth(),
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: theme.palette.primary.main,
          width: getImageWidth(),
        },
      }}
    >
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <img src="/logo/Logo Vertical - Png - Com cor .png" alt="Logo" style={{ maxWidth: '130px', height: 'auto' }} />
      </div>
      <List>
        <ListItem button onClick={() => handleNavigation('/feed')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Página inicial" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
