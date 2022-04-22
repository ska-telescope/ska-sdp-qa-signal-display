import styled from "@emotion/styled";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DashboardNavbarRoot = styled(AppBar)(() => ({
  //
}));

export const DashboardNavbar = (props) => {
  const { ...other } = props;

  return (
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: "calc(100% - 280px)"
          }
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            backgroundColor: "background.default"
          }}
        >
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="User">
            <IconButton sx={{ ml: 1 }}>
              <AccountCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
  );
};
