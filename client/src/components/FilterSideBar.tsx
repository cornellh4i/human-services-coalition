import '../css/FilterSideBar.css';
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
import { useState } from "react";
import '../css/Home.css';
import SelectedFilters from '../components/SelectedFilters'

export default function FilterSideBar() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [baths, setBaths] = useState('');
  const [beds, setBeds] = useState('');
  const [transit, setTransit] = useState('');

  //BUG: ERROR WHEN SELECTED IS INITIALIZED EMPTY
  const [selected, setSelected] = useState(['steve']);

  // have to be list
  const [property, setProperty] = useState('');
  const [amenities, setAmenities] = useState('');

  const FilterEnum = {
    location: "location",
    minprice: "minprice",
    maxprice: "maxprice",
    property: "property",
    amenities: "amenities",
    baths: "bath",
    beds: "beds",
    transit: "transit",
  }

  function selectedIndex(word: string) {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].indexOf(word) != -1) {
        return i
      }
    }
    return -1
  }

  function updateSelected(name: string, filterName?: string) {
    let index = selected.indexOf(name)

    // If name is in list, remove it (works for checkboxes)
    if (index > -1) {
      selected.splice(index, 1)
    }

    // For single-select filters
    else if (filterName !== undefined) {
      if (filterName === FilterEnum.baths) {
        if (baths !== '') {
          index = selectedIndex("bath")
          selected.splice(index, 1)
          selected.push(name)
        }
        else {
          selected.push(name)
        }
      }
      else if (filterName === FilterEnum.beds) {
        if (beds !== '') {
          index = selectedIndex("bed")
          selected.splice(index, 1)
          selected.push(name)
        }
        else {
          selected.push(name)
        }
      }
      // BUG: Price is very buggy
      else if (filterName === FilterEnum.minprice) {
        if (minPrice !== '') {
          index = selectedIndex("minimum")
          if(index != -1){
            selected.splice(index, 1)
          }
          selected.push(name)
        }
      }
      else if (filterName === FilterEnum.maxprice) {
        if (maxPrice !== '') {
          index = selectedIndex("maximum")
          if(index != -1){
            selected.splice(index, 1)
          }
          selected.push(name)
        }
      }
      else if (filterName === FilterEnum.location) {
        if (location !== '') {
          index = selectedIndex("Address")
          if(index != -1){
            selected.splice(index, 1)
          }
          selected.push(name)
        }
      }
    }
    else {
      selected.push(name)
    }
  }

  function handleFilterChange(filterName: string, event?: { target: { value: any } }, otherVal?: string) {
    // if (filterName === FilterEnum.location) {
    //   setLocation(event.target.value);
    // }

    if (event !== undefined) {
      if (filterName === FilterEnum.minprice) {
        setMinPrice(event.target.value);
        updateSelected("$" + event.target.value + " minimum", filterName);
      } else if (filterName === FilterEnum.maxprice) {
        setMaxPrice(event.target.value);
        updateSelected("$" + event.target.value + " maximum", filterName);
      } else if (filterName === FilterEnum.transit) {
        setTransit(event.target.value);
        updateSelected(event.target.value + " proximity");
      } else if (filterName === FilterEnum.baths) {
        // BUG: need to make sure setBaths is called first
        setBaths(event.target.value);
        if (event.target.value > 1) {
          updateSelected(event.target.value + " baths", filterName);
        }
        else {
          updateSelected(event.target.value + " bath", filterName);
        }
      } else if (filterName === FilterEnum.beds) {
        setBeds(event.target.value);
        if (event.target.value > 1) {
          updateSelected(event.target.value + " beds", filterName);
        }
        else {
          updateSelected(event.target.value + " bed", filterName);
        }
      }
      else if (filterName === FilterEnum.location){
        setLocation(event.target.value);
        updateSelected("Address: " + event.target.value, filterName);
      }
    }
    else if (otherVal !== undefined) {
      if (filterName === FilterEnum.property) {
        setProperty(otherVal);
        updateSelected(otherVal);
      } else if (filterName === FilterEnum.amenities) {
        setAmenities(otherVal);
        updateSelected(otherVal);
      }
    }
  }

  let state = {
    categories: {
      apartment: false,
      condo: false,
      house: false,
      utilitiesIncluded: false,
      fullFurnished: false,
      petFriendly: false
    }
  };

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
        <SelectedFilters filters={selected} > </SelectedFilters >
        <Box className='box' component="span">
          <h3 className='text'>Location</h3>
          <TextField size="small" id="outlined-basic" label="Search by address" variant="outlined" 
          onChange={(e) => handleFilterChange(FilterEnum.location, e)}
          />
        </Box>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Price</h3>
          <TextField className='prices' size="small" id="outlined-basic" label="min" variant="outlined"
            onChange={(e) => handleFilterChange(FilterEnum.minprice, e)} />
          <h3 className='dash'> – </h3>
          <TextField className='prices' size="small" id="outlined-basic" label="max" variant="outlined"
            onChange={(e) => handleFilterChange(FilterEnum.maxprice, e)}
          />
        </Box>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Property Type</h3>
          <FormGroup>
            <Grid container spacing={1} columns={16}>
              <Grid item xs={'auto'}>
                <FormControlLabel control={<Checkbox
                  onChange={() => handleFilterChange(FilterEnum.amenities, undefined, "Apartment")}
                />}
                  label={<h4 className='prop-text'>Apartment</h4>}
                />
              </Grid>
              <Grid item xs={'auto'}>
                <FormControlLabel control={<Checkbox
                  onChange={() => handleFilterChange(FilterEnum.amenities, undefined, "House")}
                />} label={<h4 className='prop-text'>House</h4>} />
              </Grid>
            </Grid>
            <Grid container spacing={1} columns={16}>
              <Grid item xs={'auto'}>
                <FormControlLabel control={<Checkbox
                  onChange={() => handleFilterChange(FilterEnum.amenities, undefined, "Condo")}
                />} label={<h4 className='prop-text'>Condo</h4>} />
              </Grid>
              <Grid item xs={'auto'}>
                <FormControlLabel control={<Checkbox
                  onChange={() => handleFilterChange(FilterEnum.amenities, undefined, "Single Room")}
                />} label={<h4 className='prop-text'>Single Room</h4>} />
              </Grid>
            </Grid>
          </FormGroup>
          <FormControl style={{ paddingRight: 10 }} className='dropdown' size="small">
            <InputLabel id="num-beds-label"># beds</InputLabel>
            <Select
              labelId="num-beds-label"
              id="num-beds"
              label="# beds"
              onChange={(e) =>
                handleFilterChange(FilterEnum.beds, e)}
            >
              <MenuItem value={'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
              <MenuItem value={'3'}>3</MenuItem>
              <MenuItem value={'4'}>4</MenuItem>
              <MenuItem value={'5'}>5</MenuItem>
              <MenuItem value={'6'}>6</MenuItem>

            </Select>
          </FormControl>
          <FormControl className='dropdown' size="small">
            <InputLabel id="num-baths-label"># baths</InputLabel>
            <Select
              labelId="num-baths-label"
              id="num-baths"
              label="# baths"
              onChange={(e) =>
                handleFilterChange(FilterEnum.baths, e)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid >
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Amenities</h3>
          <FormGroup>
            <FormControlLabel control={<Checkbox
              onChange={() => handleFilterChange(FilterEnum.amenities, undefined, "Utilities included")} />}
              label={<h4 className='prop-text'>Utilities included</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox
              onChange={() => handleFilterChange(FilterEnum.amenities, undefined, "Fully furnished")} />}
              label={<h4 className='prop-text'>Fully furnished</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox
              onChange={() => handleFilterChange(FilterEnum.amenities, undefined, "Pet-friendly")} />}
              label={<h4 className='prop-text'>Pet-friendly</h4>} />
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
              onChange={(e) => handleFilterChange(FilterEnum.transit, e)}
            >
              <MenuItem value={"Close"}>Close</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Far"}>Far</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <h2></h2>
      <>
      </>
    </Box >


  )
}