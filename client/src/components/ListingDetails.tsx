import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DeleteOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton/IconButton';


export default function ListingDetails({ Listing, handleDelete}: { Listing: any , handleDelete: any}){
  return(
    <Card sx={{ maxWidth: 400, maxHeight: 400 }} elevation = {3}>
      
      <CardMedia
        component = "img"
        alt = "listing picture"
        height = "200"
        image = "https://media.istockphoto.com/vectors/home-flat-icon-pixel-perfect-for-mobile-and-web-vector-id1145840259?k=20&m=1145840259&s=612x612&w=0&h=4ejY4fSiFcyk3MsQx8bOpeJ_rf5_yeDGuIoH5rpPAbY="
      />

      <CardContent>
        
        <IconButton onClick={() => handleDelete(Listing.id)}>
          <DeleteOutlined />
        </IconButton>
          
        <Typography gutterBottom variant ="h6" component="div">
          Name of Listing
        </Typography>

        <Typography variant ="body2">
          {Listing.streetAddress}
        </Typography>

        <Typography variant ="body2">
          {Listing.size} / {Listing.numBath}
        </Typography>

        <Typography variant ="body2" align = "right">
          {Listing.price}
        </Typography>

        

      </CardContent>
      <CardActions>
        <Button size = "small">Edit</Button>
        <Button size = "small">Delete</Button>
      </CardActions>
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