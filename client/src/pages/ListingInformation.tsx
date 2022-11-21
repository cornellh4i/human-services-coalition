import { BackupOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Button, Card, CardContent, CardMedia, Fab, IconButton, ImageList, ImageListItem, Paper } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { borderRadius, fontWeight, width } from '@mui/system'
import { Key, useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import ListingForm from "../forms/ListingForm"
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LinkIcon from '@mui/icons-material/Link';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";


const ListingInformation = () => {
  
  // Allows us to access the state of the listing details
  const location= useLocation();
  console.log(location);

  //navigation functionality
  const navigate = useNavigate();

  // const imageArray = location.state.pictures;

  return (
        <>
        <Grid padding="5% 5%">

          {/* Back button */}
          <Grid item xs = {1}>
            <IconButton onClick={() => navigate("/")}>
              <ArrowBackIcon fontSize='large'></ArrowBackIcon> Back
            </IconButton>
          </Grid>

          <Grid item xs = {12}>

            {/* Displays the big grey box at the top */}
            {/* <Card> */}
                {/* <CardContent style={{ backgroundColor: "#D9D9D9" }}>
                    <Grid
                    sx={{ width: "100%", height: "450px", left: "0px", top: "0px" }}
                    ></Grid>
                </CardContent>
            </Card> */}

            {/* Displays a single picture if pic array length is 1*/}
            {/* if (location.state.pictures.length == 1){
              <Card>
                  <Grid sx = {{width: "100%", height: "450px", left: "0px", top: "0px" }}>
                    <CardMedia
                      component = "img"
                      height = "450"
                      width = "100%"
                      image = "https://t3.ftcdn.net/jpg/03/27/47/64/360_F_327476437_wUTmsvTLezc2fNh3UmqrOYE7xyWp1fvo.jpg"
                    />
                  </Grid>
              </Card>     
            } */}

            {/* Displays two pictures if pic array length is 2*/}
            {/* else if (location.state.pictures.length == 2){
              <Grid container>
                <Grid item xs = {6}>
                  <Card>
                    <CardMedia
                      component = "img"
                      height = "450"
                      width = "100%"
                      image = "https://t3.ftcdn.net/jpg/03/27/47/64/360_F_327476437_wUTmsvTLezc2fNh3UmqrOYE7xyWp1fvo.jpg"
                    />
                  </Card>
                </Grid>
                <Grid item xs = {6}>
                  <Card>
                    <CardMedia
                      component = "img"
                      height = "450"
                      width = "100%"
                      image = "https://t3.ftcdn.net/jpg/03/27/47/64/360_F_327476437_wUTmsvTLezc2fNh3UmqrOYE7xyWp1fvo.jpg"
                    />
                  </Card>
                </Grid>
              </Grid>
            } */}

            {/* Displays 3 pictures if pic array length >= 3*/}
            <Grid container>
              <Grid item xs = {8} padding = "5px">
                <Card>
                  <CardMedia
                    component = "img"
                    height = "100%"
                    width = "100%"
                    image = "https://t3.ftcdn.net/jpg/03/27/47/64/360_F_327476437_wUTmsvTLezc2fNh3UmqrOYE7xyWp1fvo.jpg"
                  />
                </Card>
              </Grid>
              <Grid item xs = {4}>
                <Grid item xs = {12} padding = "5px">
                  <Card>
                    <CardMedia
                      component = "img"
                      height = "50%"
                      width = "100%"
                      image = "https://t3.ftcdn.net/jpg/03/27/47/64/360_F_327476437_wUTmsvTLezc2fNh3UmqrOYE7xyWp1fvo.jpg"
                    />
                  </Card>
                </Grid>
                <Grid item xs = {12} padding = "5px">
                  <Card>
                    <Grid item>
                      <CardMedia
                        component = "img"
                        height = "50%"
                        width = "100%"
                        image = "https://t3.ftcdn.net/jpg/03/27/47/64/360_F_327476437_wUTmsvTLezc2fNh3UmqrOYE7xyWp1fvo.jpg"
                      />
                      <Button>Show All</Button>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid container padding = "22px 0px">

                {/* Main content */}
                <Grid item xs={12} md={8}>

                  {/* Listing address, edit, and delete buttons */}
                  <Grid container>
                    <Grid item xs = {9}>
                      <Typography variant="h6" display="flex" sx = {{fontSize: "36px", fontWeight: 700, color: "#000000"}}>
                          {location.state.streetAddress} {location.state.city}, {location.state.state} {location.state.zipCode}
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
                      {location.state.size} {location.state.numBath} Bath
                    </Typography>
                    <Typography >
                        Woodland Acres Town Homes
                    </Typography>
                    <Typography>
                      {location.state.unitType}
                    </Typography>
                  </Grid>

                  {/* Listing description */}
                  <Grid item padding = "10px 0px" xs = {10}>
                    <Typography sx = {{color: "#343434", fontStyle: "italic"}}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
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
                          <CheckIcon></CheckIcon> utilities included: gas, heat, water
                        </Typography>
                        <Typography display="flex">
                          <CheckIcon></CheckIcon> pet- friendly
                        </Typography>
                        <Typography display="flex">
                          <CheckIcon></CheckIcon> 5 minutes to downtown
                        </Typography>
                      </Grid>
                      <Grid item xs = {6}>
                      <Typography display="flex">
                        <CheckIcon></CheckIcon> big windows
                      </Typography>
                      <Typography display="flex">
                        <CheckIcon></CheckIcon> newly - renovated
                      </Typography>
                      <Typography display="flex">
                        <CheckIcon></CheckIcon> security cameras
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
                            {/* <EmailIcon></EmailIcon> email@landlord.com */}
                            <EmailIcon></EmailIcon> {location.state.landlordEmail}
                          </Typography>
                        </Grid>
                        <Grid item padding = "5px 0px" xs = {12}>
                          <Typography display="flex" justifyContent = "center">
                            {/* <SmartphoneIcon></SmartphoneIcon> 123-456-7890 */}
                            <SmartphoneIcon></SmartphoneIcon> {location.state.landlordPhone}
                          </Typography>
                        </Grid>
                        <Grid item padding = "5px 0px" xs = {12}>
                          <Typography display="flex" justifyContent = "center">
                            <LinkIcon></LinkIcon> external-link.com
                            {/* <LinkIcon></LinkIcon> {location.state.linkOrig} */}
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
        </>
    )
  }
  
  export default ListingInformation