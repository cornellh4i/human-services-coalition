import Card from '@mui/material/Card';
import { Typography, Container, createTheme, ThemeProvider, IconButton, StepIconClassKey } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import AdminModal from './AdminModal';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import DeleteConfirmation from './DeleteConfirmation';

interface VoucherDisplayCardProps {
  voucherID: number
  name: string
  percentage: number
  handleDelete: (params: any) => any
}

const VoucherDisplayCard = ({ voucherID, name, percentage, handleDelete }: VoucherDisplayCardProps) => {

  const theme = createTheme({
    typography: {
      fontSize: 13
    }
  })

  // define handle click function
  //const navigate = useNavigate();

  //states for the delete dialog pop up
  const [openPop, setOpenPop] = useState(false)

  const handleClick = (event: any) => {
    event.stopPropagation()
    setOpenPop(true)
  }



  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} sx={{ mt: '10px' }}>
        <Card sx={{ maxWidth: '100%', borderRadius: 0, display: 'flex', alignItems: 'center' }}>
          <Grid container item xs={9} md={9} sx={{ padding: '1rem 0' }}>
            <Grid container spacing={12}>
              <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
                <Typography sx={{ ml: '10%' }}>{name}</Typography>
              </Grid>
              <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
                <Typography>{percentage}% </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "right", alignItems: 'center', marginLeft: '1.4rem', width: '15rem' }}>
            <Grid item xs={3}>
              <IconButton onClick={(event) => handleClick(event)}>
                <DeleteOutlined fontSize="medium" />
              </IconButton>
            </Grid>
          </Box>
        </Card >
      </Container>
      <DeleteConfirmation id={voucherID} openPop={openPop} setOpenPop={setOpenPop} handleDelete={handleDelete} type={"Voucher"} />
    </ThemeProvider>



  );

}

export default VoucherDisplayCard