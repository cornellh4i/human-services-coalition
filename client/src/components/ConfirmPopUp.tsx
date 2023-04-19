import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { padding, spacing } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Card, CardContent, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { open } from "fs/promises";


//interface for declaring what props the PopUp can take
interface ConfirmationProps {
  setConfirmPop: (trigger: boolean) => void;
  openConfirmPop: boolean;
  action: string;
  type: string
}

export default function ConfirmPopUp({ openConfirmPop, setConfirmPop, action, type }: ConfirmationProps) {

  const handleClose = () => {
    setConfirmPop(false)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => {
      console.log("ConfirmPopUp unmounted!");
      clearTimeout(timeoutId);
    };
  }, [openConfirmPop]);

  const message = `${type} Successfully ${action}!`;

  return (
    <>
      {console.log('ConfirmPopUp rendered')}
      <Dialog
        open={openConfirmPop}
        maxWidth="sm"
        fullWidth={true}
        PaperProps={{
          sx: {
            width: "95%",
            maxWidth: "unset",
            position: "absolute",
            top: "8%"
          },
        }}
      >
        <Card sx={{ borderLeft: '6px solid #ED5F1E', height: '80%' }}>
          <CardContent sx={{ justifyContent: 'center' }}>
            {/* adjust height from 2vh to make the popup taller/shorter */}
            <Grid container direction='row' justifyContent='center' alignItems='center' width='100%' height="2vh" >
              <Grid container xs={10}>
                <Grid item xs={1} sx={{ marginLeft: '10px' }}>
                  <CheckCircleIcon sx={{ color: "#ED5F1E" }}></CheckCircleIcon>
                </Grid>
                <Grid item xs={8} sx={{ fontFamily: "'Poppins', sans-serif", fontStyle: 'italic', fontWeight: 600, paddingInlineEnd: '3px' }}>
                  {message}
                </Grid>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined'
                  sx={{ color: "#ED5F1E", borderColor: "#ED5F1E", width: 90, fontStyle: 'italic', textTransform: "none", fontSize: "0.9rem", fontWeight: "bold", borderRadius: "12px", borderWidth: '3px', bgcolor: "white", ":hover": { bgcolor: "#5D737EB5" }, padding: "0px 2px" }}
                  onClick={() => {
                    handleClose()
                  }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Dialog>

    </>


    // <Snackbar
    //   open={openPop}
    //   autoHideDuration={2000}
    //   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    //   onClose={() => setOpenPop(!openPop)}
    //   action={
    //     <IconButton size="small" color="inherit" onClick={() => setOpenPop(!openPop)}>
    //       <CloseIcon />
    //     </IconButton>
    //   }
    //   sx={{ maxWidth: '100%' }}
    // >
    //   <Card sx={{ borderLeft: '6px solid #ED5F1E' }}>
    //     <CardContent sx={{ justifyContent: 'center' }}>
    //       <Grid>
    //         <Grid container flexDirection='row' justifyContent='center' alignItems='center'>
    //           <Grid item xs={1}>
    //             <CheckCircleIcon sx={{ color: "#ED5F1E" }}></CheckCircleIcon>
    //           </Grid>
    //           <Grid item xs={8} sx={{ fontFamily: "'Poppins', sans-serif", fontStyle: 'italic', fontWeight: 600, paddingInlineEnd: '3px' }}>
    //             {message}
    //           </Grid>
    //           <Grid item xs={3} alignItems='flex-end'>
    //             <Button variant='outlined'
    //               sx={{ color: "#ED5F1E", borderColor: "#ED5F1E", width: 90, fontStyle: 'italic', textTransform: "none", fontSize: "0.9rem", fontWeight: "bold", borderRadius: "12px", borderWidth: '3px', bgcolor: "white", ":hover": { bgcolor: "#5D737EB5" }, padding: "0px 2px" }}
    //               onClick={() => setOpenPop(!openPop)}
    //             >
    //               Close
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </CardContent>
    //   </Card>
    // </Snackbar>

  )
}