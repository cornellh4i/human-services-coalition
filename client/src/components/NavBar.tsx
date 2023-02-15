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
import { ReactComponent as Logo } from '../assets/coclogo.svg';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';

const pages = ['Create New', 'Manage Profiles', 'Update FMR'];
const forms = ['Listing', 'User', 'Admin'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    handleCloseNavMenu();
    setAnchorElUser(null);
  };

  // Navigation functionality
  const navigate = useNavigate();

  const navigateToProfiles = () => {
    handleCloseNavMenu();
    navigate("/manage-profiles");
  };

  return (
    <AppBar position="sticky" elevation={0} style={{ background: "white", borderBottom: '1px solid #D9D9D9' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box textAlign={'left'} sx={{ p: 0, display: { xs: 'none', md: 'flex' }}}>
            <Button
              component={Link} to="/"
              sx={{ width: 300, p: 0, border: 0, justifyContent: "flex-start" }}>
              <Logo height={75} href="" />
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
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
                <MenuItem key={page} onClick={page === "Create New" ? handleOpenUserMenu : page === "Manage Profiles" ? navigateToProfiles : handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ p: 0, display: { xs: 'flex', md: 'none' }}}>
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
                onClick={page === "Create New" ? handleOpenUserMenu : page === "Manage Profiles" ? navigateToProfiles : handleOpenNavMenu}
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
            <div className="log-out-button">
              <Button className='log-out-text'
                style={{
                  textTransform: 'none',
                  backgroundColor: "#E8E8E8",
                  color: "#737171",
                  fontSize: 16
                }}
                variant="contained"
              >Log Out</Button>
            </div>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {forms.map((form) => (
                <MenuItem 
                  key={form} 
                  onClick={handleCloseUserMenu} 
                  component={Link} 
                  to={form === "Listing" ? 'listing-form' : form === "Admin" ? 'admin-form' : form === 'User' ? 'user-form' : ''}
                >
                  <Typography className='text' textAlign="left" margin='5px'>{form}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default ResponsiveAppBar;
