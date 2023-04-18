import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { padding, spacing } from "@mui/system";
import ConfirmPopUp from './ConfirmPopUp';



//interface for declaring what props the PopUp can take
interface DeleteConfirmationProps {
    id: number;
    openPop: boolean;
    setOpenPop: (trigger: boolean) => void;
    handleDelete: (params: any) => any;
    type: string;
}

export default function DeleteConfirmation({ id, openPop, setOpenPop, handleDelete, type }: DeleteConfirmationProps) {

    // function for deleting the listing and clearing the PopUp all in one
    const handlePopUpDelete = () => {
        handleDelete(id)
        setOpenPop(!openPop)

    }

    return (

        <><Dialog
            open={openPop}
            PaperProps={{ sx: { width: '35%', height: '30%', borderRadius: '10px' } }}
        >
            <Grid flexDirection="column">
                <Grid container marginTop="15px">

                    {/* Grid item for the PopUpTitle */}
                    <Grid item xs={15} alignItems="center" flexDirection="row" flexWrap="wrap">
                        <Typography
                            display="flex"
                            sx={{ fontSize: '28px', fontWeight: 700, padding: "30px 40px 0px 40px", alignItems: 'center', textAlign: 'center' }}
                        >
                            Are you sure you want to delete this {type}?
                        </Typography>
                    </Grid>

                    {/* Grid Item for Buttons */}
                    <Grid item xs direction='row' style={{ display: 'flex', justifyContent: "center", alignItems: "center", padding: "8px 0px" }}>
                        <DialogActions>
                            <Button variant='outlined'
                                sx={{ color: "#5D737E", borderColor: "#5D737E", width: 175, textTransform: "none", fontSize: "1.2rem", fontWeight: "bold", borderRadius: "12px", bgcolor: "white", ":hover": { bgcolor: "#5D737EB5" }, padding: "0px 2px" }}
                                onClick={() => setOpenPop(!openPop)}
                            >
                                Cancel
                            </Button>
                            <Button variant='contained'
                                sx={{ color: "#FFFFFF", bgcolor: "#ED5F1E", ':hover': { bgcolor: "#ED5F1EB5" }, textTransform: "none", width: 175, fontSize: "1.2rem", fontWeight: "bold", borderRadius: "12px", padding: "0px 2px" }}
                                onClick={() => handlePopUpDelete()}
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog><ConfirmPopUp id={id} openPop={openPop} action="Deleted" type="Listing" /></>
    )
}
