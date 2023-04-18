import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { padding, spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


//interface for declaring what props the PopUp can take
interface ConfirmationProps {
  id: number;
  openPop: boolean;
  action: string;
  type: string
}

export default function ConfirmPopUp({ id, openPop, action, type }: ConfirmationProps) {


  //states for the delete dialog pop up
  const [openPopp, setOpenPop] = useState(false)

  return (

    <Dialog
      open={openPop}
      PaperProps={{ sx: { width: '35%', height: '30%', borderRadius: '10px' } }}
      hideBackdrop={true}
    >
      <Grid flexDirection="column">
        <Grid container marginTop="15px">

          {/* Grid item for the PopUpTitle */}
          <Grid item xs={15} alignItems="center" flexDirection="row" flexWrap="wrap">
            <Typography
              display="flex"
              sx={{ fontSize: '28px', fontWeight: 700, padding: "30px 40px 0px 40px", alignItems: 'center', textAlign: 'center' }}
            >
              {type} Succesfully {action}
            </Typography>
          </Grid>

          {/* Grid Item for Buttons */}
          <Grid item xs direction='row' style={{ display: 'flex', justifyContent: "center", alignItems: "center", padding: "8px 0px" }}>
            <DialogActions>
              <Button variant='outlined'
                sx={{ color: "#5D737E", borderColor: "#5D737E", width: 175, textTransform: "none", fontSize: "1.2rem", fontWeight: "bold", borderRadius: "12px", bgcolor: "white", ":hover": { bgcolor: "#5D737EB5" }, padding: "0px 2px" }}
                onClick={() => setOpenPop(!openPop)}
              >
                Close
              </Button>

            </DialogActions>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  )
}
