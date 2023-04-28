import { Box, Button, Container, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const UserForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [voucherType, setVoucherType] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [supervisor, setSupervisor] = useState('')
  const [mInitial, setMInitial] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [prefName, setPrefName] = useState('')
  const [gender, setGender] = useState('')
  const [race, setRace] = useState('')
  const [contactPref, setContactPref] = useState('')
  const [additionalDays, setAdditionalDays] = useState('')
  const [buttonLabel, setButtonLabel] = useState('Create New User')
  const [error, setError] = useState(null)

  const [voucherTypeError, setVoucherTypeError] = useState(false)
  const [supervisorError, setSupervisorError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordlError, setPasswordError] = useState(false)
  const [fNameError, setFNameError] = useState(false)
  const [lNameError, setLNameError] = useState(false)
  const [voucherNames, setVoucherNames] = useState<string[]>([]);


  // Navigation functionality
  const navigate = useNavigate();

  //Location functionality to retrieve the state variable passed 
  const location = useLocation();

  interface Voucher {
    _id: string;
    name: string;
    percentage: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  //Get vouchers from api and assign names to state
  const assignVoucherNames = async () => {
    let vouchersJson = await fetch('/api/vouchers')
    let json: Voucher[] = [] // Add the type annotation here
    if (vouchersJson.ok) {
      json = await vouchersJson.json()
    }
    const voucherNames = json.map(voucher => voucher.name);
    setVoucherNames(voucherNames)
  }

  // //contains that will prepopulate the form if location.state is not null
  useEffect(() => {
    if (location.state != null) { getUserDetails() }
    assignVoucherNames()
  }, [])
  //fetch the data related to id from the database
  const getUserDetails = async () => {
    let result = await fetch('/api/users/' + location.state.id.user_id, {
      method: 'GET'
    })
    let json_object = await result.json()

    setUsername(json_object.username)
    setPassword(json_object.password)
    setVoucherType(json_object.voucherType)
    setFName(json_object.fName)
    setLName(json_object.lName)
    setSupervisor(json_object.supervisor)
    setMInitial(json_object.mInitial)
    setPrefName(json_object.username)
    setGender(json_object.gender)
    setRace(json_object.race)
    setEmail(json_object.email)
    setPhone(json_object.phone)
    setPrefName(json_object.prefName)

    const date = // ensures split doesn't split on a null date
      (json_object.birthDate == null) ? json_object.birthDate : json_object.birthDate.split('T')[0]
    setBirthDate(date)// to make date readable
    setContactPref(json_object.contactPref)
    setAdditionalDays(json_object.additionalDays)
    setButtonLabel('Save Changes')

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (voucherType === '') {
      setVoucherTypeError(true)
    }
    if (supervisor === '') {
      setSupervisorError(true)
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

    const user = {
      username,
      password,
      voucherType,
      fName,
      lName,
      supervisor,
      mInitial,
      birthDate,
      email,
      phone,
      prefName,
      gender,
      race,
      contactPref,
      additionalDays
    }

    const action = (location.state === null) ? "create" : "edit"

    //if location.state is null it creates a POST request to create a listing
    //if location.state is not null it creates a PATCH request to edit the current listing
    const response =
      (location.state === null) ?
        await fetch('/api/users/', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        : await fetch('/api/users/' + location.state.id.user_id, {
          method: 'PATCH',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          }
        })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setUsername('')
      setPassword('')
      setVoucherType('')
      setFName('')
      setLName('')
      setSupervisor('')
      setMInitial('')
      setBirthDate('')
      setEmail('')
      setPhone('')
      setPrefName('')
      setGender('')
      setRace('')
      setContactPref('')
      setAdditionalDays('')
      setError(null)

      setVoucherTypeError(false)
      setSupervisorError(false)
      setUsernameError(false)
      setPasswordError(false)
      setFNameError(false)
      setLNameError(false)

      if (action === "create") {
        navigate("/manage-profiles?action=create&type=user")
      } else if (action === "edit") {
        navigate("/manage-profiles?action=edit&type=user")
      }
    }
  }

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleRaceChange = (event: SelectChangeEvent) => {
    setRace(event.target.value as string);
  };

  const handleAddDaysChange = (e: any) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAdditionalDays(e.target.value);
    }
  };

  const title = (location.state === null) ? "Create a New User" : "Edit User";

  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={2} alignSelf="flex-start">
          <Button disableElevation
            startIcon={<ArrowBackIosNewIcon />}
            variant="outlined"
            size="large"
            onClick={() => navigate("/manage-profiles")}
            sx={{ marginTop: '2rem', padding: "0 1rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '15px', color: '#5D737E', borderWidth: '0.14rem', borderColor: '#5D737E', bgcolor: 'white', ':hover': { bgcolor: "#5D737EB5" } }}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={8}>
          <form noValidate className="user-form" onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', mt: '3%' }} >
                {title}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <FormGroup sx={{ flexGrow: '1' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Voucher Type</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                  </Box>
                  <Select
                    id="voucherType"
                    name="voucherType"
                    className="form-field"
                    onChange={(e) => setVoucherType(e.target.value)}
                    value={voucherType}
                    required
                    variant="outlined"
                    size="small"
                    error={voucherTypeError}
                  >
                    {voucherNames.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Admin Supervisor</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                  </Box>
                  <TextField fullWidth
                    id="supervisor"
                    name="supervisor"
                    className="form-field"
                    onChange={(e) => setSupervisor(e.target.value)}
                    value={supervisor}
                    required
                    variant="outlined"
                    size="small"
                    type="text"
                    error={supervisorError}
                  />
                </FormGroup>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <FormGroup sx={{ flexGrow: '1' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel>Email</FormLabel>
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
                    <FormControlLabel sx={{ marginRight: '4rem' }} value="Phone" label="Phone Number" control={<Radio />} />
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
                      onChange={(e) => setFName(e.target.value)}
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
                      onChange={(e) => setLName(e.target.value)}
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
                    error={passwordlError}
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
                        <FormLabel>Additional Days</FormLabel>
                      </Box>
                      <TextField fullWidth
                        id="additionalDays"
                        name="additionalDays"
                        className="form-field"
                        onChange={handleAddDaysChange}
                        value={additionalDays}
                        variant="outlined"
                        size="small"
                        type="number"
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
                        onChange={(e) => setBirthDate(e.target.value)}
                        value={birthDate}
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
                      <FormLabel>Gender</FormLabel>
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
                      <FormLabel>Race</FormLabel>
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
                  onClick={() => navigate("/manage-profiles")}
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
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container >
  )
}

export default UserForm