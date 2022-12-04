import { Card, CardMedia, Grid } from "@mui/material"

interface imageContainerProp {
    numImages: number
}

export default function ImageContainer ({images, numImages}: {images: string[], numImages:number}) {

    if (numImages === 1){
        {/* Displays a single picture if pic array length is 1*/}
        return (
            <Grid container>
                <Grid item xs = {12}>
                    <Card>
                    <CardMedia
                        component = "img"
                        height = "70%"
                        width = "70%"
                        image = {images[0]}
                    />
                    </Card>
                </Grid>
            </Grid>
        )
    }
    else if (numImages === 2){
        {/* Displays two pictures if pic array length is 2*/}
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
        {/* Displays 3 pictures if pic array length >= 3*/}
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
                    <Grid item>
                      <CardMedia
                        component = "img"
                        height = "50%"
                        width = "100%"
                        image = {images[2]}
                      />
                      {/* <Button>Show All</Button> */}
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
        )
    }
}