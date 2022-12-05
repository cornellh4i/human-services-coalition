import { useState, useEffect } from 'react'
import { Box, Container, createTheme, Typography, Tab, Tabs } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ManageUsers from '../components/ManageUsers'
import ManageAdmins from '../components/ManageAdmins'

const ManageProfiles = () => {
  const theme = createTheme({
    typography: {
      fontSize: 13
    }
  })
  theme.typography.h4 = {
    fontSize: '2.0rem',
    fontFamily: "Arial"
  }

  const [Users, setUsers] = useState<any[]>([])
  const [Admins, setAdmins] = useState<any[]>([])

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admins')
      const json = await response.json()

      if (response.ok) {
        setAdmins(json)
      }
    }
    fetchAdmins()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const json = await response.json()

      if (response.ok) {
        setUsers(json)
      }
    }
    fetchUsers()
  }, [])

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
          <ThemeProvider theme={theme}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: '1%' }}>Manage Profiles</Typography>
            <Typography variant="subtitle1" sx={{ mt: '1.5%', ml: '71%', fontWeight: 'bold', display: 'fixed' }}>{Users.length.toString()}</Typography>
            <Typography variant="subtitle1" sx={{ mt: '1.5%' }}>Non-Admin Users</Typography>
          </ThemeProvider>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mr: '2.40%' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: '0.5%' }}>{Admins.length.toString()}</Typography>
          <Typography variant="subtitle1" sx={{ mr: '0.5%' }}>Admin Users</Typography>
        </Box>

        <Box >
          <Tabs value={value} onChange={handleTabChange} >
            <Tab sx={{ borderWidth: "10 rem", borderColor: '#5D737E' }} label="Non-Admin" {...a11yProps(0)} />
            <Tab label="Admin" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ManageUsers />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ManageAdmins />
        </TabPanel>
      </Container >
    </ThemeProvider >
  )
}

export default ManageProfiles 