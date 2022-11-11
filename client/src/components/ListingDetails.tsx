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


const listingTheme = createTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    fontFamily: "Arial",
    fontSize: 13, 
    fontWeightRegular: 400,
  } 
});

const addressTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    fontFamily: "Arial",
    fontSize: 13, 
    fontWeightRegular: 400,
  } ,
});

const priceTheme = createTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    fontFamily: "Arial",
    fontSize: 13, 
    fontWeightRegular: 400,
  } 
});
const sizeTheme = createTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    fontFamily: "Arial",
    fontSize: 13, 
    fontWeightRegular: 400,
  } 
});


export default function ListingDetails({ Listing, handleDelete}: { Listing: any , handleDelete: any}){
  return(
    <Card style={{backgroundColor: "#F5F5F5"}} sx={{ 
      width: "350px",
      height: "340px",
      borderRadius: "10px",
      boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
      // padding: "5px 0px 0px 5px",
      flex: "none",
      order: 1,
      flexGrow: 0
      }} elevation = {5}>

      <CardContent style={{backgroundColor: "#D9D9D9"}}> 
        <Grid sx={{width: "350px", height: "210px", left: "0px", top: "0px"}}>
        </Grid>
      </CardContent>

      <Grid padding="0px 10px"
      gap="9px" display="flex" flexDirection="column" alignItems="flex-start">
         
        <Grid container alignItems="center" spacing= {1} >

          <Grid item xs={9}>
            <ThemeProvider theme={listingTheme}>
              <Typography sx = {{fontSize: "17px"}}>
                Woodland Acres Townhomes
              </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs={3}>
              <IconButton onClick={() => handleDelete(Listing._id)}>
                <DeleteOutlined fontSize = "small"/>
              </IconButton>
              <IconButton>
                <EditOutlined fontSize = "small"/>
              </IconButton>
          </Grid>

          <Grid item xs={12}>
            <ThemeProvider theme = {addressTheme}>
              <Typography>
                {Listing.streetAddress}, Ithaca
              </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item xs={9} spacing= {1}>
            <ThemeProvider theme={sizeTheme}>
                <Typography >
                  {Listing.size} / {Listing.numBath} bath
                </Typography>
            </ThemeProvider>
          </Grid>   

          <Grid item xs={3}>
            <Typography >
              ${Listing.price}/mo
            </Typography>
          </Grid>
          
        </Grid>
      </Grid>
    </Card>

  )
}


{/* <div className="Listing-Details">
<p><strong>Web Scraped:</strong>{Listing.webScraped}</p>
<p><strong>Street Address:</strong>{Listing.streetAddress}</p>
<p><strong>City:</strong>{Listing.city}</p>
<p><strong>State:</strong>{Listing.state}</p>
<p><strong>Country:</strong>{Listing.country}</p>
<p><strong>Zip Code:</strong>{Listing.zipCode}</p>
<p><strong>Pictures:</strong>{Listing.pictures}</p>
<p><strong>Listing Price:</strong>{Listing.price}</p>
<p><strong>Size:</strong>{Listing.size}</p>
<p><strong>Unit Type:</strong>{Listing.unitType}</p>
<p><strong>Bathrooms:</strong>{Listing.numBath}</p>
<p><strong>School District:</strong>{Listing.schoolDistrict}</p>
<p><strong>Pet Policy:</strong>{Listing.pets}</p>
<p><strong>Utilities:</strong>{Listing.utilities}</p>
<p><strong>Furnished:</strong>{Listing.furnished}</p>
<p><strong>Distance from Transportation:</strong>{Listing.distTransportation}</p>
<p><strong>Landlord:</strong>{Listing.landlord}</p>
<p><strong>Landlord Email:</strong>{Listing.landlordEmail}</p>
<p><strong>Landlord Phone:</strong>{Listing.landlordPhone}</p>
<p><strong>Original Listing Link:</strong>{Listing.linkOrig}</p>
<p><strong>Link to Listing Application:</strong>{Listing.linkApp}</p>
<p><strong>Date Available:</strong>{Listing.dateAvailable}</p>
<p>{Listing.createdAt}</p>
</div> */}