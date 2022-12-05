import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Card, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LinkIcon from '@mui/icons-material/Link';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import ImageContainer from '../components/ImageContainer';


const ListingInformation = () => {
  
  // Allows us to access the state of the listing details
  const location= useLocation();

  //navigation functionality
  const navigate = useNavigate();

  return (
    <Grid padding="1% 5%">

      {/* Back button */}
      <Grid item xs = {1}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon fontSize='large'></ArrowBackIcon> Back
        </IconButton>
      </Grid>

      <Grid item xs = {12}>

        {/* The Image Section */}
        <ImageContainer images = {location.state.pictures} numImages={location.state.pictures.length}/>
        
        <Grid container padding = "22px 0px">
            {/* Main content */}
            <Grid item xs={12} md={8}>

              {/* Listing address, edit, and delete buttons */}
              <Grid container>
                <Grid item xs = {9}>
                  <Typography variant="h6" display="flex" sx = {{fontSize: "36px", fontWeight: 700, color: "#000000"}}>
                      {location.state.streetAddress}
                  </Typography>
                </Grid>
                <Grid item xs = {3}>
                  <IconButton>
                    <EditOutlined fontSize = "large"/>
                  </IconButton>
                  {/* <IconButton onClick={() => handleDelete(location.state.id)}></IconButton> */}
                  <IconButton>
                    <DeleteOutlined fontSize = "large"/>
                  </IconButton>
                </Grid>
              </Grid>
              <Typography paddingBottom = {"20px"} sx = {{color: "#343434", fontSize: "16px", fontStyle: "italic"}}>
                This listing has been webscraped from apartments.com
              </Typography>

              {/* Listing information */}
              <Grid item padding = "10px 0px" xs = {12}>
                <Typography sx = {{fontWeight: 700, color: "#000000"}}>
                  ${location.state.price}/mo
                </Typography>
                <Typography >
                  {location.state.size === "One Bed" ? "1bed" : location.state.size === "Two Bed" ? "2bed" : 
                  location.state.size === "Three Bed" ? "3bed" : location.state.size === "Four Bed" ? "4bed" : 
                  location.state.size === "Five Bed" ? "5bed"  : location.state.size === "Six Bed" ? "6bed" : 
                  location.state.size === "Studio" ? "studio" : <p></p>} {location.state.numBath}bath
                </Typography>
                <Typography >
                    {location.state.landlord}
                </Typography>
                <Typography>
                  {location.state.unitType}
                </Typography>
              </Grid>

              {/* Listing availability */}
              <Grid item padding = "10px 0px" xs = {12}>
                <Typography sx = {{fontWeight: 700, color: "#000000"}}>
                  Available From: {location.state.dateAvailable}
                </Typography>
              </Grid>

              {/* Listing description */}
              <Grid item padding = "10px 0px" xs = {10}>
                <Typography sx = {{color: "#343434", fontStyle: "italic"}}>
                Beautiful 1 bedroom home.  Many utilities and services included. You only need to pay in addition the NYSEG/electricity&gas bill and wifi (average $45- per month per person). Large bedrooms with big windows, hardwood floors, full size bed, dresser, desk, chair, and large build-in closet. Free parking in front of your door. Pets allowed ($25 per pet per month). Picnic table at your back yard patio
                </Typography>
              </Grid>

              {/* Home highlights */}
              <Grid item padding = "10px 0px">
                <Typography sx = {{fontWeight: 700, color: "#2F2F2F"}}>
                  Home Highlights
                </Typography>
                <Grid container>
                  <Grid item xs = {6}>
                    <Typography display="flex">
                      <CheckIcon></CheckIcon> {location.state.utilities == "true" ? "utilities included: gas, water, heat" : "utilities not included"}
                    </Typography>
                    <Typography display="flex">
                      <CheckIcon></CheckIcon> {location.state.pets == "true" ? "dog-friendly" : "not dog-friendly"}
                    </Typography>
                    <Typography display="flex">
                      <CheckIcon></CheckIcon> {location.state.pets == "true" ? "cat-friendly" : "not cat-friendly"}
                    </Typography>
                  </Grid>
                  <Grid item xs = {6}>
                  <Typography display="flex">
                    <CheckIcon></CheckIcon> {location.state.furnished == "true" ? "fully furnished" : "not fully furnished"}
                  </Typography>
                  <Typography display="flex">
                    <CheckIcon></CheckIcon> hardwood floors
                  </Typography>
                  <Typography display="flex">
                    <CheckIcon></CheckIcon> full-kitchen
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
            {/* End main content */}

            {/* Sidebar */}
            <Grid item xs={12} md={4}>

              {/* Contact info card*/}
              <Grid item padding = "10px 0px">
                <Card style = {{backgroundColor: "#EAEAEA", borderRadius: "10px"}} elevation={3}>
                  <Grid container padding = "10px 10px">
                    <Grid item padding = "5px 0px" xs = {12}>
                      <Typography textAlign={"center"} sx = {{fontWeight: 700}}>
                        Contact Info
                      </Typography>
                    </Grid>
                    <Grid item padding = "5px 0px" xs = {12}>
                      <Typography display="flex" justifyContent = "center">
                        <EmailIcon></EmailIcon> {location.state.landlordEmail}
                      </Typography>
                    </Grid>
                    <Grid item padding = "5px 0px" xs = {12}>
                      <Typography display="flex" justifyContent = "center">
                        <SmartphoneIcon></SmartphoneIcon> {location.state.landlordPhone}
                      </Typography>
                    </Grid>
                    <Grid item padding = "5px 0px" xs = {12}>
                      <Typography display="flex" justifyContent = "center">
                        <LinkIcon></LinkIcon> {location.state.linkApp}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Location of listing on the map */}
              <Grid item padding = "10px 0px">
                <Card style = {{backgroundColor : "#EAEAEA", borderRadius: "10px", height: "340px"}} elevation={3}>
                  <Grid container padding = "150px 160px">
                    <Typography justifyContent={"center"}>
                      <PlaceIcon fontSize='large'></PlaceIcon>
                    </Typography>
                  </Grid>
                </Card>
              </Grid>

            </Grid>
            {/* End sidebar */}
        </Grid>
      </Grid>

    </Grid>
    )
  }
  
  export default ListingInformation