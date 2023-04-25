import { useState, useEffect } from 'react'
import { Box, Container, createTheme, Typography, Tab, Tabs } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ManageVouchers from '../components/ManageVouchers'
import ManageUsers from '../components/ManageUsers'
import ManageAdmins from '../components/ManageAdmins'
import ConfirmPopUp from '../components/ConfirmPopUp'
import { useLocation, useNavigate } from 'react-router-dom'
import VoucherForm from '../components/VoucherForm'

const Vouchers = () => {
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

  const [Vouchers, setVouchers] = useState<any[]>([])

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
    const fetchVouchers = async () => {
      const response = await fetch('/api/vouchers')
      const json = await response.json()

      if (response.ok) {
        setVouchers(json)
      }
    }
    fetchVouchers()
  }
  )

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <ThemeProvider theme={theme}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: '1%' }}>Vouchers</Typography>
          </ThemeProvider>
        </Box>
        <Box>
          <ManageVouchers />
          <VoucherForm />
        </Box>
      </Container>
    </ThemeProvider>


  )
}

export default Vouchers