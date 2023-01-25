import { Box, Button, Card, CardMedia, Grid } from "@mui/material"
import AppsIcon from '@mui/icons-material/Apps';

export default function ImageContainer ({images, numImages}: {images: string[], numImages:number}) {

    if (numImages === 1){
        /* Displays a single picture if pic array length is 1*/
        return (
            <Grid container>
                <Grid item xs = {12}>
                    <Card>
                    <CardMedia
                        component = "img"
                        height = "50%"
                        width = "100%"
                        image = {images[0]}
                    />
                    </Card>
                </Grid>
            </Grid>
        )
    }
    else if (numImages === 2){
        /* Displays two pictures if pic array length is 2*/
        return (
            <Grid container>
                <Grid item xs = {6} padding = "5px">
                  <Card>
                    <CardMedia
                      component = "img"
                      height = "100%"
                      width = "100%"
                      image = {images[0]}
                    />
                  </Card>
                </Grid>
                <Grid item xs = {6} padding = "5px">
                  <Card>
                    <CardMedia
                      component = "img"
                      height = "100%"
                      width = "100%"
                      image = {images[1]}
                    />
                  </Card>
                </Grid>
            </Grid>
        )
    }
    else{
        /* Displays 3 pictures if pic array length >= 3*/
        return (
            <Grid container>
              <Grid item xs = {8} padding = "5px">
                <Card>
                  <CardMedia
                    component = "img"
                    height = "100%"
                    width = "100%"
                    image = {images[0]}
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
                      image = {images[1]}
                    />
                  </Card>
                </Grid>
                <Grid item xs = {12} padding = "5px">
                  <Card>
                    <Box sx = {{ position: 'relative' }}>
                      <CardMedia
                        component = "img"
                        height = "50%"
                        width = "100%"
                        image = {images[2]}
                      />
                      <Box sx = {{ position: 'absolute', bottom: 10, right: 15, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant = "outlined"
                                sx = {{ color: "#000000", bgcolor: "#FFFFFF", borderColor: "#000000", fontSize: "20px", textTransform: "none" }}
                        >
                          <AppsIcon sx={{ marginRight: "7px" }}></AppsIcon>
                          Show All
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
        )
    }
}