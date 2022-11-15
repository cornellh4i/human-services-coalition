import { BackupOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Card, CardContent, IconButton, Paper } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { borderRadius, fontWeight, width } from '@mui/system'
import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import ListingForm from "../forms/ListingForm"
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LinkIcon from '@mui/icons-material/Link';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ListingInformation = () => {
    return (
        <>
        <Grid padding="122px 142px">

          {/* Back button */}
          <Grid item xs = {1}>
            <IconButton>
              <ArrowBackIcon fontSize='large'></ArrowBackIcon> Back
            </IconButton>
          </Grid>

          <Grid item xs = {12}>
            <Card>
                {/* displays the big grey box at the top */}
                <CardContent style={{ backgroundColor: "#D9D9D9" }}>
                    <Grid
                    sx={{ width: "100%", height: "450px", left: "0px", top: "0px" }}
                    ></Grid>
                </CardContent>
            </Card>

            
            <Grid container padding = "10px 0px">

                {/* Main content */}
                <Grid item xs={12} md={8}>

                  {/* Listing address, edit, and delete buttons */}
                  <Grid container>
                    <Grid item>
                      <Typography variant="h6" display="flex" sx = {{fontSize: "40px", fontWeight: 700, color: "#000000"}}>
                          Listing Address
                          <IconButton>
                            <EditOutlined fontSize = "large"/>
                          </IconButton>
                          <IconButton>
                            <DeleteOutlined fontSize = "large"/>
                          </IconButton>
                      </Typography>
                    </Grid>
                    <Typography paddingBottom = {"20px"} sx = {{color: "#343434", fontSize: "16px", fontStyle: "italic"}}>
                      This listing has been webscraped from apartments.com
                    </Typography>
                  </Grid>

                  {/* Listing information */}
                  <Grid item padding = "10px 0px" xs = {12}>
                    <Typography sx = {{fontWeight: 700, color: "#000000"}}>
                        $760/mo
                    </Typography>
                    <Typography >
                        1bed 1bath
                    </Typography>
                    <Typography >
                        Woodland Acres Town Homes
                    </Typography>
                    <Typography>
                      Type of Listing
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
                <Grid item xs={12} md={4} spacing = {1}>

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
                            <EmailIcon></EmailIcon> email@landlord.com
                          </Typography>
                        </Grid>
                        <Grid item padding = "5px 0px" xs = {12}>
                          <Typography display="flex" justifyContent = "center">
                            <SmartphoneIcon></SmartphoneIcon> 123-456-7890
                          </Typography>
                        </Grid>
                        <Grid item padding = "5px 0px" xs = {12}>
                          <Typography display="flex" justifyContent = "center">
                            <LinkIcon></LinkIcon> external-link.com
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>

                  {/* Location of listing on the map */}
                  <Grid item padding = "10px 0px">
                    <Card style = {{backgroundColor : "#EAEAEA", borderRadius: "10px", height: "340px"}} elevation={3}>
                      <Grid container padding = "150px 160px" xs = {12}>
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