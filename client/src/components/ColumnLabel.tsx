import { Button, Grid } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ColumnLabel = ({ label }: { label: string }) => {
  return (
    <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
      <Button disableElevation
        endIcon={<ArrowDropDownIcon sx={{ fontSize: '80px' }} />}
        size="small"
        sx={{ textTransform: "unset", color: '#5D737E', fontSize: 15, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
        {label}
      </Button>
    </Grid>
  );
}

export default ColumnLabel