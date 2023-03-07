import { useState } from "react"
import { Box, Button, Container, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { ReactComponent as Logo } from '../assets/coclogo.svg';
import { Link, useNavigate } from 'react-router-dom';
import ColumnLabel from "../components/ColumnLabel";

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className="login-form">
      <Box sx={{
        maxWidth: '100%',
        backgroundColor: '#D9D9D9',
        p: '0.5%'
      }}>
        <Box sx={{
          mt: '5%',
          ml: '5%',
          mr: '5%',
          mb: '5%',
          maxWidth: '100%',
          backgroundColor: 'white',
          p: '0.5%'
        }}>

          <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', ml: '2%' }} >Continuum of Care Housing Listings</Typography>
        </Box>
      </Box>

      <label>Username:</label>
      <input
        id="login-username"
        className="form-field"
        type="text"
        placeholder="Username"
        required={true}
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label>Password:</label>
      <input
        id="login-password"
        className="form-field"
        type="password"
        placeholder="Password"
        required={true}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm