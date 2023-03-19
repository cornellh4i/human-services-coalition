import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import '../css/Home.css'

export default function SelectedFilters({ filters, setFilters }: any) {
  let selected: any = [...filters];
  let values: any[] = [];

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
      if (currVal > 1) {
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
    else if (selected[i].filter === "unitType") {
      values.push(currVal)
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
    selected.splice(index, 1)
    setFilters(selected)
  }

  return (
    <>
      <Grid container spacing={3} paddingBottom={2} paddingLeft={2}>
        {
          values.map((filter: string, index: number) =>
            <Grid item xs="auto" paddingLeft={2} key={filter + index}>
              <div className="item">
                <Box>
                  {filter}
                  <IconButton>
                    <ClearIcon fontSize="small" onClick={() => { handleDelete(index) }} />
                  </IconButton>
                </Box>
              </div>
            </Grid>)}
      </Grid>
    </>
  )
}