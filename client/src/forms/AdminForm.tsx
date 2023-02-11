import { Box, Button, Container, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useState } from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import React from "react";


const AdminForm = () => {

  const [affiliation, setAffiliation] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [mInitial, setMInitial] = useState('')
  const [prefName, setPrefName] = useState('')
  const [gender, setGender] = useState('')
  const [race, setRace] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [contactPref, setContactPref] = useState('')
  const [error, setError] = useState(null)

  const [affiliationError, setAffiliationError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [fNameError, setFNameError] = useState(false)
  const [lNameError, setLNameError] = useState(false)

   // Navigation functionality
   const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (affiliation === '') {
      setAffiliationError(true)
    }
    if (email === '') {
      setEmailError(true)
    }
    if (username === '') {
      setUsernameError(true)
    }
    if (password === '') {
      setPasswordError(true)
    }
    if (fName === '') {
      setFNameError(true)
    }
    if (lName === '') {
      setLNameError(true)
    }

    const admin = {
      password,
      username,
      affiliation,
      fName,
      lName,
      mInitial,
      prefName,
      gender,
      race,
      email,
      phone,
      birthdate,
      contactPref
    }

    const response = await fetch('/api/admins/', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setAffiliation('')
      setUsername('')
      setPassword('')
      setFname('')
      setLname('')
      setMInitial('')
      setPrefName('')
      setGender('')
      setRace('')
      setEmail('')
      setPhone('')
      setBirthdate('')
      setContactPref('')
      setError(null)

      setAffiliationError(false)
      setEmailError(false)
      setUsernameError(false)
      setPasswordError(false)
      setFNameError(false)
      setLNameError(false)

      navigate('/manage-profiles')
    }
  }

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleRaceChange = (event: SelectChangeEvent) => {
    setRace(event.target.value as string);
  };

  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={2} alignSelf="flex-start">
          <Button disableElevation
            startIcon={<ArrowBackIosNewIcon /> }
            variant="outlined"
            size="large"
            onClick={() => navigate("/")}
            sx={{ marginTop: '2rem', padding: "0 1rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '15px', color: '#5D737E', borderWidth: '0.14rem', borderColor: '#5D737E', bgcolor: 'white', ':hover': { bgcolor: "#5D737EB5" } }}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={8}>
          <form noValidate className="admin-form" onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', mt: '3%' }} >
                Create a New Admin
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Affiliation</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                  </Box>
                  <TextField fullWidth
                    id="affiliation"
                    name="affiliation"
                    className="form-field"
                    onChange={(e) => setAffiliation(e.target.value)}
                    value={affiliation}
                    variant="outlined"
                    size="small"
                    type="text"
                    required
                    error={affiliationError}
                  />
                </FormGroup>
              </Box>
            </Grid>


            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <FormGroup sx={{ flexGrow: '1' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Email</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                  </Box>
                  <TextField fullWidth
                    id="email"
                    name="email"
                    className="form-field"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    variant="outlined"
                    size="small"
                    type="text"
                    error={emailError}
                  />
                </FormGroup>

                <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Phone Number</FormLabel>
                  </Box>
                  <TextField fullWidth
                    id="phone"
                    name="phone"
                    className="form-field"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    variant="outlined"
                    size="small"
                    type="tel"
                    placeholder="XXX-XXX-XXXX"
                    // NOT FUNCTIONAL, PATTERN IS NOT ENFORCED.
                    inputProps={{
                      pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    }}
                  />
                </FormGroup>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <FormGroup sx={{ flexGrow: '1' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Preferred Contact Method</FormLabel>
                  </Box>
                  <RadioGroup row
                    id="contactpref"
                    name="contactpref"
                    className="select-field"
                    placeholder="Preferred Contact Method"
                    onChange={(e) => setContactPref(e.target.value)}
                    value={contactPref}
                  >
                    <FormControlLabel sx={{ marginRight: '4rem' }} value="Email" label="Email" control={<Radio />} />
                    <FormControlLabel sx={{ marginRight: '4rem' }} value="Phone Number" label="Phone" control={<Radio />} />
                  </RadioGroup>
                </FormGroup>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Grid item xs={5.5}>
                  <FormGroup sx={{ flexGrow: '1' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                      <FormLabel>First Name</FormLabel>
                      <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                    </Box>
                    <TextField fullWidth
                      id="fName"
                      name="fName"
                      className="form-field"
                      onChange={(e) => setFname(e.target.value)}
                      value={fName}
                      required
                      variant="outlined"
                      size="small"
                      type="text"
                      error={fNameError}
                    />
                  </FormGroup>
                </ Grid>

                <Grid item xs={1}>
                  <FormGroup sx={{ flexGrow: '1', marginLeft: '1.5rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                      <FormLabel>MI</FormLabel>
                    </Box>
                    <TextField fullWidth
                      id="mInitial"
                      name="mInitial"
                      className="form-field"
                      onChange={(e) => setMInitial(e.target.value)}
                      value={mInitial}

                      variant="outlined"
                      size="small"
                      type="text"
                    />
                  </FormGroup>
                </ Grid>

                <Grid item xs={5.5}>
                  <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                      <FormLabel>Last Name</FormLabel>
                      <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                    </Box>
                    <TextField fullWidth
                      id="lName"
                      name="lName"
                      className="form-field"
                      onChange={(e) => setLname(e.target.value)}
                      value={lName}
                      required
                      variant="outlined"
                      size="small"
                      type="text"
                      error={lNameError}
                    />
                  </FormGroup>
                </ Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <FormGroup sx={{ flexGrow: '1' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Username</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                  </Box>
                  <TextField fullWidth
                    id="username"
                    name="username"
                    className="form-field"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    variant="outlined"
                    size="small"
                    type="text"
                    error={usernameError}
                  />
                </FormGroup>

                <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Password</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                  </Box>
                  <TextField fullWidth
                    id="password"
                    name="password"
                    className="form-field"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    variant="outlined"
                    size="small"
                    type="text"
                    error={passwordError}
                  />
                </FormGroup>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', mt: '3%' }} >
                Additional Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                        <FormLabel>Preferred Name</FormLabel>
                      </Box>
                      <TextField fullWidth
                        id="prefName"
                        name="prefName"
                        className="form-field"
                        onChange={(e) => setPrefName(e.target.value)}
                        value={prefName}
                        variant="outlined"
                        size="small"
                        type="text"
                      />
                    </FormGroup>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                        <FormLabel>Birthdate</FormLabel>
                      </Box>
                      <TextField fullWidth
                        id="birthDate"
                        name="birthDate"
                        className="form-field"
                        onChange={(e) => setBirthdate(e.target.value)}
                        value={birthdate}
                        variant="outlined"
                        size="small"
                        type="date"
                      />
                    </FormGroup>
                  </Box>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                        <FormLabel>Gender</FormLabel>
                      </Box>
                      <Select
                        value={gender}
                        onChange={handleGenderChange}
                        id="gender"
                        name="gender"
                        size="small"
                        className="select-field"
                        fullWidth>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"None-Binary"}>Non-Binary</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                        <MenuItem value={"Prefer Not to Respond"}>Prefer Not to Respond</MenuItem>
                      </Select>
                    </FormGroup>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                        <FormLabel>Race</FormLabel>
                      </Box>
                      <Select
                        value={race}
                        onChange={handleRaceChange}
                        id="race"
                        name="race"
                        size="small"
                        className="select-field"
                        fullWidth>
                        <MenuItem value={"White"}>White</MenuItem>
                        <MenuItem value={"Black"}>Black</MenuItem>
                        <MenuItem value={"Asian"}>Asian</MenuItem>
                        <MenuItem value={"Hispanic"}>Hispanic or Latino</MenuItem>
                        <MenuItem value={"Native Hawaiian or Pacific Islander"}>Native Hawaiian or Pacific Islander</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormGroup>
                  </Box>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', marginRight: '1.5rem' }}  >
                <Button disableElevation
                  variant="outlined"
                  size="large"
                  sx={{ padding: "0 3.5rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '12px', color: '#5D737E', borderColor: '#5D737E', bgcolor: 'white', ':hover': { bgcolor: "#5D737EB5" } }}
                >
                  Cancel
                </Button>
                <Button disableElevation
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ marginLeft: "10px", padding: "0 2rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '12px', color: 'white', bgcolor: '#ED5F1E', ':hover': { bgcolor: "#ED5F1EB5" } }}
                >
                  Create Admin
                </Button>
              </Box>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container >
  )
}

export default AdminForm