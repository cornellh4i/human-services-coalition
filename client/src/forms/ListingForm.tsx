import React, { useEffect, useState } from "react"
import { Box, Button, Grid, Typography, Container, TextField, RadioGroup, FormControlLabel, Checkbox, Radio, FormControl, FormLabel, FormGroup, MenuItem, Select } from '@mui/material';
import { PhotoCamera } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ListingForm = () => {
  const [webScraped, setWebScraped] = useState(false)
  const [description, setDescription] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [pictures, setPictures] = useState<string[]>([''])
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [unitType, setUnitType] = useState('')
  const [numBath, setNumBath] = useState('')
  const [schoolDistrict, setSchoolDistrict] = useState('')
  const [pets, setPets] = useState(false)
  const [petsIsTrue, setPetsIsTrue] = useState(false)
  const [utilities, setUtilities] = useState(false)
  const [utilitiesIsTrue, setUtilitiesIsTrue] = useState(false)
  const [furnished, setFurnished] = useState(false)
  const [furnishedIsTrue, setFurnishedIsTrue] = useState(false)
  const [distTransportation, setDistTransportation] = useState('')
  const [landlord, setLandlord] = useState('')
  const [landlordEmail, setLandlordEmail] = useState('')
  const [landlordPhone, setLandlordPhone] = useState('')
  const [linkOrig, setLinkOrig] = useState('')
  const [linkApp, setLinkApp] = useState('')
  const [dateAvailable, setDateAvailable] = useState('')
  const [error, setError] = useState(null)
  const [buttonLabel, setButtonLabel] = useState('Create New Listing')

  // Enforces Validation
  const [nameError, setNameError] = useState(false)
  const [numberError, setNumberError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [zipError, setZipError] = useState(false)
  const [bathError, setBathError] = useState(false)
  const [rentError, setRentError] = useState(false)
  const [bedsError, setBedsError] = useState(false)

  // Navigation functionality
  const navigate = useNavigate();

  // Location functionality to retrieve the state variable passed 
  const location = useLocation();

  // Contains what will prepopulate the form if location.state is not null
  useEffect(() => {
    if (location.state != null) { getListingDetails() }
  }, [])

  // Fetch the data related to id from the database
  const getListingDetails = async () => {
    let result = await fetch('/api/listing/' + location.state.id, {
      method: 'GET'
    })
    let json_object = await result.json()

    setStreetAddress(json_object.streetAddress)
    setDescription(json_object.description)
    setState(json_object.state)
    setCity(json_object.city)
    setCountry(json_object.country)
    setLandlord(json_object.landlord)
    setLandlordPhone(json_object.landlordPhone)
    setLandlordEmail(json_object.landlordEmail)
    setLinkApp(json_object.linkApp)
    setLinkOrig(json_object.linkOrig)
    setDistTransportation(json_object.distTransportation)
    setSchoolDistrict(json_object.schoolDistrict)
    setZipCode(json_object.zipCode)
    setUnitType(json_object.unitType)
    setSize(json_object.size)
    setNumBath(json_object.numBath)
    setPrice(json_object.price)
    if (json_object.dateAvailable != null) setDateAvailable(json_object.dateAvailable.split('T')[0]); // to make date readable
    setSchoolDistrict(json_object.schoolDistrict)
    setFurnishedIsTrue(json_object.furnished)
    setPetsIsTrue(json_object.pets)
    setUtilitiesIsTrue(json_object.utilities)
    setPictures(json_object.pictures)
    setButtonLabel('Save Changes')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (landlord === '') {
      setNameError(true)
    }
    if (landlordPhone === '') {
      setNumberError(true)
    }
    if (landlordEmail === '') {
      setEmailError(true)
    }
    if (streetAddress === '') {
      setAddressError(true)
    }
    if (city === '') {
      setCityError(true)
    }
    if (state === '') {
      setStateError(true)
    }
    if (country === '') {
      setCountryError(true)
    }
    if (zipCode === '') {
      setZipError(true)
    }
    if (numBath === '') {
      setBathError(true)
    }
    if (price === '') {
      setRentError(true)
    }
    if (size === '') {
      setBedsError(true)
    }

    const listing = {
      webScraped,
      description,
      streetAddress,
      city,
      state,
      country,
      zipCode,
      pictures,
      price,
      size,
      unitType,
      numBath,
      schoolDistrict,
      pets,
      utilities,
      furnished,
      distTransportation,
      landlord,
      landlordEmail,
      landlordPhone,
      linkOrig,
      linkApp,
      dateAvailable
    }
    //if location.state is null it creates a POST request to create a listing
    //if location.state is not null it creates a PATCH request to edit the current listing
    const response =
      (location.state === null) ?
        await fetch('/api/listing/', {
          method: 'POST',
          body: JSON.stringify(listing),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        : await fetch('/api/listing/' + location.state.id, {
          method: 'PATCH',
          body: JSON.stringify(listing),
          headers: {
            'Content-Type': 'application/json',
          }
        })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setWebScraped(false)
      setDescription('')
      setStreetAddress('')
      setCity('')
      setState('')
      setCountry('')
      setZipCode('')
      setPictures([''])
      setPrice('')
      setSize('')
      setUnitType('')
      setNumBath('')
      setSchoolDistrict('')
      setPets(false)
      setPetsIsTrue(false)
      setUtilities(false)
      setUtilitiesIsTrue(false)
      setFurnished(false)
      setFurnishedIsTrue(false)
      setDistTransportation('')
      setLandlord('')
      setLandlordEmail('')
      setLandlordPhone('')
      setLinkOrig('')
      setLinkApp('')
      setDateAvailable('')
      setError(null)

      navigate("/")
    }
  }

  // const uploadImages = (e: any) => {
  //   console.log(e.target.files)
  //   let images = e.target.files;
  //   if (images) {
  //     for (let i = 0; i < images.length; i++) {
  //       let img = URL.createObjectURL(e.target.files[i]);
  //       if (pictures[0] === ''){
  //         setPictures([img]);
  //       }
  //       else setPictures([...pictures, img]);
  //     } 
  //   }
  // };

  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={2} alignSelf="flex-start">
          <Button disableElevation
            startIcon={<ArrowBackIosNewIcon />}
            variant="outlined"
            size="large"
            onClick={() => navigate("/")}
            sx={{ marginTop: '2rem', padding: "0 1rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '12px', color: '#5D737E', borderWidth: '0.14rem', borderColor: '#5D737E', bgcolor: 'white', ':hover': { bgcolor: "#5D737EB5" } }}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={8}>
          <form noValidate className="listing-form" onSubmit={handleSubmit}>
            <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', mt: '3%' }} >
              Landlord Contact Information
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Name</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField fullWidth
                  id="listing-landlord"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="text"
                  required={true}
                  name="landlord"
                  onChange={(e) => setLandlord(e.target.value)}
                  value={landlord}
                  error={nameError}
                />
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Number</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField fullWidth
                  id="listing-landlordPhone"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="tel"
                  name="landlordPhone"
                  onChange={(e) => setLandlordPhone(e.target.value)}
                  value={landlordPhone}
                  error={numberError}
                />
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Email</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField fullWidth
                  id="listing-landlordEmail"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="email"
                  name="landlordEmail"
                  onChange={(e) => setLandlordEmail(e.target.value)}
                  value={landlordEmail}
                  error={emailError}
                />
              </FormGroup>
            </Box>

            <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', mt: '2%' }} >
              Listing Information
            </Typography>

            <Box>
              <FormGroup>
                <FormLabel sx={{ marginTop: '1rem' }}>Link to Listing</FormLabel>
                <TextField fullWidth
                  id="listing-linkOrig"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="url"
                  name="linkOrig"
                  onChange={(e) => setLinkOrig(e.target.value)}
                  value={linkOrig}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel sx={{ marginTop: '1rem' }}>Link to Housing Application</FormLabel>
                <TextField fullWidth
                  id="listing-linkApp"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="url"
                  name="linkApp"
                  onChange={(e) => setLinkApp(e.target.value)}
                  value={linkApp}
                />
              </FormGroup>
              <FormGroup>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', marginTop: '1rem' }}>
                  <FormLabel>Street Address</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField fullWidth
                  id="listing-streetAddress"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="text"
                  required={true}
                  name="streetAddress"
                  onChange={(e) => setStreetAddress(e.target.value)}
                  value={streetAddress}
                  error={addressError}
                />
              </FormGroup>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>City</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField
                  id="listing-city"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="text"
                  required={true}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  error={cityError}
                />
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>State</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField
                  id="listing-state"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="text"
                  required={true}
                  name="state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  error={stateError}
                />
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Country</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField
                  id="listing-country"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="text"
                  required={true}
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  error={countryError}
                />
              </FormGroup>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Zip Code</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField
                  id="listing-zipCode"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="text"
                  required={true}
                  name="zipCode"
                  onChange={(e) => setZipCode(e.target.value)}
                  value={zipCode}
                  error={zipError}
                />
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                <FormLabel>School District</FormLabel>
                <TextField
                  id="listing-schoolDistrict"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="text"
                  name="schoolDistrict"
                  onChange={(e) => setSchoolDistrict(e.target.value)}
                  value={schoolDistrict}
                />
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1' }}>
                <FormLabel>Distance to Transportation</FormLabel>
                <Select
                  name="distTransportation"
                  variant="outlined"
                  size="small"
                  id="listing-distTransportation"
                  onChange={(e) => setDistTransportation(e.target.value)}
                  value={distTransportation}
                >
                  <MenuItem key={"Close"} value="Close">Close</MenuItem>
                  <MenuItem key={"Medium"} value="Medium">Medium</MenuItem>
                  <MenuItem key={"Far"} value="Far">Far</MenuItem>
                </Select>
              </FormGroup>
            </Box>

            <Box sx={{ marginTop: '1rem' }}>
              <FormControl>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Property Type</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <RadioGroup row
                  name="unitType"
                  id="listing-unitType"
                  // required={true}
                  onChange={(e) => setUnitType(e.target.value)}
                  value={unitType}
                // error={propertyError}
                >
                  <FormControlLabel sx={{ marginRight: '9rem' }} value="Apartment" label="Apartment" control={<Radio />} />
                  <FormControlLabel sx={{ marginRight: '9rem' }} value="Condo" label="Condo" control={<Radio />} />
                  <FormControlLabel sx={{ marginRight: '9rem' }} value="House" label="House" control={<Radio />} />
                  <FormControlLabel value="Single Room" label="Single Room" control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '2' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Beds</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <Select
                  name="size"
                  variant="outlined"
                  size="small"
                  id="listing-size"
                  required={true}
                  onChange={(e) => setSize(e.target.value)}
                  value={size}
                  error={bedsError}
                >
                  <MenuItem key={"Studio"} value="Studio">Studio</MenuItem>
                  <MenuItem key={"One Bed"} value="One Bed">One Bed</MenuItem>
                  <MenuItem key={"Two Bed"} value="Two Bed">Two Bed</MenuItem>
                  <MenuItem key={"Three Bed"} value="Three Bed">Three Bed</MenuItem>
                  <MenuItem key={"Four Bed"} value="Four Bed">Four Bed</MenuItem>
                  <MenuItem key={"Five Bed"} value="Five Bed">Five Bed</MenuItem>
                  <MenuItem key={"Six Bed"} value="Six Bed">Six Bed</MenuItem>
                </Select>
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Baths</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField
                  id="listing-numBath"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="number"
                  required={true}
                  name="numBath"
                  onChange={(e) => setNumBath(e.target.value)}
                  value={numBath}
                  error={bathError}
                />
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Monthly Rent</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField
                  id="listing-price"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="number"
                  required={true}
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  error={rentError}
                />
              </FormGroup>
            </Box>

            <Box sx={{ marginTop: '1rem' }}>
              <FormGroup>
                <FormLabel>Earliest Move in Date</FormLabel>
                <TextField
                  sx={{ maxWidth: '33%' }}
                  id="listing-dateAvailable"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="date"
                  name="dateAvailable"
                  onChange={(e) => setDateAvailable(e.target.value)}
                  value={dateAvailable}
                />
              </FormGroup>
            </Box>

            <Box sx={{ marginTop: '1rem' }}>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <FormGroup row
                >
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginRight: '12rem' }}>
                      <FormControlLabel
                        name="furnished"
                        id="listing-furnished"
                        value="furnished"
                        label="Furnished"
                        control={
                          <Checkbox
                            checked={furnishedIsTrue}
                            onChange={(e) => {
                              setFurnishedIsTrue(e.target.checked);
                              setFurnished(!furnishedIsTrue)
                            }}
                          />}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginRight: '12rem' }}>
                      <FormControlLabel
                        name="pets"
                        id="listing-pets"
                        value={pets}
                        label="Pet-friendly"
                        control={
                          <Checkbox
                            checked={petsIsTrue}
                            onChange={(e) => {
                              setPetsIsTrue(e.target.checked);
                              setPets(!petsIsTrue)
                            }}
                          />}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                      <FormControlLabel
                        name="utilities"
                        id="listing-utilities"
                        value="utilities"
                        label="Utilities included in rent"
                        control={
                          <Checkbox
                            checked={utilitiesIsTrue}
                            onChange={(e) => {
                              setUtilitiesIsTrue(e.target.checked);
                              setUtilities(!utilitiesIsTrue)
                            }}
                          />}
                      />
                    </Box>
                  </Box>
                </FormGroup>
              </FormControl>
            </Box >

            <Box sx={{ marginTop: '1rem' }}>
              <FormGroup>
                <FormLabel>Description</FormLabel>
                <TextField fullWidth
                  id="listing-description"
                  variant="outlined"
                  size="small"
                  className="form-field"
                  type="text"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </FormGroup>


              <FormGroup>
                <FormLabel sx={{ marginTop: '1rem' }}>Upload Images</FormLabel>
                <Button disableElevation variant='outlined' component='label' sx={{ color: '#5D737E', marginBottom: '1rem' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8rem' }}>
                    <PhotoCamera sx={{ fontSize: '3rem', margin: 'auto' }} />
                    <input
                      hidden
                      id="listing-pictures"
                      className="form-field"
                      type="list"
                      multiple={true}
                      name="pictures"
                      onChange={(e) => setPictures(['https://t4.ftcdn.net/jpg/02/65/15/77/360_F_265157782_7wJFjBLD47WtQljpG9ivndc5AEVTwypu.jpg',
                        'https://t4.ftcdn.net/jpg/02/65/15/77/360_F_265157782_7wJFjBLD47WtQljpG9ivndc5AEVTwypu.jpg',
                        'https://t4.ftcdn.net/jpg/02/65/15/77/360_F_265157782_7wJFjBLD47WtQljpG9ivndc5AEVTwypu.jpg'])}
                      value={pictures}
                    />
                  </Box>
                </Button>
              </FormGroup>

              {/* ORIGINAL CODE FOR UPLOAD IMAGES */}
              {/* <FormGroup>
                <FormLabel sx={{ marginTop: '1rem' }}>Upload Images</FormLabel>
                <Button disableElevation variant='outlined' component='label' sx={{ color: '#5D737E', marginBottom: '1rem' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8rem' }}>
                    <PhotoCamera sx={{ fontSize: '3rem', margin: 'auto' }} />
                    <input
                      hidden
                      id="listing-pictures"
                      className="form-field"
                      accept="image/*"
                      type="file"
                      multiple={true}
                      name="pictures"
                      onChange={(e) => uploadImages(e)}
                    />
                  </Box>
                </Button>
              </FormGroup> */}

            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '2rem' }}>
              <Button disableElevation
                variant="outlined"
                size="large"
                sx={{ padding: "0 3.5rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '12px', color: '#5D737E', borderColor: '#5D737E', bgcolor: 'white', ':hover': { bgcolor: "#5D737EB5" } }}
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button disableElevation
                type="submit"
                variant="contained"
                size="large"
                sx={{ marginLeft: "10px", padding: "0 2rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '12px', color: 'white', bgcolor: '#ED5F1E', ':hover': { bgcolor: "#ED5F1EB5" } }}
              >
                {buttonLabel}
              </Button>
            </Box>
          </form >
        </Grid>
      </Grid>
    </Container >
  )
}

export default ListingForm