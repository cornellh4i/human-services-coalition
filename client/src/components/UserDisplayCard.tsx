import Card from '@mui/material/Card';
import { Typography, Container, createTheme, ThemeProvider, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';
import UserModal from './UserModal';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import DeleteConfirmation from './DeleteConfirmation';

interface UserDisplayCardProps {
  user_id: number
  fname: string
  lname: string
  mInitial: string
  username: string
  password: string
  voucher: string
  supervisor: string
  birthDate: Date
  email: string
  phone: string
  prefName: string
  gender: string
  race: string
  contactPref: string
  date: Date
  daysLeft: number
  handleDelete: (params: any) => any
}

const UserDisplayCard = ({ user_id, fname, lname, mInitial, username, password, voucher, supervisor, birthDate, email, phone, prefName, gender, race, contactPref, date, daysLeft, handleDelete }: UserDisplayCardProps) => {

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
              onClick={() => navigate("/applied_listings", {
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
              sx={{ padding: "0 5px", fontSize: '0.7rem', textTransform: "unset", borderRadius: '10px', color: 'white', bgcolor: '#FF6933', ':hover': { bgcolor: "#FF8D33" } }}>
              Search History
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
      <UserModal fname={fname} lname={lname} mInitial={mInitial} username={username} password={password} voucher={voucher} supervisor={supervisor} birthDate={birthDate} email={email} phone={phone} prefName={prefName} gender={gender} race={race} contactPref={contactPref} date={date} daysLeft={daysLeft} openUserMod={openUserMod} setOpenUserMod={setOpenUserMod} />
      <DeleteConfirmation id={user_id} openPop={openPop} setOpenPop={setOpenPop} handleDelete={handleDelete} type={"user"} />
    </ThemeProvider>
  );

}

export default UserDisplayCard