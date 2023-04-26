import { Box, Container, Divider, Grid, InputAdornment, FormControl, TextField, Select, MenuItem, SelectChangeEvent, Typography, createTheme, ThemeProvider } from '@mui/material'
import VoucherDisplayCard from './VoucherDisplayCard'
import ColumnLabel from '../components/ColumnLabel'
import { useState, useEffect } from 'react'
import ConfirmPopUp from './ConfirmPopUp';

const ManageVouchers = () => {
  const [Vouchers, setVouchers] = useState<any[]>([])
  const [confirmDeletePop, setConfirmDeletePop] = useState(false)

  const theme = createTheme({
    typography: {
      fontSize: 7
    },
    palette: {
      primary: {
        main: "#FF6933"
      }
    }
  })
  theme.typography.h4 = {
    fontSize: '1.0rem',
    fontFamily: "Arial"
  }

  useEffect(() => {
    const fetchVouchers = async () => {
      const response = await fetch('/api/vouchers')
      const json = await response.json()

      if (response.ok) {
        setVouchers(json)
      }
    }
    fetchVouchers()
  }, [])

  // The function that calls the delete routing function
  const handleDelete = async (id: any) => {
    await fetch('/api/vouchers/' + id, {
      method: 'DELETE'
    })
    // After we delete we must update the local state
    const newVouchers = Vouchers.filter(Voucher => Voucher._id != id)
    setVouchers(newVouchers)
    setConfirmDeletePop(true)
  }

  return (
    <><Box sx={{
      mt: '1%',
      maxWidth: '100%',
      p: '0.5%'
    }}>

      <Container maxWidth={false} sx={{ mt: '10px', maxWidth: '100%', borderRadius: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      </Container>

      <Container maxWidth={false} sx={{ borderRadius: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'left' }}>

        <ThemeProvider theme={theme}>
          <Grid container spacing={"10%"}>
            <Grid item sx={{}}>
              <Typography variant="h4" sx={{ fontWeight: 'normal', fontStyle: 'italic', mt: '1%' }}> Voucher Name </Typography>
            </Grid>
            <Grid item sx={{}}>
              <Typography variant="h4" sx={{ fontWeight: 'normal', fontStyle: 'italic', mt: '1%' }}> Percentage </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>

      </Container>

      <div className="vouchers">
        {Vouchers && Vouchers.map((Voucher) => (
          <div>
            <VoucherDisplayCard
              name={Voucher.name}
              percentage={Voucher.percentage}
              voucherID={Voucher._id}
              handleDelete={handleDelete} />
            <Divider variant="middle" sx={{ marginTop: '0.5rem', bgcolor: 'black' }} />
          </div>
        ))}
      </div>
    </Box>
      <ConfirmPopUp openConfirmPop={confirmDeletePop} setConfirmPop={setConfirmDeletePop} action="deleted" type="Voucher" />
    </>
  )
}

export default ManageVouchers