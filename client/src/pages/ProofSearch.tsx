
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import FilterSideBar from '../components/FilterSideBar'
import SelectedFilters from '../components/SelectedFilters'
import { useLocation, useNavigate } from "react-router-dom";
import '../css/Home.css'
import { Button, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PrintIcon from '@mui/icons-material/Print';

const ProofSearch = () => {

  //intialises the state for the list of houses that correspond to the specified user
  const [Listings, setListings] = useState<any[]>([])
  const [viewHistoryString, setViewHistoryString] = useState<any[]>([])


  // Allows us to access the state of the user details - accesses the id of the user
  const location = useLocation();

  // Navigation functionality
  const navigate = useNavigate();

  // //this will fetch all the information associated with the user
  useEffect(() => { getUserDetails() }, [])
  useEffect(() => { fetchListings() }, [])

  //fetch the data related to id from the database
  const getUserDetails = async () => {

    const response = await fetch('/api/users/' + location.state.id,
      { method: 'GET' })
    console.log("wrgwrg")
    console.log(response)
    const json = await response.json()
    console.log("AFTERRR")
    console.log(json)

    setViewHistoryString(json.recentlyViewed)
    console.log(json.recentlyViewed)
    console.log(viewHistoryString)

  }

  const fetchListings = async () => {
    const response = await fetch('/api/listing')
    console.log(response)
    const json = await response.json()
    console.log(json)
    setListings(json)
    console.log(Listings)

  }

  console.log(viewHistoryString)
  console.log(Listings)

  // // filters the listings only to the listings in the user's search history
  console.log("'639e7c4ed272b97a6feac587'" in viewHistoryString)
  const viewHistory = Listings.filter((Listing, _, viewHistoryString) => Listing._id in viewHistoryString)
  console.log(viewHistory)
  //setListings(viewHistory)




  return (
    <>
      <div>
        <Grid padding="1% 5%" display="flex" flexDirection="column">

          {/* Back button */}
          <Grid item xs={1} >
            <Button disableElevation
              startIcon={<ArrowBackIosNewIcon />}
              variant="outlined"
              size="large"
              onClick={() => navigate("/manage-profiles")}
              sx={{ marginTop: '2rem', padding: "0 1rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '15px', color: '#5D737E', borderWidth: '0.14rem', borderColor: '#5D737E', bgcolor: 'white', ':hover': { bgcolor: "#5D737EB5" } }}
            >
              Back
            </Button>
          </Grid>

          <Grid container display="flex" flexDirection="row" paddingTop="1%" paddingBottom="1%">
            <Grid item xs={6} display="flex" flexDirection="column">
              {/* User's proof of history title */}
              <Grid item display="flex" justifyContent="left">
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{location.state.fName} {location.state.lName}'s Proof of Search</Typography>
              </Grid>

              {/* Subheading for print page instructions*/}
              <Grid item display="flex" justifyContent="left">
                <Typography variant="h6" sx={{ fontStyle: "italic", color: "grey" }}>Print this page to provide proof of search</Typography>
              </Grid>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="right">
              <PrintIcon fontSize='large'></PrintIcon>
            </Grid>
          </Grid>

          {/* Displays the listings in the user's search history */}
          <Grid container spacing={2}>
            {Listings.map((Listing) => (

              <Grid item key={Listing._id}>
                <ListingDetails Listing={Listing} handleDelete={undefined} />
              </Grid>
            ))}
          </Grid>

        </Grid>

      </div>
    </>
  )
}

export default ProofSearch