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
import { createTheme, Grid } from '@mui/material';

const listingTheme = createTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontSize: 18,
  }
});

const addressTheme = createTheme({
  typography: {
    fontFamily: "Open Sans"
  }
});

const priceTheme = createTheme({
  typography: {
    fontFamily: "Open Sans"
  }
});
const sizeTheme = createTheme({
  typography: {
    fontFamily: "Open Sans"
  }
});

export default function ListingDetails({ Listing, handleDelete}: { Listing: any , handleDelete: any}){
  return(
    <Card style={{backgroundColor: "#F5F5F5"}} sx={{ 
      width: "350px",
      height: "340px",
      borderRadius: "10px",
      boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
      flex: "none",
      order: 1,
      flexGrow: 0
      }} elevation = {5}>
      
      {/* <CardMedia sx={{
        width: 350,
        height: 242
      }}
        component = "img"
        alt = "listing picture"
        image = "https://cdn.pixabay.com/photo/2020/03/14/13/25/house-4930614_1280.jpg"
      /> */}

      <CardContent style={{backgroundColor: "#D9D9D9"}}> 
        <Grid sx={{width: "350px", height: "210px", left: "0px", top: "0px"}}>
          <IconButton onClick={() => handleDelete(Listing._id)}>
            <DeleteOutlined />
          </IconButton>

          <IconButton>
            <EditOutlined />
          </IconButton>
        </Grid>
      </CardContent>

      <Grid width="250px" height="72px" top="251px" left="18px" padding="7px 34px 0px 13px"
      gap="9px" display="flex" flexDirection="column" alignItems="flex-start">
        <Grid item>
          <ThemeProvider theme = {listingTheme}>
            <Typography variant ="body2" sx = {{
                        width: "278px",
                        height: "18px", 
                        fontFamily:"Open Sans",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "#343434",
                        flex: "none",
                        order: 0,
                        flexGrow: 0}}>
                          Woodland Acres Townhomes
            </Typography>
          </ThemeProvider>
        </Grid>
          {/* <Grid item>
            <IconButton onClick={() => handleDelete(Listing._id)}>
              <DeleteOutlined />
            </IconButton>

            <IconButton>
              <EditOutlined />
            </IconButton>
          </Grid> */}
        {/* </Grid> */}
        <Grid item>
          <ThemeProvider theme = {addressTheme}>
            <Typography variant ="body2" sx = {{
                        width: "278px",
                        height: "18px",
                        fontFamily: "'Open Sans'",
                        fontStyle: "normal",
                        fontWeight: 400, 
                        fontSize: "18px", 
                        color: "#343434",
                        flex: "none",
                        order: 1,
                        flexGrow: 0}}>
              {Listing.streetAddress}
            </Typography>
          </ThemeProvider>
        </Grid>
        <Grid item>
          <ThemeProvider theme={sizeTheme}>
                <Typography variant ="body2" sx = {{
                            width: "278px",
                            height: "18px",
                            fontFamily: "Open Sans",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: 18, 
                            color: "#343434",
                            flex: "none",
                            order: 2,
                            flexGrow: 0}}>
                  {Listing.size} / {Listing.numBath}
                </Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
      <Grid width={40} height={18} top={305} left={325}>
        <Typography variant = "body2" sx = {{
                    fontFamily: "Open Sans",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: 18, 
                    color: "#000000"}}>
          {Listing.price}
        </Typography>
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