import React, { useEffect, useState } from "react"
import { Box, Button, Grid, Typography, Container, TextField, RadioGroup, FormControlLabel, Checkbox, Radio, FormControl, FormLabel, FormGroup, MenuItem, Select, formControlClasses, CardMedia, Card } from '@mui/material';
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
  const [pictures, setPictures] = useState<string[]>([]);
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [unitType, setUnitType] = useState('')
  const [numBath, setNumBath] = useState('')
  const [schoolDistrict, setSchoolDistrict] = useState('')
  const [pets, setPets] = useState(false)
  const [utilities, setUtilities] = useState(false)
  const [furnished, setFurnished] = useState(false)
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

  // Picture upload
  const [files, setFiles] = useState<File[]>([]);

  const [prevPics, setPrevPics] = useState<string[]>([])

  const [pic0, setPic0] = useState<File[]>([]);
  const [pic1, setPic1] = useState<File[]>([]);
  const [pic2, setPic2] = useState<File[]>([]);

  // // Create state for image source and imageLoaded flag
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [count, setCount] = useState(0);


  // Navigation functionality
  const navigate = useNavigate();

  // Location functionality to retrieve the state variable passed 
  const location = useLocation();

  // [abstr] converts these example lists: 
  // ['house1','house2'] to ['','house1','house2']
  // ['house0','house2'] to ['house0','','house2']
  //  This is useful in the fetchFunction for the [FORM] specifically 
  const abstr = (lst: any) => {
    var result: string[] = []
    result.push((lst.includes('house0')) ? 'house0' : '')
    result.push((lst.includes('house1')) ? 'house1' : '')
    result.push((lst.includes('house2')) ? 'house2' : '')
    return result
  }

  // [fetchImages] populates the state list [imgSrc] with the 
  // the list of images that should be shown on the form
  const fetchImages = async (alist: any, dir: any) => {
    if (alist.length == 0) {
      imageSrc.push('');
      imageSrc.push('');
      imageSrc.push('');
    }
    else {
      let blist = abstr(alist)

      //for every entry in the [alist]: list of image keys that correspond to S3 storage
      for (const e of blist) {
        if (e == '') {
          //pushes dummy data onto the imgSrc bypass the 
          //API call and also maintain skeleton of imgSrc
          imageSrc.push('')
        } else {
          //creates the url parameters and routes to call [getListingPicture] in [listingController.tsx]
          const link = `${dir}/${e}`
          const response = await fetch('api/listingPicture/' + link);

          //creates a [blob] -> [URL] with response from GET api call
          const blob = await response.blob();
          const objectURL = URL.createObjectURL(blob);

          //populates the state list with the image url 
          imageSrc.push(objectURL)
        }
      }
    }
    setImagesLoaded(true);//flag to load the webpage
  }


  // Fetch the data related to id from the database
  const getListingDetails = async () => {

    let result = await fetch('/api/listing/' + location.state.id, {
      method: 'GET'
    })
    let json_object = await result.json()

    //retrieve the data entries to prepoulate the form 
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
    json_object.furnished === "true" ? setFurnished(true) : setFurnished(false)
    json_object.pets === "true" ? setPets(true) : setPets(false)
    json_object.utilities === "true" ? setUtilities(true) : setUtilities(false)
    setButtonLabel('Save Changes')
    setPrevPics(json_object.pictures)
    setPictures(json_object.pictures)


    //retrieve the images to prepopulate the form
    await fetchImages(json_object.pictures, json_object.streetAddress);
  }

  //THE MOST ANNOYING FUNCTIONG EVER ... the [useEffect] calls the [getListingDetails]
  useEffect(() => {
    if (location.state != null) {
      getListingDetails();
    }
  }, [pic0, pic1, imageSrc])


  const handleClick = (event: any, id: any) => {
    setCount(count + 1);
    if (id == 0) {
      //setDummyImg(URL.createObjectURL(event.target.files[0]));
      imageSrc.splice(0, 1, URL.createObjectURL(event.target.files[0]));
      pic0.push(event.target.files[0]);
    }
    else if (id == 1) {
      imageSrc.splice(1, 1, URL.createObjectURL(event.target.files[0]));
      pic1.push(event.target.files[0]);
    }
    else if (id == 2) {
      imageSrc.splice(2, 1, URL.createObjectURL(event.target.files[0]));
      pic2.push(event.target.files[0]);
    }
  }


  // [imageHandler] executes the API call for each image entry on the form
  //  It checks the image form entries to see if they have file data then makes 
  //  an API request with those file data
  const imageHandler = async (id: any) => {

    //Initilisation of helper variables 
    const alist: File[][] = [pic0, pic1, pic2]// alist is populated with the three images
    var temparr = prevPics

    const promises = alist.map(async (imgfle: any) => {
      let response = null;

      if (imgfle.length > 0) { // if there is something in this file
        // determines the name of the file to represent in S3 storage
        const index = alist.indexOf(imgfle)
        const placeholder = `house${index}`

        // the actual image file inputted by the user
        const pictureFile = imgfle[0]

        if (temparr.includes(placeholder) == false) {
          temparr.push(placeholder)
          temparr.sort()
        }
        // create a new formData object for each image
        const formData = new FormData()

        // populate the [formData : arr] entry to transfer in the api call
        for (var i = 0; i < temparr.length; i++) {
          formData.append('arr[]', temparr[i])
        }
        formData.append('pictures', pictureFile)
        formData.append('dirname', streetAddress)
        formData.append('filename', placeholder)

        response = await fetch('api/listingPicture/' + id, {
          method: 'PATCH',
          body: formData
        });
      }
    })

    // wait for all promises to resolve
    await Promise.all(promises)
  }

  const handeDel = async (event: any, id: any) => {
    setCount(count + 1);
    imageSrc.splice(id, 1, " ");
    await imageDeletion(id);

  }
  // [imageDeletion] "Deletes" an image
  // This function esentially replaces the current entry on the S3 with an empty placeholder
  const imageDeletion = async (id: any) => {
    const formData = new FormData()
    const placeholder = `house${id}`

    //Filters to remove this imageKey
    var temparr = prevPics;
    const index_of_pic = temparr.indexOf(placeholder);
    temparr.splice(index_of_pic, 1)

    //the placeholder file that replaces this image
    const placeholderFile = new File(
      ['placeholder content'],
      'placeholder-file-12345',
      { type: 'image/jpeg' },
    );


    if (temparr.length == 0) {
      formData.append('arr[]', "")
    }
    for (var i = 0; i < temparr.length; i++) {
      formData.append('arr[]', temparr[i])
    }
    formData.append('dirname', streetAddress)
    formData.append('filename', placeholder)
    formData.append('pictures', placeholderFile)

    // navigate('/listing-form', { state: { id: location.state.id } })
    //NOTE: this is 'PATCH' request and not a 'DELETE' request
    const response = await fetch('api/listingPicture/' + location.state.id, {
      method: 'DELETE',
      body: formData
    });

    return response
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

    if (location.state !== null && (landlord === '' || landlordPhone === '' || landlordEmail === '' || streetAddress === '' || city === '' || state === '' || country === '' || zipCode === '' || numBath === '' || price === '' || size === '')) {
      return;
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

    const action = (location.state === null) ? "create" : "edit"


    //if location.state is null it creates a POST request to create a listing
    //if location.state is not null it creates a PATCH request to edit the current listing
    const response1 =
      (location.state === null) ?
        await fetch('/api/listing/', {
          method: 'POST',
          body: JSON.stringify(listing),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        : await fetch('/api/listing/' + location.state.id, {
          method: 'PATCH',
          body: JSON.stringify(listing),
          headers: {
            'Content-Type': 'application/json'
          }
        })

    // Get listing ID from response to use in picture upload
    const json = await response1.json();
    const id = json.id;

    await imageHandler(id);


    if (!response1.ok) {
      setError(json.error)
    }
    if (response1.ok) {
      setWebScraped(false)

      setStreetAddress('')
      setCity('')
      setState('')
      setCountry('')
      setZipCode('')
      setFiles([])
      setPic0([])
      setPic1([])
      setPic2([])
      setPrice('')
      setSize('')
      setUnitType('')
      setNumBath('')
      setSchoolDistrict('')
      setPets(false)
      setUtilities(false)
      setFurnished(false)
      setDistTransportation('')
      setLandlord('')
      setLandlordEmail('')
      setLandlordPhone('')
      setLinkOrig('')
      setLinkApp('')
      setDateAvailable('')
      setError(null)

      if (action === "create") {
        navigate("/?action=create&type=listing")
      } else if (action === "edit") {
        navigate("/?action=edit&type=listing")
      }
    }
  }

  const blockInvalidChar = (e: any) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

  //if all the images have been loaded then render the screen
  if (!imagesLoaded && location.state != null) {
    return <div>Loading Form...</div>;
  }
  return (
    <>

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
              <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', mt: '3%' }}>
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
                    error={nameError} />
                </FormGroup>

                <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Phone Number</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                  </Box>
                  <TextField fullWidth
                    id="listing-landlordPhone"
                    variant="outlined"
                    size="small"
                    className="form-field"
                    type="tel"
                    name="landlordPhone"
                    placeholder="XXX-XXX-XXXX"
                    onChange={(e) => setLandlordPhone(e.target.value)}
                    value={landlordPhone}
                    error={numberError} />
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
                    error={emailError} />
                </FormGroup>
              </Box>

              <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', mt: '2%' }}>
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
                    value={linkOrig} />
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
                    value={linkApp} />
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
                    error={addressError} />
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
                    error={cityError} />
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
                    error={stateError} />
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
                    error={countryError} />
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
                    error={zipError} />
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
                    value={schoolDistrict} />
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
                  <Select
                    id="listing-numBath"
                    variant="outlined"
                    size="small"
                    className="form-field"
                    required={true}
                    onChange={(e) => setNumBath(e.target.value)}
                    name="numBath"
                    value={numBath}
                    error={bathError}
                  >
                    <MenuItem value={1}>1 Bath</MenuItem>
                    <MenuItem value={1.5}>1.5 Baths</MenuItem>
                    <MenuItem value={2}>2 Baths</MenuItem>
                    <MenuItem value={2.5}>2.5 Baths</MenuItem>
                    <MenuItem value={3}>3 Baths</MenuItem>
                    <MenuItem value={3.5}>3.5 Baths</MenuItem>
                    <MenuItem value={4}>4 Baths</MenuItem>
                    <MenuItem value={4.5}>4.5 Baths</MenuItem>
                    <MenuItem value={5}>5 Baths</MenuItem>
                  </Select>
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
                    value={price}
                    onKeyDown={blockInvalidChar}
                    onChange={({ target: { value } }) => {
                      setPrice(value);
                    }}
                    inputProps={{
                      min: '0'
                    }}
                    error={rentError} />
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
                    value={dateAvailable} />
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
                          control={<Checkbox
                            checked={furnished}
                            onChange={(e) => {
                              setFurnished(e.target.checked);
                            }} />} />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginRight: '12rem' }}>
                        <FormControlLabel
                          name="pets"
                          id="listing-pets"
                          value="pets"
                          label="Pet-friendly"
                          control={<Checkbox
                            checked={pets}
                            onChange={(e) => {
                              setPets(e.target.checked);
                            }} />} />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                        <FormControlLabel
                          name="utilities"
                          id="listing-utilities"
                          value="utilities"
                          label="Utilities included in rent"
                          control={<Checkbox
                            checked={utilities}
                            onChange={(e) => {
                              setUtilities(e.target.checked);
                            }} />} />
                      </Box>
                    </Box>
                  </FormGroup>
                </FormControl>
              </Box>

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
                    value={description} />
                </FormGroup>


                {/* ORIGINAL CODE FOR UPLOAD IMAGES */}
                <FormGroup>
                  <FormLabel sx={{ marginTop: '1rem' }}>Upload {count} Images</FormLabel>

                  <Grid
                    padding="10px 0px 0px 10px"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    paddingBottom='3%'>
                    <Grid container xs={12} alignItems="center">

                      <Grid item xs={4} sx={{ position: 'relative' }}>
                        <FormGroup>
                          <Card style={{ backgroundColor: "#FFFFFF" }}
                            sx={{
                              ':hover': { boxShadow: 20, cursor: 'pointer' },
                              width: "300px",
                              height: "310px",
                              borderRadius: "10px",
                              boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
                              flex: "none",
                              order: 1,
                              flexGrow: 0
                            }}
                            elevation={10}
                          > {/* Displays a picture of the listing at the top of the card */}
                            <CardMedia
                              //{imageSrc || ""}
                              component="img"
                              height="310px"
                              width="300px"
                              image={imageSrc[0]}
                            />
                          </Card>
                          <Button disableElevation variant='outlined' component='label'
                            sx={{
                              color: '#5D737E',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: "310px",
                              width: "300px",
                              borderRadius: "10px"
                            }}>
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
                                onChange={(event) => handleClick(event, 0)}
                              />
                            </Box>
                          </Button>
                        </FormGroup>
                      </Grid>


                      <Grid item xs={4} sx={{ position: 'relative' }}>
                        <FormGroup>
                          <Card style={{ backgroundColor: "#FFFFFF" }}
                            sx={{
                              ':hover': { boxShadow: 20, cursor: 'pointer' },
                              width: "300px",
                              height: "310px",
                              borderRadius: "10px",
                              boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
                              flex: "none",
                              order: 1,
                              flexGrow: 0
                            }}
                            elevation={10}

                          > {/* Displays a picture of the listing at the top of the card */}
                            <CardMedia
                              //{imageSrc || ""}
                              component="img"
                              height="310px"
                              width="300px"
                              image={imageSrc[1]}
                            />
                          </Card>
                          <Button disableElevation variant='outlined' component='label'
                            sx={{
                              color: '#5D737E',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: "310px",
                              width: "300px",
                              borderRadius: "10px"
                            }}>
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
                                onChange={(event) => handleClick(event, 1)} />
                            </Box>
                          </Button>
                        </FormGroup>
                      </Grid>


                      <Grid item xs={4} sx={{ position: 'relative' }}>
                        <FormGroup>
                          <Card style={{ backgroundColor: "#FFFFFF" }}
                            sx={{
                              ':hover': { boxShadow: 20, cursor: 'pointer' },
                              width: "300px",
                              height: "310px",
                              borderRadius: "10px",
                              boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
                              flex: "none",
                              order: 1,
                              flexGrow: 0
                            }}
                            elevation={10}

                          > {/* Displays a picture of the listing at the top of the card */}
                            <CardMedia
                              //{imageSrc || ""}
                              component="img"
                              height="310px"
                              width="300px"
                              image={imageSrc[2]}
                            />

                          </Card>
                          <Button disableElevation variant='outlined' component='label'
                            sx={{
                              color: '#5D737E',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              height: "310px",
                              width: "300px",
                              borderRadius: "10px"
                            }}>
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
                                onChange={(event) => handleClick(event, 2)} />
                            </Box>
                          </Button>
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container xs={12}>
                      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={async (event) => await handeDel(event, 0)}>
                          <Typography sx={{ textDecoration: 'underline', cursor: 'pointer', textTransform: 'none', color: '#000000', fontStyle: 'italic' }}>Delete Image</Typography>
                        </Button>
                      </Grid>
                      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={async (event) => await handeDel(event, 1)}>
                          <Typography sx={{ textDecoration: 'underline', cursor: 'pointer', textTransform: 'none', color: '#000000', fontStyle: 'italic' }}>Delete Image</Typography>
                        </Button>
                      </Grid>
                      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={async (event) => await handeDel(event, 2)}>
                          <Typography sx={{ textDecoration: 'underline', cursor: 'pointer', textTransform: 'none', color: '#000000', fontStyle: 'italic' }}>Delete Image</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </FormGroup>
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
            </form>
          </Grid>
        </Grid>
      </Container ></>
  )
}

export default ListingForm