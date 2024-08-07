import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout'; // Importando o ícone de logout
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { useLogoutHandler } from "@/hooks/useLogoutHandler";
import GenericModal from '../genericModal';
import ConfigModalContent from '../genericModal/configModalContent';

const SideMenu = ({ isOpen, toggleDrawer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { handleLogout } = useLogoutHandler();

  const theme = useTheme();
  const router = useRouter();

  const isExtraLargeScreen = useMediaQuery('(min-width:1600px)');
  const isLargeScreen = useMediaQuery('(min-width:1000px)');
  const isMediumScreen = useMediaQuery('(min-width:620px)');

  const handleNavigation = (route) => {
    window.location.href = route;
    toggleDrawer();
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
          zIndex: 900,
        },
      }}
    >
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <img src="/logo/Logo Vertical - Png - Com cor .png" alt="Logo" style={{ maxWidth: '130px', height: 'auto' }} />
      </div>
      <List sx={{ color: 'white' }}>
        <ListItem button onClick={() => handleNavigation('/feed')}>
          <ListItemIcon>
            <HomeIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Página inicial" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/feed?friends=1')}>
          <ListItemIcon>
            <PeopleIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Postagens de amigos" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/profile')}>
          <ListItemIcon>
            <PersonIcon  style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Meu perfil" />
        </ListItem>
        <ListItem button  onClick={handleOpenModal}>
          <ListItemIcon>
            <SettingsIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItem>
        <GenericModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ConfigModalContent
              onClose={handleCloseModal}
          />
        </GenericModal>
      </List>
      <Box sx={{ flexGrow: 1 }} /> {/* This will push the logout button to the bottom */}
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          startIcon={<LogoutIcon />} // Adicionando o ícone de logout
        >
          Sair
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
