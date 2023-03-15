import { Box, createTheme, Grid, Modal, ThemeProvider, Typography } from "@mui/material";


interface OpenModalProps {
  fname: string
  lname: string
  voucher: string
  date: Date
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
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserModal({ fname, lname, voucher, date, openUserMod, setOpenUserMod }: OpenModalProps) {

  // const [open, setOpenAdminMod] = React.useState(false);
  const handleOpen = () => setOpenUserMod(true);
  const handleClose = () => setOpenUserMod(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Modal
          open={openUserMod}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Grid container display="flex" flexDirection="row">
              <Grid item display="flex" justifyContent="left" xs={12}>
                <Typography variant="h6" component="h2">{fname} {lname}</Typography>
              </Grid>
              <Grid item display="flex" justifyContent="left" xs={12}>
                <Typography>Voucher Type: {voucher}</Typography>
              </Grid>
              <Grid item display="flex" justifyContent="left" xs={12}>
                <Typography>Profile Created: {date.toString().substring(5, 7) + "/" + date.toString().substring(8, 10) + "/" + date.toString().substring(0, 4)}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}