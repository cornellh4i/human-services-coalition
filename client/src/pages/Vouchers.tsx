import { Box, Container, createTheme, Typography } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import ManageVouchers from '../components/ManageVouchers'
import VoucherForm from '../forms/VoucherForm'

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