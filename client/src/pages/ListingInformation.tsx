import { Card, CardContent, Paper } from '@mui/material'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import ListingForm from "../forms/ListingForm"


const ListingInformation = () => {
    return (
        <>

        <Card>
            {/* displays the big grey box at the top */}
            <CardContent style={{ backgroundColor: "#D9D9D9" }}>
                <Grid
                sx={{ width: "350px", height: "300px", left: "0px", top: "0px" }}
                ></Grid>
            </CardContent>
        </Card>

        
        <Grid container spacing={40} >

            {/* Main content */}
            <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                    LISTING ADDRESS
                </Typography>
                <Typography variant="h6" gutterBottom>
                    $760/month
                </Typography>
                <Typography variant="h6" gutterBottom>
                    1bed/1bath
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Woodland Acres Town Homes
                </Typography>
            </Grid>
            {/* End main content */}

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
                <Card elevation={0} >
                    <Typography variant="h6" gutterBottom>
                        Contact Information
                    </Typography>
                    <Typography>
                        Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit
                        amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                    </Typography>
                </Card>
                <Typography variant="h6" gutterBottom >
                    Google Maps Location
                </Typography>
                <Typography>
                        Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit
                        amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                </Typography>
            </Grid>
            {/* End sidebar */}

        </Grid></>

    )
  
  }
  
  export default ListingInformation