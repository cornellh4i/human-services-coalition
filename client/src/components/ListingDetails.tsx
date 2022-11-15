
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
import { createMuiTheme, createTheme, Grid, makeStyles, styled } from '@mui/material';
import { green, purple } from '@mui/material/colors';
 
 
 
const listingTheme = createMuiTheme({
 typography: {
   fontSize: 15,
   fontWeightRegular: 700,
  }
});
const addressTheme = createMuiTheme({
 typography: {
   fontSize: 15,
   fontWeightRegular: 400,
   //fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
 } ,
});
const sizeTheme = createTheme({
 typography: {
   //fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
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

export default function ListingDetails({ Listing, handleDelete}: { Listing: any , handleDelete: any}){
 return(
 
   // Creates a single listing card
   <Card style={{backgroundColor: "#F5F5F5"}} sx={{
     width: "350px",
     height: "340px",
     borderRadius: "10px",
     boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
     // padding: "5px 0px 0px 5px",
     flex: "none",
     order: 1,
     flexGrow: 0
     }} elevation = {10} >
 
    {/* Creates the gray area at the top of the card that should display a picture of the listing */}
     <CardContent style={{backgroundColor: "#D9D9D9"}}>
       <Grid sx={{width: "350px", height: "210px", left: "0px", top: "0px"}}>
       </Grid>
     </CardContent>
 
     {/* Displays the listing information in a grid at the bottom of the card */}
     <Grid
       padding="0px 0px 0px 10px"
       display="flex"
       flexDirection="column"
       alignItems="flex-start">
       
      {/* Create a grid container to hold all the grid items of the grid */}
       <Grid container xs = {18} alignItems="center" >
        {/* Displays the listing name */}
         <Grid item xs={9}>
           <ThemeProvider theme={listingTheme}>
             <Typography>
               Woodland Acres Townhomes
             </Typography>
           </ThemeProvider>
         </Grid>

        {/* Creates the delete and edit buttons and displays it next to the listing name */}
         <Grid item xs={3} >
             <IconButton>
               <EditOutlined fontSize = "small"/>
             </IconButton>
             <IconButton onClick={() => handleDelete(Listing._id)}>
               <DeleteOutlined fontSize = "small"/>
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
         <Grid item xs={8.6} >
           <ThemeProvider theme={sizeTheme}>
               <Typography >
                 {Listing.size} / {Listing.numBath}bath
               </Typography>
           </ThemeProvider>
         </Grid>  
 
          {/* Displays the rent per month of the listing */}
         <Grid item xs={2}>
         <ThemeProvider theme={priceTheme}>
           <Typography >
             ${Listing.price}/mo
           </Typography>
         </ThemeProvider>
         </Grid>
        
       </Grid>
     </Grid>
   </Card>
 
 )
}
