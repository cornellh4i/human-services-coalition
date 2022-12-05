import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as Logo } from '../assets/coclogo.svg';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const pages = ['Create New', 'Manage Profiles', 'Update FMR'];
const settings = ['Listing', 'User', 'Admin'];

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
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" elevation={0} style={{ background: "white", borderBottom: '1px solid #D9D9D9' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box textAlign={'left'}
            sx={{ p: 0 }}>
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
                component={Link} to={page === "Manage Profiles" ? 'manage-profiles' : '' }
                key={page}
                onClick={page === "Create New" ? handleOpenUserMenu : handleOpenNavMenu}
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
              {settings.map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={handleCloseUserMenu} 
                  component={Link} 
                  to={setting === "Listing" ? 'listing-form' : "User" ? 'user-form' : "Admin" ? 'admin-form' : ''}
                >
                  <Typography className='text' textAlign="center">{setting}</Typography>
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
