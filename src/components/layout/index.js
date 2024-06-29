import React, { useState } from 'react';
import TopMenu from '../topMenu';
import SideMenu from '../sideMenu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';

const Layout = ({ children }) => {
  const router = useRouter();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const isLoginPage = router.pathname === '/login';
  const isRegisterPage = router.pathname === '/register';

  const isExtraLargeScreen = useMediaQuery('(min-width:1600px)');
  const isLargeScreen = useMediaQuery('(min-width:1000px)');
  
  const getContainerPadding = () => {
    if (!isLoginPage && !isRegisterPage) {
      if (isExtraLargeScreen) {
        return '15% !important';
      } else if (isLargeScreen) {
        return '20% !important';
      } else {
        return '24px !important';
      }
    }
  };

  const getContainerPaddingTop = () => {
    if (!isLoginPage && !isRegisterPage) {
      return '50px';
    }

    return '0px';
  };

  return (
    <>
      {!isLoginPage && !isRegisterPage && (
        <TopMenu toggleDrawer={toggleSideMenu} />
      )}
      {!isLoginPage && !isRegisterPage && (
        <SideMenu isOpen={isSideMenuOpen} toggleDrawer={toggleSideMenu} />
      )}
      <Container maxWidth='xg'   sx={{ paddingTop: getContainerPaddingTop(), paddingRight: getContainerPadding() }}>
        <Box mt={4}>
          {/* Renderiza o conteúdo da página */}
          {children}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
