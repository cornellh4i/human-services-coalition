import { Box, Button, Card, createTheme, Grid, Modal, ThemeProvider, Typography } from "@mui/material";
import React from "react";


interface OpenModalProps {
  fname: string
  lname: string
  affiliation: string
  date: Date
  openAdminMod: boolean;
  setOpenAdminMod: (trigger: boolean) => void;
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

export default function AdminModal({ fname, lname, affiliation, date, openAdminMod, setOpenAdminMod }: OpenModalProps) {

  // const [open, setOpenAdminMod] = React.useState(false);
  const handleOpen = () => setOpenAdminMod(true);
  const handleClose = () => setOpenAdminMod(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Modal
          open={openAdminMod}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Grid container display="flex" flexDirection="row">
              <Grid item display="flex" justifyContent="left" xs={12}>
                <Typography variant="h6" component="h2">{fname}, {lname}</Typography>
              </Grid>
              <Grid item display="flex" justifyContent="left" xs={12}>
                <Typography>Affiliation: {affiliation}</Typography>
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