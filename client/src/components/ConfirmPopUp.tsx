import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { Card, CardContent } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


// Interface for declaring what props the PopUp can take
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
      clearTimeout(timeoutId);
    };
  }, [openConfirmPop]);

  const message = `${type} successfully ${action}!`;

  return (
    <>
      <Dialog
        open={openConfirmPop}
        BackdropProps={{ style: { backgroundColor: 'transparent' }, }}
        maxWidth="sm"
        fullWidth={true}
        PaperProps={{
          sx: {
            width: "98%",
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
  )
}