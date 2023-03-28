import { useState } from "react"
import { Box, Button, Container, FormGroup, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { ReactComponent as Logo } from '../assets/coclogo.svg';
import PropTypes from 'prop-types';

// async function loginUser(credentials: any) {
//   const response = await fetch('/api/login/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//   const json = await response.json()
//   console.log(json)


//   if (response.ok) {
//     return json
//   }
// }

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("hi");
    // const token = await loginUser({
    //   username,
    //   password
    // });
    // setToken(token);
  }

  return (
    <Box sx={{
      display: { xs: 'flex', md: 'flex' },
      maxWidth: '100%',
      maxHeight: '100%',
      backgroundColor: '#5D737E',
      p: '0.5%'
    }}>
      <Box sx={{
        flexGrow: 1,
        display: { xs: 'flex', md: 'flex' },
        mt: '9rem',
        mb: '9em',
        ml: { xs: '1.5rem', md: '12rem' },
        mr: { xs: '2rem', md: '12rem' },
        alignItems: 'center',
        maxWidth: '90%',
        maxHeight: '70%',
        backgroundColor: 'white',
        p: '0.5%'
      }}>

        <Container maxWidth={false}>
          <form noValidate className="login-form" onSubmit={handleSubmit}>
            {/* Expanded View */}
            <Box sx={{ p: 0, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ width: 300, p: 0, border: 0, justifyContent: "flex-start", ml: '5%' }}>
                <Logo height={75} href="" />
              </Button>
            </Box>
            <Box sx={{ p: 0, flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Grid item xs={12} md={4}>
                <Button
                  sx={{ width: 300, p: 0, border: 0, justifyContent: "flex-start", ml: '5%' }}>
                  <Logo height={75} width={'90%'} href="" />
                </Button>
              </Grid>
            </Box>

            <Grid item xs={12} md={8}>

              <Grid item xs={12} md={8}>

                <Grid item>
                  <Typography variant='h6' sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 'bold', textAlign: 'center' }} >Continuum of Care Housing Listings</Typography>
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', marginTop: '2%', maxWidth: '40%', marginLeft: '29%', marginBottom: '3%' }}>
                <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel sx={{ color: 'black', fontSize: '1.5rem', mb: '3%' }}>Username</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808', mb: '3%' }}>*</Typography>
                  </Box>
                  <TextField fullWidth
                    id="login-username"
                    className="form-field"
                    type="text"
                    placeholder="Username"
                    required={true}
                    name="username"
                    size="small"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </FormGroup>

              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', marginTop: '1%', maxWidth: '40%', marginLeft: '29%', marginBottom: '3%' }}>
                <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                    <FormLabel sx={{ color: 'black', fontSize: '1.5rem', mb: '3%' }}>Password</FormLabel>
                    <Typography sx={{ marginLeft: '0.3rem', color: '#E50808', mb: '3%' }}>*</Typography>
                  </Box>
                  <TextField fullWidth
                    id="login-password"
                    className="form-field"
                    type="password"
                    placeholder="Password"
                    required={true}
                    name="password"
                    size="small"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </FormGroup>
              </Box>
            </Grid>


            <Grid item xs={12} md={4}>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', marginRight: '1.5rem', mb: '2%' }}  >
                <Button disableElevation
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ marginLeft: "10px", padding: "0 5rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '12px', color: 'white', bgcolor: '#ED5F1E', ':hover': { bgcolor: "#ED5F1EB5" } }}
                >
                  Log In
                </Button>
              </Box>

            </Grid>
          </form>
        </Container>
      </Box >
    </Box >
  )
}

// LoginForm.propTypes = {
//   setToken: PropTypes.func.isRequired
// };

