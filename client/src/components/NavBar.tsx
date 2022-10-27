// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Human Services Coalition
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Users</Button>
          <Button color="inherit">Admins</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}