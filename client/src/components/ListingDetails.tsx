import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DeleteOutlined } from '@mui/icons-material';
import { EditOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton/IconButton';
import { color, fontFamily, fontSize, fontStyle, fontWeight, height, width } from '@mui/system';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Grid, makeStyles, styled } from '@mui/material';
import { green, purple } from '@mui/material/colors';


const listingTheme = createTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    fontFamily: "Arial",
    fontSize: 14, 
    fontWeightRegular: 700,
  } 
});

const addressTheme = createTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    fontFamily: "Arial",
    fontSize: 14, 
    fontWeightRegular: 400,
  } ,
});

const sizeTheme = createTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    fontFamily: "Arial",
    fontSize: 14, 
    fontWeightRegular: 400,
  } 
});

const priceTheme = createTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    fontFamily: "Arial",
    fontSize: 14, 
    fontWeightRegular: 700,
  } 
});

export default function ListingDetails({ Listing, handleDelete}: { Listing: any , handleDelete: any}){
  return(

    // Creates a single listing card
    <Card style={{backgroundColor: "#F5F5F5"}} sx={{ 
      width: "350px",
      height: "340px",
      borderRadius: "10px",
      boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
      flex: "none",
      order: 1,
      flexGrow: 0
      }} elevation = {5}>

      {/* Creates the gray area at the top of the card that should display a picture of the listing */}
      <CardContent style={{backgroundColor: "#D9D9D9"}}> 
        <Grid sx={{width: "350px", height: "210px", left: "0px", top: "0px"}}>
        </Grid>
      </CardContent>

      {/* Displays the listing information in a grid at the bottom of the card */}
      <Grid padding="0px 10px"
      gap="9px" display="flex" flexDirection="column" alignItems="flex-start">
         
        {/* Create a grid container to hold all the grid items of the grid */}
        <Grid container xs = {12} alignItems="center" columnSpacing= {{xs:1}} >

          {/* Displays the listing name */}
          <Grid item xs={9}>
            <ThemeProvider theme={listingTheme}>
              <Typography sx = {{fontSize: "17px"}}>
                Woodland Acres Townhomes
              </Typography>
            </ThemeProvider>
          </Grid>

          {/* Creates the delete and edit buttons and displays it next to the listing name */}
          <Grid item xs={3}>
            <IconButton onClick={() => handleDelete(Listing._id)}>
              <DeleteOutlined fontSize = "small"/>
            </IconButton>
            <IconButton>
              <EditOutlined fontSize = "small"/>
            </IconButton>
          </Grid>

          {/* Displays the listing street address */}
          <Grid item xs={12}>
            <ThemeProvider theme = {addressTheme}>
              <Typography>
                {Listing.streetAddress}, Ithaca
              </Typography>
            </ThemeProvider>
          </Grid>

          {/* Displays the size of the listing and the number of bathrooms */}
          <Grid item xs={9} >
            <ThemeProvider theme={sizeTheme}>
              <Typography >
                {Listing.size} / {Listing.numBath} bath
              </Typography>
            </ThemeProvider>
          </Grid>   

          {/* Displays the rent per month of the listing */}
          <Grid item xs={3}>
            <ThemeProvider theme = {priceTheme}>
              <Typography>
                ${Listing.price}/mo
              </Typography>
            </ThemeProvider>
          </Grid>
          
        </Grid>
      </Grid>
    </Card>

  )
}