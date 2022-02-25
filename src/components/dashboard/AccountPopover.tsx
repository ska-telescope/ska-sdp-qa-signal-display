import React from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Avatar, Box, Button, ButtonBase, Popover, Typography } from '@material-ui/core';
import useAuth from '../../hooks/useAuth';

const AccountPopover: FC = () => {
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 32,
            width: 32,
          }}
        />
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography color="textPrimary" variant="subtitle2">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            {user.email}
          </Typography>
        </Box>
        {/*
        <Divider />

        <Box sx={{ mt: 2 }}>
          <MenuItem component={RouterLink} to="/user/profile">
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Profile
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem component={RouterLink} to="/user/settings">
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="textPrimary" variant="subtitle2">
                  Settings
                </Typography>
              }
            />
          </MenuItem>
        </Box>
            */}
        <Box sx={{ p: 2 }}>
          <Button color="primary" fullWidth onClick={handleLogout} variant="outlined">
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default AccountPopover;
