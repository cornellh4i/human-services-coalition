import { Button, Grid } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const ColumnLabel = ({ label, ascending }: { label: string, ascending: boolean }) => {
  if (ascending) {
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
  else {
    return (
      <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
        <Button disableElevation
          endIcon={<ArrowDropUpIcon sx={{ fontSize: '80px' }} />}
          size="small"
          sx={{ textTransform: "unset", color: '#5D737E', fontSize: 15, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
          {label}
        </Button>
      </Grid>
    );
  }
}

export default ColumnLabel