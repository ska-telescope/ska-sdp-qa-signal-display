import { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from './dashboard-sidebar';

const SIDEBAR_WIDTH = 250;

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDEBAR_WIDTH,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false);

  const handleSidebarClose = useCallback((): void => setIsSidebarMobileOpen(false), []);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardSidebar onMobileClose={handleSidebarClose} openMobile={isSidebarMobileOpen} />
    </>
  );
};
