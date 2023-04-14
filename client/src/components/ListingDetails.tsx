import { Card, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DeleteOutlined } from '@mui/icons-material';
import { EditOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton/IconButton';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import DeleteConfirmation from './DeleteConfirmation';

const listingTheme = createTheme({
  typography: {
    fontSize: 15,
    fontWeightRegular: 700,
  }
});
const addressTheme = createTheme({
  typography: {
    fontSize: 15,
    fontWeightRegular: 400,
  },
});
const sizeTheme = createTheme({
  typography: {
    fontSize: 15,
    fontWeightRegular: 400,
  }
});
const priceTheme = createTheme({
  typography: {
    fontSize: 15,
    fontWeightRegular: 700,
  }
});

export default function ListingDetails({ Listing, handleDelete }: { Listing: any, handleDelete: any }) {

  // define handle click function
  const navigate = useNavigate();

  //states for the delete dialog pop up
  const [openPop, setOpenPop] = useState(false)

  const handleClick = (event: any) => {
    event.stopPropagation()
    setOpenPop(true)
  }

  return (

    <>
      {/* Creates a single listing card */}
      <Card style={{ backgroundColor: "#FFFFFF" }}
        sx={{
          ':hover': { boxShadow: 20, cursor: 'pointer' },
          width: "300px",
          height: "310px",
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
          flex: "none",
          order: 1,
          flexGrow: 0
        }}
        elevation={10}

      >

        {/* Displays a picture of the listing at the top of the card */}
        <CardMedia
          component="img"
          height="210px"
          width="300px"
          image={Listing.pictures[0]}
          onClick={() => navigate("/listing_info", {
            state: {
              id: Listing._id,
              streetAddress: Listing.streetAddress,
              city: Listing.city,
              state: Listing.state,
              country: Listing.country,
              zipCode: Listing.zipCode,
              pictures: Listing.pictures,
              price: Listing.price,
              size: Listing.size,
              unitType: Listing.unitType,
              numBath: Listing.numBath,
              schoolDistrict: Listing.schoolDistrict,
              pets: Listing.pets,
              utilities: Listing.utilities,
              furnished: Listing.furnished,
              distTransportation: Listing.distTransportation,
              landlord: Listing.landlord,
              landlordEmail: Listing.landlordEmail,
              landlordPhone: Listing.landlordPhone,
              linkOrig: Listing.linkOrig,
              linkApp: Listing.linkApp,
              dateAvailable: Listing.dateAvailable
            }
          })} />

        {/* Displays the listing information in a grid at the bottom of the card */}
        <Grid
          padding="0px 0px 0px 10px"
          display="flex"
          flexDirection="column"
          alignItems="flex-start">

          {/* Create a grid container to hold all the grid items of the grid */}
          <Grid container xs={18} alignItems="center">
            {/* Displays the listing address */}
            <Grid item xs={9}>
              <ThemeProvider theme={listingTheme}>
                <Typography>
                  {Listing.streetAddress}
                </Typography>
              </ThemeProvider>
            </Grid>

            {/* Creates the delete and edit buttons and displays it next to the address */}
            <Grid item xs={3}>
              <IconButton onClick={() => navigate('/listing-form', { state: { id: Listing._id } })}>
                <EditOutlined fontSize="small" />
              </IconButton>
              <IconButton onClick={(event) => handleClick(event)}>
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </Grid>

            {/* Displays the listing landlord */}
            <Grid item xs={12}>
              <ThemeProvider theme={addressTheme}>
                <Typography>
                  {Listing.landlord}
                </Typography>
              </ThemeProvider>
            </Grid>

            {/* Displays the size of the listing and the number of bathrooms */}
            <Grid item xs={8.6}>
              <ThemeProvider theme={sizeTheme}>
                <Typography>
                  {Listing.size === "One Bed" ? "1bed" : Listing.size === "Two Bed" ? "2bed" :
                    Listing.size === "Three Bed" ? "3bed" : Listing.size === "Four Bed" ? "4bed" :
                      Listing.size === "Five Bed" ? "5bed" : Listing.size === "Six Bed" ? "6bed" :
                        Listing.size === "Studio" ? "studio" : <p></p>} / {Listing.numBath}bath
                </Typography>
              </ThemeProvider>
            </Grid>

            {/* Displays the rent per month of the listing */}
            <Grid item xs={2}>
              <ThemeProvider theme={priceTheme}>
                <Typography>
                  ${Listing.price}/mo
                </Typography>
              </ThemeProvider>
            </Grid>

          </Grid>
        </Grid>
      </Card>
      <DeleteConfirmation id={Listing._id} openPop={openPop} setOpenPop={setOpenPop} handleDelete={handleDelete} type="listing" />
    </>

  )
}
