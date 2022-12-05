import Card from '@mui/material/Card';
import { Typography, Container, createTheme, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';

const UserDisplayCard = ({ fname, lname, voucher, date }: { fname: string, lname: string, voucher: string, date: Date }) => {

  const theme = createTheme({
    typography: {
      fontSize: 13
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} sx={{ mt: '10px' }}>
        <Card sx={{ maxWidth: '100%', borderRadius: 0, display: 'flex', alignItems: 'center' }}>
          <Grid container item xs={9} md={9} sx={{ padding: '1rem 0' }}>
            <Grid container spacing={12}>
              <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
                <Typography sx={{ ml: '10%' }}>{fname}</Typography>
              </Grid>
              <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
                <Typography>{lname}</Typography>
              </Grid>
              <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
                <Typography>{voucher}</Typography>
              </Grid>
              <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
                <Typography>{date.toString().substring(5, 7) + "/" + date.toString().substring(8, 10) + "/" + date.toString().substring(0, 4)}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "right", alignItems: 'center', marginLeft: '1.4rem', width: '15rem' }}>
            <Button
              variant="contained"
              startIcon={<AccessTimeIcon />}
              size="small"
              sx={{ padding: "0 5px", fontSize: '0.7rem', textTransform: "unset", borderRadius: '10px', color: 'black', bgcolor: '#D9D9D9', ':hover': { bgcolor: "#D9D9D9B5" } }}>
              View Recents
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              size="small"
              sx={{ marginLeft: "10px", padding: "0 5px", fontSize: '0.7rem', textTransform: "unset", borderRadius: '10px', color: 'black', bgcolor: '#D9D9D9', ':hover': { bgcolor: "#D9D9D9B5" } }}>
              Edit
            </Button>
          </Box>
        </Card >
      </Container>
    </ThemeProvider>
  );

}

export default UserDisplayCard