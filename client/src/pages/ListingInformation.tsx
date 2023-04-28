import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Card, Button, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LinkIcon from '@mui/icons-material/Link';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from "react-router-dom";
import ImageContainer from '../components/ImageContainer';
import { useEffect, useState } from 'react';
import DeleteConfirmation from '../components/DeleteConfirmation';
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const ListingInformation = () => {

  // Allows us to access the state of the listing details
  const location = useLocation();

  // Navigation functionality
  const navigate = useNavigate();

  //states for the delete dialog pop up
  const [openPop, setOpenPop] = useState(false)

  //the function that calls the delete routing function
  const handleDelete = async (id: any) => {
    await fetch('/api/listing/' + id, {
      method: 'DELETE'
    })
    navigate("/")
  }

  // Create state for image source and imageLoaded flag
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  //The location.state.pictures will store all the pictures of this listing
  //The for loop will loop over each "key" in the pictures and 
  // Fetch image and create object URL when the component mounts
  const fetchImage = async () => {
    try {
      const promises = location.state.pictures.map(async (picture: any) => {
        const link = `${location.state.streetAddress}/${picture}`
        const response = await fetch('api/listingPicture/' + link)
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      }
      )
      const objectURLs = await Promise.all(promises);
      setImageSrc(objectURLs);
      setImagesLoaded(true);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
  useEffect(() => {
    fetchImage();
    console.log(location.state.description);
  }, [location.state.pictures, location.state.streetAddress])


  //[location.state.pictures, location.state.streetAddress]
  //if all the images have been loaded then render the screen
  if (!imagesLoaded) {
    return <div>Loading images...</div>;
  }


  return (
    <><Grid padding="1% 5%">
      {/* Back button */}
      <Grid item xs={1}>
        <Button disableElevation
          startIcon={<ArrowBackIosNewIcon />}
          variant="outlined"
          size="large"
          onClick={() => navigate("/")}
          sx={{ marginTop: '2rem', padding: "0 1rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '15px', color: '#5D737E', borderWidth: '0.14rem', borderColor: '#5D737E', bgcolor: 'white', ':hover': { bgcolor: "#5D737EB5" } }}
        >
          Back
        </Button>
      </Grid>

      <Grid item xs={12}>

        {/* The Image Section */}
        <ImageContainer images={imageSrc} numImages={location.state.pictures.length} />

        <Grid container padding="15px 0px">
          {/* Main content */}
          <Grid item xs={12} md={8}>

            {/* Listing address, edit, and delete buttons */}
            <Grid container>
              <Grid item xs={9}>
                <Typography variant="h6" display="flex" sx={{ fontSize: "36px", fontWeight: 700, color: "#000000" }}>
                  {location.state.streetAddress}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => navigate('/listing-form', { state: { id: location.state.id } })}>
                  <EditOutlined fontSize="large" />
                </IconButton>
                {/* <IconButton onClick={() => handleDelete(location.state.id)}></IconButton> */}
                <IconButton onClick={() => setOpenPop(true)}>
                  <DeleteOutlined fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
            <Typography paddingBottom={"20px"} sx={{ color: "#343434", fontSize: "16px", fontStyle: "italic" }}>
              {location.state.webscraped == "true" ? "This listing has been webscraped from apartments.com" : ""}
            </Typography>

            {/* Listing information */}
            <Grid item padding="10px 0px" xs={12}>
              <Typography sx={{ fontWeight: 700, color: "#000000" }}>
                ${location.state.price}/mo
              </Typography>
              <Typography>
                {location.state.size === "One Bed" ? "1bed" : location.state.size === "Two Bed" ? "2bed" :
                  location.state.size === "Three Bed" ? "3bed" : location.state.size === "Four Bed" ? "4bed" :
                    location.state.size === "Five Bed" ? "5bed" : location.state.size === "Six Bed" ? "6bed" :
                      location.state.size === "Studio" ? "studio" : <p></p>} {location.state.numBath}bath
              </Typography>
              <Typography>
                {location.state.landlord}
              </Typography>
              <Typography>
                {location.state.unitType}
              </Typography>
            </Grid>

            {/* Listing availability */}
            <Grid item padding="10px 0px" xs={12}>
              {location.state.dateAvailable ?
                <Typography sx={{ fontWeight: 700, color: "#000000" }}>
                  Available From: {location.state.dateAvailable}
                </Typography> :
                <Typography sx={{ fontWeight: 700, color: "#000000" }}>
                  Availability date not included
                </Typography>}
            </Grid>

            {/* Listing description */}
            <Grid item padding="10px 0px" xs={10}>
              <Typography sx={{ color: "#343434", fontStyle: "italic" }}>
                {location.state.description ? location.state.description : "no description included"}
              </Typography>
            </Grid>

            {/* Home highlights */}
            <Grid item padding="10px 0px">
              <Typography sx={{ fontWeight: 700, color: "#2F2F2F" }}>
                Home Highlights
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  {location.state.utilities ?
                    (location.state.utilities == "true" ?
                      <Typography display="flex">
                        <CheckIcon sx={{ marginRight: "5px" }}></CheckIcon>
                        utilities included: gas, water, heat
                      </Typography> :
                      <Typography display="flex">
                        <CloseIcon sx={{ marginRight: "5px" }}></CloseIcon>
                        utilities not included
                      </Typography>) :
                    <Typography display="flex">
                      <QuestionMarkIcon sx={{ marginRight: "5px" }}></QuestionMarkIcon>
                      utilities unknown
                    </Typography>
                  }
                  {location.state.pets ?
                    (location.state.pets == "true" ?
                      <Typography display="flex">
                        <CheckIcon sx={{ marginRight: "5px" }}></CheckIcon>
                        dog-friendly
                      </Typography> :
                      <Typography display="flex">
                        <CloseIcon sx={{ marginRight: "5px" }}></CloseIcon>
                        not dog-friendly
                      </Typography>) :
                    <Typography display="flex">
                      <QuestionMarkIcon sx={{ marginRight: "5px" }}></QuestionMarkIcon>
                      dog-friendly unknown
                    </Typography>
                  }
                </Grid>
                <Grid item xs={6}>
                  {location.state.furnished ?
                    (location.state.furnished == "true" ?
                      <Typography display="flex">
                        <CheckIcon sx={{ marginRight: "5px" }}></CheckIcon>
                        fully furnished
                      </Typography> :
                      <Typography display="flex">
                        <CloseIcon sx={{ marginRight: "5px" }}></CloseIcon>
                        not fully furnished
                      </Typography>) :
                    <Typography display="flex">
                      <QuestionMarkIcon sx={{ marginRight: "5px" }}></QuestionMarkIcon>
                      fully furnished unknown
                    </Typography>
                  }
                  {location.state.pets ?
                    (location.state.pets == "true" ?
                      <Typography display="flex">
                        <CheckIcon sx={{ marginRight: "5px" }}></CheckIcon>
                        cat-friendly
                      </Typography> :
                      <Typography display="flex">
                        <CloseIcon sx={{ marginRight: "5px" }}></CloseIcon>
                        not cat-friendly
                      </Typography>) :
                    <Typography display="flex">
                      <QuestionMarkIcon sx={{ marginRight: "5px" }}></QuestionMarkIcon>
                      cat-friendly unknown
                    </Typography>
                  }
                </Grid>
              </Grid>
            </Grid>

          </Grid>
          {/* End main content */}

          {/* Sidebar */}
          <Grid item xs={12} md={4}>

            {/* Contact info card*/}
            <Grid item padding="10px 7px">
              <Card style={{ backgroundColor: "#EAEAEA", borderRadius: "10px" }} elevation={3}>
                <Grid container padding="10px 10px">
                  <Grid item padding="5px 0px" xs={12}>
                    <Typography textAlign={"center"} sx={{ fontWeight: 700 }}>
                      Contact Info
                    </Typography>
                  </Grid>
                  <Grid item padding="5px 0px" xs={12}>
                    {location.state.landlordEmail ?
                      <Typography display="flex" justifyContent="center">
                        <EmailIcon sx={{ marginRight: "5px" }}></EmailIcon> {location.state.landlordEmail}
                      </Typography> : <Typography display="flex" justifyContent="center">
                        No landlord email included
                      </Typography>
                    }
                  </Grid>
                  <Grid item padding="5px 0px" xs={12}>
                    {location.state.landlordPhone ?
                      <Typography display="flex" justifyContent="center">
                        <SmartphoneIcon sx={{ marginRight: "5px" }}></SmartphoneIcon> {location.state.landlordPhone}
                      </Typography> : <Typography display="flex" justifyContent="center">
                        No landlord phone number included
                      </Typography>
                    }
                  </Grid>
                  <Grid item padding="5px 0px" xs={12}>
                    {location.state.linkApp ?
                      <Typography display="flex" justifyContent="center">
                        <LinkIcon sx={{ marginRight: "5px" }}></LinkIcon> {location.state.linkApp}
                      </Typography> : <Typography display="flex" justifyContent="center">
                        No application link included
                      </Typography>
                    }
                  </Grid>
                </Grid>
              </Card>
            </Grid>

          </Grid>
          {/* End sidebar */}
        </Grid>
      </Grid>
    </Grid>

      <DeleteConfirmation id={location.state.id} openPop={openPop} setOpenPop={setOpenPop} handleDelete={handleDelete} type={"listing"} />
    </>
  )
}

export default ListingInformation