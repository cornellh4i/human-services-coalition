import Card from '@mui/material/Card';
import { Typography, Container, createTheme, ThemeProvider, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import UserModal from './UserModal';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import DeleteConfirmation from './DeleteConfirmation';

const UserDisplayCard = ({ user_id, fname, lname, voucher, date, handleDelete }: { user_id: number, fname: string, lname: string, voucher: string, date: Date, handleDelete: (params: any) => any }) => {

  const theme = createTheme({
    typography: {
      fontSize: 13
    }
  })

  // define handle click function
  const navigate = useNavigate();

  //states for the admin modal
  const [openUserMod, setOpenUserMod] = useState(false)

  //states for the delete dialog pop up
  const [openPop, setOpenPop] = useState(false)

  const handleClick = (event: any) => {
    event.stopPropagation()
    setOpenPop(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} sx={{ mt: '10px' }}>
        <Card onClick={() => setOpenUserMod(true)} sx={{ borderRadius: 0, display: 'flex', alignItems: 'center' }}>
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
              onClick={() => navigate("/proof_search", {
                state: {
                  id: user_id,
                  fName: fname,
                  lName: lname,
                  voucherType: voucher,
                  date: date
                }
              })}
              variant="contained"
              startIcon={<AccessTimeIcon />}
              size="small"
              sx={{ padding: "0 5px", fontSize: '0.7rem', textTransform: "unset", borderRadius: '10px', color: 'black', bgcolor: '#D9D9D9', ':hover': { bgcolor: "#D9D9D9B5" } }}>
              View Recents
            </Button>
            <Grid item xs={3} paddingLeft={"7%"}>
              <IconButton onClick={() => navigate('/user-form', { state: { id: { user_id } } })}>
                <EditOutlined fontSize="medium" />
              </IconButton>
              <IconButton onClick={(event) => handleClick(event)}>
                <DeleteOutlined fontSize="medium" />
              </IconButton>
            </Grid>
          </Box>
        </Card >
      </Container>
      <UserModal fname={fname} lname={lname} voucher={voucher} date={date} openUserMod={openUserMod} setOpenUserMod={setOpenUserMod} />
      <DeleteConfirmation id={user_id} openPop={openPop} setOpenPop={setOpenPop} handleDelete={handleDelete} type={"user"} />
    </ThemeProvider>
  );

}

export default UserDisplayCard