import { useState, useEffect } from 'react'
import { Box, Container, createTheme, Typography, Tab, Tabs } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ManageUsers from '../components/ManageUsers'
import ManageAdmins from '../components/ManageAdmins'
import ConfirmPopUp from '../components/ConfirmPopUp'
import { useLocation, useNavigate } from 'react-router-dom'

const ManageProfiles = () => {
  const theme = createTheme({
    typography: {
      fontSize: 13
    },
    palette: {
      primary: {
        main: "#FF6933"
      }
    }
  })
  theme.typography.h4 = {
    fontSize: '2.0rem',
    fontFamily: "Arial"
  }

  const [Users, setUsers] = useState<any[]>([])
  const [Admins, setAdmins] = useState<any[]>([])

  const [confirmCreateUserPop, setConfirmCreateUserPop] = useState(false)
  const [confirmEditUserPop, setConfirmEditUserPop] = useState(false)
  const [confirmCreateAdminPop, setConfirmCreateAdminPop] = useState(false)
  const [confirmEditAdminPop, setConfirmEditAdminPop] = useState(false)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get("action");
  const type = searchParams.get("type");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admins')
      const json = await response.json()

      if (response.ok) {
        setAdmins(json)
      }
    }
    fetchAdmins()


    if (action === "create" && type === "admin") {
      setConfirmCreateAdminPop(true)
      navigate("/manage-profiles")
    } else if (action === "edit" && type === "admin") {
      setConfirmEditAdminPop(true)
      navigate("/manage-profiles")
    }

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

    if (action === "create" && type === "user") {
      setConfirmCreateUserPop(true)
      navigate("/manage-profiles")
    } else if (action === "edit" && type === "user") {
      setConfirmEditUserPop(true)
      navigate("/manage-profiles")
    }
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
    <><ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <ThemeProvider theme={theme}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: '1%' }}>Manage Profiles</Typography>
          </ThemeProvider>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mr: '2.40%' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: '0.5%' }}>{Users.length.toString()}</Typography>
          <Typography variant="subtitle1" sx={{ mr: '0.5%' }}>Non-Admin Users</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mr: '2.40%' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: '0.5%' }}>{Admins.length.toString()}</Typography>
          <Typography variant="subtitle1" sx={{ mr: '0.5%' }}>Admin Users</Typography>
        </Box>

        <Box>
          <Tabs value={value} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
            <Tab sx={{ borderWidth: "10 rem", borderColor: '#5D737E' }} label="Non-Admin" {...a11yProps(0)} />
            <Tab label="Admin" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box>
          <TabPanel value={value} index={0}>
            <ManageUsers />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ManageAdmins />
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
      <ConfirmPopUp openConfirmPop={confirmCreateUserPop} setConfirmPop={setConfirmCreateUserPop} action="created" type="New User" />
      <ConfirmPopUp openConfirmPop={confirmEditUserPop} setConfirmPop={setConfirmEditUserPop} action="updated" type="User" />
      <ConfirmPopUp openConfirmPop={confirmCreateAdminPop} setConfirmPop={setConfirmCreateAdminPop} action="created" type="New Admin" />
      <ConfirmPopUp openConfirmPop={confirmEditAdminPop} setConfirmPop={setConfirmEditAdminPop} action="updated" type="Admin" />
    </>
  )
}

export default ManageProfiles 