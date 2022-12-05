import '../css/FilterSideBar.css'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  createTheme,
  responsiveFontSizes
} from '@mui/material/styles'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export default function FilterSideBar() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <Box sx={{
      flexGrow: 1,
      position: "fixed",
      width: '23%',
      height: 600,
      left: 16,
      top: 103,
      background: "#FFFFFF",
      boxShadow: "0px 4px 4px rgba(93, 115, 126, 0.5)",
      borderRadius: 10,
      overflow: 'auto',
      pl: 3,
      pt: 1
    }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <h2 className='title'>Filters</h2>
        </Grid>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Location</h3>
          <TextField size="small" id="outlined-basic" label="Search by address" variant="outlined" />
        </Box>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Price</h3>
          <TextField className='prices' size="small" id="outlined-basic" label="min" variant="outlined" />
          <h3 className='dash'> – </h3>
          <TextField className='prices' size="small" id="outlined-basic" label="max" variant="outlined" />
        </Box>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Property Type</h3>
          <FormGroup>
            <Grid container spacing={1} columns={16}>
              <Grid item xs={8}>
                <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>Apartment</h4>} />
              </Grid>
              <Grid item xs={8}>
                <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>House</h4>} />
              </Grid>
            </Grid>
          </FormGroup>
          <FormControl style={{ paddingRight: 10 }} className='dropdown' size="small">
            <InputLabel id="num-beds-label"># beds</InputLabel>
            <Select
              labelId="num-beds-label"
              id="num-beds"
              label="# beds"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6+</MenuItem>
            </Select>
          </FormControl>
          <FormControl className='dropdown' size="small">
            <InputLabel id="num-baths-label"># baths</InputLabel>
            <Select
              labelId="num-baths-label"
              id="num-baths"
              label="# baths"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6+</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid >
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Amenities</h3>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>Utilities included</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>Fully furnished</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>Pet-friendly</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>In-unit laundry</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>Wifi</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>Carpet</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>Wood flooring</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<h4 className='prop-text'>Full-kitchen</h4>} />
          </FormGroup>
        </Box>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Proximity to Public Transit</h3>
          <FormControl sx={{ width: 200 }} size="small">
            <InputLabel id="demo-select-small">Select Proximity</InputLabel>
            <Select
              autoWidth
              labelId="demo-select-small"
              id="demo-select-small"
              label="Select Proximity"
            >
              <MenuItem value={"Close"}>Close</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Far"}>Far</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <h2></h2>
    </Box >
  )
}