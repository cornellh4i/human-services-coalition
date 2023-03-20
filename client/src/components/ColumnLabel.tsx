import { Button, Grid } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ColumnLabel = ({ label, onClick }: { label: string, onClick: () => void }) => {
  return (
    <Grid item display="flex" justifyContent="left" alignItems='center' xs={3}>
      <Button disableElevation
        endIcon={<ArrowDropDownIcon sx={{ fontSize: '80px' }} />}
        size="small"
        onClick={onClick}
        sx={{ textTransform: "unset", color: '#5D737E', bgcolor: '#D9D9D9', fontSize: 15, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
        {label}
      </Button>
    </Grid>
  );
}

export default ColumnLabel