import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactComponent as Logo } from '../assets/coclogo.svg';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['Create New', 'Manage Profiles', 'Update FMR'];
const forms = ['Listing', 'User', 'Admin'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElForms, setAnchorElForms] = React.useState<null | HTMLElement>(null);
  const [anchorElLogout, setAnchorElLogout] = React.useState<null | HTMLElement>(null);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenFormMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElForms(event.currentTarget);
  };
  const handleOpenLogoutMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLogout(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseFormMenu = () => {
    handleCloseNavMenu();
    setAnchorElForms(null);
  };

  const handleCloseLogoutMenu = () => {
    setAnchorElLogout(null);
  };

  // Navigation functionality
  const navigate = useNavigate();

  const navigateToProfiles = () => {
    handleCloseNavMenu();
    navigate("/manage-profiles");
  };

  const navigateToFMRForm = () => {
    handleCloseFormMenu();
    navigate('/fmr-form');
  };

  const navigateToListingForm = () => {
    handleCloseFormMenu();
    if (window.location.href.indexOf('listing-form') > -1) {
      navigate('/listing-form');
      window.location.reload();
    }
    else navigate('/listing-form');
  };

  const navigateToUserForm = () => {
    handleCloseFormMenu();
    if (window.location.href.indexOf('user-form') > -1) {
      navigate('/user-form');
      window.location.reload();
    }
    else navigate('/user-form');
  };

  const navigateToAdminForm = () => {
    handleCloseFormMenu();
    if (window.location.href.indexOf('admin-form') > -1) {
      navigate('/admin-form');
      window.location.reload();
    }
    else navigate('/admin-form');
  };

  return (
    <AppBar position="sticky" elevation={0} style={{ background: "white", borderBottom: '1px solid #D9D9D9' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Compressed View */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: "orange" }}
            >
              <MenuIcon />
            </IconButton>

            {/* Links Menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}
                  onClick={page === "Create New" ? handleOpenFormMenu : page === "Manage Profiles" ? navigateToProfiles : page == "Update FMR" ? navigateToFMRForm : handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ p: 0, flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Button
              component={Link} to="/"
              sx={{ width: 300, p: 0, border: 0, justifyContent: "flex-start" }}>
              <Logo height={75} href="" />
            </Button>
          </Box>


          {/* Expanded View */}
          <Box sx={{ p: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link} to="/"
              sx={{ width: 300, p: 0, border: 0, justifyContent: "flex-start" }}>
              <Logo height={75} href="" />
            </Button>
          </Box>

          <Box sx={{
            flexGrow: 1, justifyContent: 'right', display: { xs: 'none', md: 'flex' },
            padding: 0
          }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={page === "Create New" ? handleOpenFormMenu : page === "Manage Profiles" ? navigateToProfiles : page == "Update FMR" ? navigateToFMRForm : handleOpenNavMenu}
                sx={{
                  textTransform: 'none',
                  '&:hover': { fontWeight: 'bold' }, fontSize: 16, my: 2, color: '#737171',
                  display: 'block', fontFamily: "'Poppins', sans-serif"
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="large"
              onClick={handleOpenLogoutMenu}
              sx={{ color: "orange" }}
            >
              <LogoutIcon />
            </IconButton>

            {/* Logout Menu */}
            <Menu
              id="logout-appbar"
              anchorEl={anchorElLogout}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElLogout)}
              onClose={handleCloseLogoutMenu}
            >
              <MenuItem>
                <Typography sx={{ color: "orange" }} textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Forms Menu */}
          <Menu
            sx={{ mt: "45px" }}
            id="forms-appbar"
            anchorEl={anchorElForms}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElForms)}
            onClose={handleCloseFormMenu}
          >
            {forms.map((form) => (
              <MenuItem
                key={form}
                onClick={form === "Listing" ? navigateToListingForm : form === "Admin" ? navigateToAdminForm : form === 'User' ? navigateToUserForm : handleCloseFormMenu}
              >
                <Typography textAlign="left" margin='5px'>{form}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default ResponsiveAppBar;
