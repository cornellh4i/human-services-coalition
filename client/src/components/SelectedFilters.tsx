import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import '../css/Home.css'

export default function SelectedFilters(props: any) {
  const { filters } = props

  return (
    <>
      <Grid container spacing={3} paddingBottom={2} paddingLeft={2}>
        {
        filters.map((filter: string) =>
          <Grid item xs="auto" paddingLeft={2}>
            <div className="item">
              <Box>
                {filter}
                <IconButton>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Box>
            </div>
          </Grid>)}
      </Grid>
    </>
  )
}