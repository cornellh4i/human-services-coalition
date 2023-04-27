import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import { useLocation, useNavigate } from "react-router-dom";
import '../css/Home.css'
import { Button, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const RecentlyViewed = () => {

  //intialises the state for the list of houses that correspond to the specified user
  const [Listings, setListings] = useState<any[]>([])

  // Allows us to access the state of the user details - accesses the id of the user
  const location = useLocation();

  // Navigation functionality
  const navigate = useNavigate();

  // //this will fetch all the information associated with the user
  useEffect(() => { getUserDetails() }, [])

  //fetch the data related to id from the database
  const getUserDetails = async () => {

    const response = await fetch('/api/users/' + location.state.id,
      { method: 'GET' })

    const json = await response.json()
    const response2 = await fetch('/api/listing', { method: 'GET' })
    const json2 = await response2.json()

    json2.forEach((e: any) => Listings.push(e))

    const newListings = Listings.filter(Listing => json.recentlyViewed.includes(Listing._id))
    setListings(newListings)
  }
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
              onClick={() => navigate("/")}
              sx={{ marginTop: '2rem', padding: "0 1rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '15px', color: '#5D737E', borderWidth: '0.14rem', borderColor: '#5D737E', bgcolor: 'white', ':hover': { bgcolor: "#5D737EB5" } }}
            >
              Back
            </Button>
          </Grid>

          <Grid container display="flex" flexDirection="row" paddingTop="1%" paddingBottom="1%">
            <Grid item xs={6} display="flex" flexDirection="column">
              {/* User's recently viewed title */}
              <Grid item display="flex" justifyContent="left">
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{location.state.fName} {location.state.lName}'s Recently Viewed Listings</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Displays recently viewed listings */}
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

export default RecentlyViewed