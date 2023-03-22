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
import '../css/Home.css';

export default function FilterSideBar({
  setListings, filters, setFilters, apartment, setApartment, house, setHouse,
  address, setAddress, condo, setCondo, single, setSingle, numBath, setNumBath,
  numBed, setNumBed, utilities, setUtilities, furnished, setFurnished, pets,
  setPets, disTransportation, setDisTransportation, minPrice, setMinPrice,
  maxPrice, setMaxPrice }: any) {
    
  let selected: any = [...filters]
  let theme = createTheme()
  theme = responsiveFontSizes(theme)

  const FilterEnum = {
    address: "address",
    apartment: "apartment",
    house: "house",
    condo: "condo",
    single: "single",
    numBath: "numBath",
    numBed: "numBed",
    pets: "pets",
    utilities: "utilities",
    furnished: "furnished",
    disTransportation: "disTransportation",
    minPrice: "minPrice",
    maxPrice: "maxPrice",
  }

  function updateQuery(filterList: any) {
    let params: any = {}

    for (let i = 0; i < filterList.length; i++) {
      let currFilter = filterList[i].filter
      let currVal = filterList[i].value
      params[currFilter] = currVal
    }

    const searchParams = new URLSearchParams(Object.entries(params))
    fetch('/api/listingsByCategory?' + searchParams)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.error(error))
  }

  function selectedIndex(filter: string) {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].filter === filter) {
        return i
      }
    }
    return -1
  }

  function updateSelected(filter: string, value: any, filterState: any) {
    let index = 0

    if (filter === FilterEnum.address) {
      index = selectedIndex(filter)
      if (index != -1) {
        if (selected[index].value !== value && value !== "") {
          selected.splice(index, 1)
          selected.push({ "filter": filter, "value": value })
        }
        else if (value === "") {
          selected.splice(index, 1)
        }
      }
      else {
        selected.push({ "filter": filter, "value": value })
      }
    }

    else if (filter === FilterEnum.minPrice) {
      index = selectedIndex(filter)
      let max_index = selectedIndex(FilterEnum.maxPrice)
      let max_val = 3000

      if (max_index != -1) {
        max_val = selected[max_index].value
      }

      if (index != -1) {
        if (selected[index].value !== +value && value !== "" && +value <= max_val && +value != 0) {
          selected.splice(index, 1)
          selected.push({ "filter": filter, "value": +value })
        }
        else if (value === "") {
          selected.splice(index, 1)
        }
      }
      else {
        if (+value <= max_val && +value != 0) {
          selected.push({ "filter": filter, "value": +value })
        }
      }
    }

    else if (filter === FilterEnum.maxPrice) {
      index = selectedIndex(filter)
      let min_index = selectedIndex(FilterEnum.minPrice)
      let min_val = 1

      if (min_index != -1) {
        min_val = selected[min_index].value
      }

      if (index != -1) {
        if (selected[index].value !== +value && value !== "" && +value >= min_val && +value != 0) {
          selected.splice(index, 1)
          selected.push({ "filter": filter, "value": +value })
        }
        else if (value === "") {
          selected.splice(index, 1)
        }
      }
      else {
        if (+value >= min_val && +value != 0) {
          selected.push({ "filter": filter, "value": +value })
        }
      }
    }

    // for checkboxes (unit type + amenities)
    else if (filter === FilterEnum.utilities || filter === FilterEnum.furnished
      || filter === FilterEnum.pets || filter === FilterEnum.apartment || filter
      === FilterEnum.house || filter === FilterEnum.condo || filter ===
      FilterEnum.single) {
      index = selectedIndex(filter)

      if (index != -1) {
        selected.splice(index, 1)

        if (filter === FilterEnum.house) {
          setHouse(false)
        }
        else if (filter === FilterEnum.apartment) {
          setApartment(false)
        }
        else if (filter === FilterEnum.condo) {
          setCondo(false)
        }
        else if (filter === FilterEnum.single) {
          setSingle(false)
        }
        else if (filter === FilterEnum.utilities) {
          setUtilities(false)
        }
        else if (filter === FilterEnum.furnished) {
          setFurnished(false)
        }
        else if (filter === FilterEnum.pets) {
          setPets(false)
        }
      }
      else {
        selected.push({ "filter": filter, "value": value })
      }
    }

    // For dropdown filters (Proximity, Beds, Baths)
    else {
      index = selectedIndex(filter)
      if (index != -1) {
        selected.splice(index, 1)
        selected.push({ "filter": filter, "value": value })
      }
      else {
        selected.push({ "filter": filter, "value": value })
      }
    }

    setFilters(selected)
    updateQuery(selected)
  }

  function handleFilterChange(filterName: string, filterState: any, setFunction: Function,
    event: { target: { value: any } }) {
    if (filterName === FilterEnum.minPrice) {
      var currMinPrice = event.target.value.replace(/^0+/, "")
      let currMinPriceString = '' + currMinPrice
      if (currMinPriceString.includes('e') || currMinPriceString.includes('-')
        || currMinPriceString.includes('.')) {
        currMinPrice = ''
        event.target.value = currMinPrice
        setFunction(currMinPrice)
      }
      if (currMinPrice > 3000) {
        currMinPrice = currMinPrice.slice(0, 4)
        if (currMinPrice <= 3000) {
          event.target.value = currMinPrice
          setFunction(currMinPrice)
          updateSelected(filterName, currMinPrice, minPrice)
        }
        else {
          currMinPrice = currMinPrice.slice(0, 3)
          event.target.value = currMinPrice
          setFunction(currMinPrice)
          updateSelected(filterName, currMinPrice, minPrice)
        }
      }
      setFunction(currMinPrice)
      updateSelected(filterName, currMinPrice, minPrice)

    } else if (filterName === FilterEnum.maxPrice) {
      var currMaxPrice = event.target.value.replace(/^0+/, "")
      let currMaxPriceString = '' + currMaxPrice
      if (currMaxPriceString.includes('e') || currMaxPriceString.includes('-')
        || currMaxPriceString.includes('.')) {
        currMaxPrice = ''
        event.target.value = currMaxPrice
        setFunction(currMaxPrice)
      }
      if (currMaxPrice > 3000) {
        currMaxPrice = currMaxPrice.slice(0, 4)
        if (currMaxPrice <= 3000) {
          event.target.value = currMaxPrice
          setFunction(currMaxPrice)
          updateSelected(filterName, currMaxPrice, maxPrice)
        }
        else {
          currMaxPrice = currMaxPrice.slice(0, 3)
          event.target.value = currMaxPrice
          setFunction(currMaxPrice)
          updateSelected(filterName, currMaxPrice, maxPrice)
        }
      }
      setFunction(currMaxPrice)
      updateSelected(filterName, currMaxPrice, maxPrice)
    }

    else if (filterName === FilterEnum.disTransportation || filterName ===
      FilterEnum.numBath || filterName === FilterEnum.numBed || filterName ===
      FilterEnum.pets || filterName === FilterEnum.utilities || filterName ===
      FilterEnum.furnished || filterName === FilterEnum.address || filterName
      === FilterEnum.apartment || filterName === FilterEnum.house ||
      filterName === FilterEnum.condo || filterName ===
      FilterEnum.single) {
      setFunction(event.target.value)
      updateSelected(filterName, event.target.value, filterState)
    }
  }

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
          <TextField size="small" id="outlined-basic" label="Search by address" variant="outlined"
            onChange={(e) => handleFilterChange(FilterEnum.address, address, setAddress, e)}
          />
        </Box>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Price</h3>
          <TextField
            value={minPrice}
            className='prices'
            size="small"
            id="outlined-basic"
            label="min"
            variant="outlined"
            type="number"
            helperText="up to $3000"
            onChange={(e) => handleFilterChange(FilterEnum.minPrice, minPrice, setMinPrice, e)} />
          <h3 className='dash'> – </h3>
          <TextField
            value={maxPrice}
            className='prices'
            size="small"
            id="outlined-basic"
            label="max"
            variant="outlined"
            type="number"
            helperText="up to $3000"
            onChange={(e) => handleFilterChange(FilterEnum.maxPrice, maxPrice, setMaxPrice, e)}
          />
        </Box>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Property Type</h3>
          <FormGroup>
            <Grid container spacing={1} columns={16}>
              <Grid item xs={'auto'}>
                <FormControlLabel control={<Checkbox checked={apartment}
                  onChange={(e) => handleFilterChange(FilterEnum.apartment, apartment, setApartment, e)}
                />}
                  label={<h4 className='prop-text'>Apartment</h4>}
                />
              </Grid>
              <Grid item xs={'auto'}>
                <FormControlLabel control={<Checkbox checked={house}
                  onChange={(e) => handleFilterChange(FilterEnum.house, house, setHouse, e)}
                />} label={<h4 className='prop-text'>House</h4>} />
              </Grid>
            </Grid>
            <Grid container spacing={1} columns={16}>
              <Grid item xs={'auto'}>
                <FormControlLabel control={<Checkbox checked={condo}
                  onChange={(e) => handleFilterChange(FilterEnum.condo, condo, setCondo, e)}
                />} label={<h4 className='prop-text'>Condo</h4>} />
              </Grid>
              <Grid item xs={'auto'}>
                <FormControlLabel control={<Checkbox checked={single}
                  onChange={(e) => handleFilterChange(FilterEnum.single, single, setSingle, e)}
                />} label={<h4 className='prop-text'>Single Room</h4>} />
              </Grid>
            </Grid>
          </FormGroup>
          <FormControl style={{ paddingRight: 10 }} className='dropdown' size="small">
            <InputLabel id="num-beds-label"># Beds</InputLabel>
            <Select
              value={numBed}
              labelId="num-beds-label"
              id="num-beds"
              label="# Beds"
              onChange={(e) =>
                handleFilterChange(FilterEnum.numBed, numBed, setNumBed, e)}>
              <MenuItem value={'0'}>Studio</MenuItem>
              <MenuItem value={'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
              <MenuItem value={'3'}>3</MenuItem>
              <MenuItem value={'4'}>4</MenuItem>
              <MenuItem value={'5'}>5</MenuItem>
              <MenuItem value={'6'}>6</MenuItem>
            </Select>
          </FormControl>
          <FormControl className='dropdown' size="small">
            <InputLabel id="num-baths-label"># Baths</InputLabel>
            <Select
              value={numBath}
              labelId="num-baths-label"
              id="num-baths"
              label="# Baths"
              onChange={(e) =>
                handleFilterChange(FilterEnum.numBath, numBath, setNumBath, e)}>
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
              checked={utilities}
              onChange={(e) => handleFilterChange(FilterEnum.utilities, utilities, setUtilities, e)} />}
              label={<h4 className='prop-text'>Utilities Included</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox
              checked={furnished}
              onChange={(e) => handleFilterChange(FilterEnum.furnished, furnished, setFurnished, e)} />}
              label={<h4 className='prop-text'>Fully Furnished</h4>} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel control={<Checkbox
              checked={pets}
              onChange={(e) => handleFilterChange(FilterEnum.pets, pets, setPets, e)} />}
              label={<h4 className='prop-text'>Pet-Friendly</h4>} />
          </FormGroup>
        </Box>
      </Grid>
      <Grid>
        <Box className='box' component="span">
          <h3 className='text'>Proximity to Public Transit</h3>
          <FormControl sx={{ width: 200 }} size="small">
            <InputLabel id="demo-select-small">Select Proximity</InputLabel>
            <Select
              value={disTransportation}
              autoWidth
              labelId="demo-select-small"
              id="demo-select-small"
              label="Select Proximity"
              onChange={(e) => handleFilterChange(FilterEnum.disTransportation,
                disTransportation, setDisTransportation, e)}>
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
    </Box >)
}