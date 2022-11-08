import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import ListingForm from "../forms/ListingForm"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { borders } from '@mui/system'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles'
import { Typography } from '@mui/material'

let theme = createTheme();
theme = responsiveFontSizes(theme);


const Home = () => {
  const [Listings, setListings] = useState<any[]>([])

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listing')
      const json = await response.json()

      if (response.ok) {
        setListings(json)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="home">
      <div className="listings">
        <Box sx={{
          flexGrow: 1,
          position: "absolute",
          width: '23%',
          height: 869,
          left: 16,
          top: 103,
          background: "#FFFFFF",
          boxShadow: "0px 4px 4px rgba(93, 115, 126, 0.5)",
          borderRadius: 10,
          p: 2,
          pl: 3,
          pt: 1
        }}>
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <ThemeProvider theme={theme}>
                <Typography variant="h4" sx={{
                  fontFamily: 'Poppins',
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: 24,
                  textAlign: "left",
                }}>Filters</Typography>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Box>
        {Listings && Listings.map((Listing) => (
          <ListingDetails key={Listing._id} Listing={Listing} />
        ))}
        <ListingForm />
      </div>
    </div >
  )
}

export default Home