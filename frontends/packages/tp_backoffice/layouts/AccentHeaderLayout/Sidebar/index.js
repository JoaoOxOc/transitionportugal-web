import { useContext } from 'react';
import Scrollbar from '../../../components/Scrollbar';
import { SidebarContext } from '../../../contexts/SidebarContext';

import { Box, Drawer, styled, Divider, useTheme } from '@mui/material';

import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import SidebarTopSection from './SidebarTopSection';
import Logo from '../../../components/LogoSign';
import { useSession } from "next-auth/react";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 61px;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
          height: calc(100% - ${theme.header.height});
          margin-top: ${theme.header.height};
        }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        margin: ${theme.spacing(2)};
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();
  const { data: session, status } = useSession();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0
        }}
      >
        <Scrollbar>
          <TopSection>
            <SidebarTopSection />
          </TopSection>
            <Divider
                sx={{
                  background: theme.colors.alpha.black[10]
                }}
              />
          <SidebarMenu session={session} />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.black[10]
          }}
        />
        <SidebarFooter />
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper>
          <Scrollbar>
            <TopSection>
              <Box
                sx={{
                  width: 52,
                  ml: 1,
                  mt: 1,
                  mb: 3
                }}
              >
                <Logo />
              </Box>
              <SidebarTopSection />
            </TopSection>
              <Divider
                sx={{
                  background: theme.colors.alpha.black[10]
                }}
              />
            <SidebarMenu />
          </Scrollbar>
          <Divider
          sx={{
            background: theme.colors.alpha.black[10]
          }}
        />
          <SidebarFooter />
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
