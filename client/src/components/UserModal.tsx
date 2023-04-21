import { Box, createTheme, Grid, Modal, ThemeProvider, Typography } from "@mui/material";


interface OpenModalProps {
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
  openUserMod: boolean;
  setOpenUserMod: (trigger: boolean) => void;
}

const theme = createTheme({
  typography: {
    fontSize: 13
  }
})

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '16px',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '5px solid #ED5F1E',
  boxShadow: 24,
  p: 4,
};

export default function UserModal({ fname, lname, mInitial, username, password, voucher, supervisor, birthDate, email, phone, prefName, gender, race, contactPref, date, daysLeft, openUserMod, setOpenUserMod }: OpenModalProps) {

  const handleClose = () => setOpenUserMod(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Modal
          open={openUserMod}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Grid display="flex" flexDirection="column">

              {/* Displays user name as title */}
              <Grid item display="flex" justifyContent="left" xs={12} marginBottom='5%'>
                <Typography variant="h6" component="h1" sx={{ fontWeight: 600, fontSize: "25px" }}>{fname ? fname : ''} {lname ? lname : ''}</Typography>
              </Grid>

              {/* Displays user information */}
              <Grid container display="flex" flexDirection="row" xs={12}>
                <Grid container display="flex" xs={6}>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>First Name:</Typography>
                    &nbsp;
                    <Typography>{fname ? fname : 'N/A'}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Last Name:</Typography>
                    &nbsp;
                    <Typography>{lname ? lname : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Middle Name Initial:</Typography>
                    &nbsp;
                    <Typography>{mInitial ? mInitial : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Preferred Name:</Typography>
                    &nbsp;
                    <Typography>{prefName ? prefName : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Birth Date:</Typography>
                    &nbsp;
                    <Typography>{birthDate ? birthDate.toString().substring(5, 7) + "/" + birthDate.toString().substring(8, 10) + "/" + birthDate.toString().substring(0, 4) : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Gender:</Typography>
                    &nbsp;
                    <Typography>{gender ? gender : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Race:</Typography>
                    &nbsp;
                    <Typography>{race ? race : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12}>
                    <Typography sx={{ fontWeight: 600 }}>Remaining Days:</Typography>
                    &nbsp;
                    <Typography>{daysLeft ? daysLeft : 0}</Typography>
                  </Grid>
                </Grid>
                <Grid container display="flex" xs={6}>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Username:</Typography>
                    &nbsp;
                    <Typography>{username ? username : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Password:</Typography>
                    &nbsp;
                    <Typography>{password ? password : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Voucher Type:</Typography>
                    &nbsp;
                    <Typography>{voucher ? voucher : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Admin Supervisor:</Typography>
                    &nbsp;
                    <Typography>{supervisor ? supervisor : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Email:</Typography>
                    &nbsp;
                    <Typography>{email ? email : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Phone Number:</Typography>
                    &nbsp;
                    <Typography>{phone ? phone : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12} marginBottom='3%'>
                    <Typography sx={{ fontWeight: 600 }}>Contact Preference:</Typography>
                    &nbsp;
                    <Typography>{contactPref ? contactPref : "N/A"}</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="left" xs={12}>
                    <Typography sx={{ fontWeight: 600 }}>Profile Created:</Typography>
                    &nbsp;
                    <Typography>{date.toString().substring(5, 7) + "/" + date.toString().substring(8, 10) + "/" + date.toString().substring(0, 4)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}