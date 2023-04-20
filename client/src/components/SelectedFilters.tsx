import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import '../css/Home.css'
import Link from '@mui/material/Link';

export default function SelectedFilters({
  setListings, filters, setFilters, setApartment, setHouse, setAddress,
  setCondo, setSingle, setNumBath, setNumBed, setUtilities, setFurnished,
  setPets, setDisTransportation, setMinPrice, setMaxPrice }: any) {

  let selected: any = [...filters]
  let values: any[] = []

  function updateQuery(filterList: any) {
    let params: any = {}

    for (let i = 0; i < filterList.length; i++) {
      let currFilter = filterList[i].filter
      let currVal = filterList[i].value
      params[currFilter] = currVal
    }
    console.log(params)
    const searchParams = new URLSearchParams(Object.entries(params))
    fetch('/api/listingsByCategory?' + searchParams)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.error(error))
  }

  for (let i = 0; i < selected.length; i++) {
    let currVal = selected[i].value

    if (selected[i].filter === "numBath") {
      if (currVal > 1) {
        values.push(currVal + " Baths")
      }
      else {
        values.push(currVal + " Bath")
      }
    }
    else if (selected[i].filter === "numBed") {
      if (currVal == 0) {
        values.push("Studio")
      }
      else if (currVal > 1) {
        values.push(currVal + " Beds")
      }
      else {
        values.push(currVal + " Bed")
      }
    }
    else if (selected[i].filter === "minPrice") {
      values.push("$" + currVal + "+")
    }
    else if (selected[i].filter === "maxPrice") {
      values.push("Up To $" + currVal)
    }
    else if (selected[i].filter === "apartment") {
      values.push("Apartment")
    }
    else if (selected[i].filter === "house") {
      values.push("House")
    }
    else if (selected[i].filter === "condo") {
      values.push("Condo")
    }
    else if (selected[i].filter === "single") {
      values.push("Single Room")
    }
    else if (selected[i].filter === "pets") {
      values.push("Pet-Friendly")
    }
    else if (selected[i].filter === "furnished") {
      values.push("Fully Furnished")
    }
    else if (selected[i].filter === "utilities") {
      values.push("Utilities Included")
    }
    else if (selected[i].filter === "disTransportation") {
      values.push(currVal + " Proximity to Public Transit")
    }
  }

  function handleDelete(index: number) {
    if (selected[index].filter === "condo") {
      setCondo(false)
    }
    else if (selected[index].filter === "house") {
      setHouse(false)
    }
    else if (selected[index].filter === "apartment") {
      setApartment(false)
    }
    else if (selected[index].filter === "single") {
      setSingle(false)
    }
    else if (selected[index].filter === "numBath") {
      setNumBath('')
    }
    else if (selected[index].filter === "numBed") {
      setNumBed('')
    }
    else if (selected[index].filter === "minPrice") {
      setMinPrice('')
    }
    else if (selected[index].filter === "maxPrice") {
      setMaxPrice('')
    }
    else if (selected[index].filter === "pets") {
      setPets(false)
    }
    else if (selected[index].filter === "furnished") {
      setFurnished(false)
    }
    else if (selected[index].filter === "utilities") {
      setUtilities(false)
    }
    else if (selected[index].filter === "disTransportation") {
      setDisTransportation('')
    }
    else if (selected[index].filter === "address") {
      setAddress('')
    }

    selected.splice(index, 1)
    setFilters(selected)
    updateQuery(selected)
  }

  function clearAllFilters() {
    for (let i = 0; i < selected.length; i++) {
      clearFilter(selected[i].filter)
    }
    selected = []
    setFilters(selected)
    updateQuery(selected)
  }

  function clearFilter(filter: string) {
    if (filter === "condo") {
      setCondo(false)
    }
    else if (filter === "house") {
      setHouse(false)
    }
    else if (filter === "apartment") {
      setApartment(false)
    }
    else if (filter === "single") {
      setSingle(false)
    }
    else if (filter === "numBath") {
      setNumBath('')
    }
    else if (filter === "numBed") {
      setNumBed('')
    }
    else if (filter === "minPrice") {
      setMinPrice('')
    }
    else if (filter === "maxPrice") {
      setMaxPrice('')
    }
    else if (filter === "pets") {
      setPets(false)
    }
    else if (filter === "furnished") {
      setFurnished(false)
    }
    else if (filter === "utilities") {
      setUtilities(false)
    }
    else if (filter === "disTransportation") {
      setDisTransportation('')
    }
    else if (filter === "address") {
      setAddress('')
    }
  }


  if (selected.length > 0 && selected[0].filter !== "address") {
    return (
      <>
        <Grid container spacing={3} paddingBottom={2} paddingLeft={2}>
          {
            values.map((filter: string, index: number) =>
              <Grid item xs="auto" paddingLeft={2} key={filter + index}>
                <div className="item">
                  <Box sx={{ paddingRight: 1 }}>
                    <IconButton>
                      <ClearIcon fontSize="small" onClick={() => { handleDelete(index) }} />
                    </IconButton>
                    {filter}
                  </Box>
                </div>
              </Grid>
            )
          }
          <Grid item xs="auto" paddingLeft={2}>
            {
              <Grid item xs="auto" sx={{ paddingTop: 2, fontStyle: 'italic' }} >
                <Link underline="hover" color="inherit"
                  onClick={() => clearAllFilters()}>
                  {'Clear Filters'}
                </Link>
              </Grid>
            }
          </Grid>
        </Grid>
      </>
    )
  }
  else {
    return (
      <>
        <Grid container spacing={3} paddingBottom={2} paddingLeft={2}>
          {
            values.map((filter: string, index: number) =>
              <Grid item xs="auto" paddingLeft={2} key={filter + index}>
                <div className="item">
                  <Box sx={{ paddingRight: 1 }}>
                    <IconButton>
                      <ClearIcon fontSize="small" onClick={() => { handleDelete(index) }} />
                    </IconButton>
                    {filter}
                  </Box>
                </div>
              </Grid>
            )
          }
        </Grid>
      </>
    )
  }
}