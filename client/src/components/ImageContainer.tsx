import { Card, CardMedia, Grid } from "@mui/material"
import { useState } from "react";

export default function ImageContainer({ images, numImages }: { images: string[], numImages: number }) {

  const [firstImageHeight, setFirstImageHeight] = useState<number | null>(null);

  const handleFirstImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setFirstImageHeight(event.currentTarget.clientHeight);
  };

  if (numImages === 0) {
    return (<Grid container></Grid>)
  }
  else if (numImages === 1) {
    /* Displays a single picture if pic array length is 1*/
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardMedia
              component="img"
              height="50%"
              width="100%"
              image={images[0]}
              style={{ maxHeight: "500px" }}
              onLoad={handleFirstImageLoad}
            />
          </Card>
        </Grid>
      </Grid>
    )
  }
  else if (numImages === 2) {
    /* Displays two pictures if pic array length is 2*/
    return (
      <Grid container>
        <Grid item xs={6} padding="5px">
          <Card>
            <CardMedia
              component="img"
              height={firstImageHeight ? `${firstImageHeight}px` : 'none'}
              width="100%"
              style={{ maxHeight: firstImageHeight ? `${firstImageHeight}px` : 'none' }}
              image={images[0]}
              onLoad={handleFirstImageLoad}
            />
          </Card>
        </Grid>
        <Grid item xs={6} padding="5px">
          <Card>
            <CardMedia
              component="img"
              height={firstImageHeight ? `${firstImageHeight}px` : 'none'}
              width="100%"
              style={{ maxHeight: firstImageHeight ? `${firstImageHeight}px` : 'none' }}
              image={images[1]}
            />
          </Card>
        </Grid>
      </Grid>
    )
  }
  else {
    /* Displays 3 pictures if pic array length >= 3*/
    return (
      <Grid container>
        <Grid item xs={8} padding="5px">
          <Card>
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              style={{ maxHeight: "500px" }}
              image={images[0]}
              onLoad={handleFirstImageLoad}
            />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12} padding="5px">
            <Card>
              <CardMedia
                component="img"
                height={firstImageHeight ? `${firstImageHeight / (numImages - 1)}px` : 'none'}
                width="100%"
                style={{ maxHeight: firstImageHeight ? `${firstImageHeight / (numImages - 1)}px` : 'none' }}
                image={images[1]}
              />
            </Card>
          </Grid>
          <Grid item xs={12} padding="5px">
            <Card>
              <CardMedia
                component="img"
                height={firstImageHeight ? `${firstImageHeight / (numImages - 1)}px` : 'none'}
                width="100%"
                style={{ maxHeight: firstImageHeight ? `${firstImageHeight / (numImages - 1)}px` : 'none' }}
                image={images[2]}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}