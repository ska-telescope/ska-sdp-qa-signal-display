import type { FC } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "./Logo";

interface MainNavbarProps {
  onSidebarMobileOpen?: () => void;
}

const MainNavbar: FC<MainNavbarProps> = (props) => {
  const { onSidebarMobileOpen } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.secondary",
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              md: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <RouterLink to="/">
          <Logo
            sx={{
              display: {
                md: "inline",
                xs: "none",
              },
              height: 40,
              width: 40,
            }}
          />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            alignItems: "center",
            display: {
              md: "flex",
              xs: "none",
            },
          }}
        >
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/dashboard/overview"
            underline="none"
            variant="body1"
          >
            Dashboard
          </Link>
          <Divider
            orientation="vertical"
            sx={{
              height: 32,
              mx: 2,
            }}
          />
          <Button
            color="primary"
            component="a"
            href="/contact"
            size="small"
            target="_blank"
            variant="contained"
          >
            Contact
          </Button>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func,
};

export default MainNavbar;