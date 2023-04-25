import { Box, Button, Container, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";


const VoucherForm = () => {

  const [name, setName] = useState('')
  const [percentage, setPercentage] = useState('')
  const [error, setError] = useState(null)

  const [nameError, setNameError] = useState(false)
  const [percentageError, setPercentageError] = useState(false)

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state != null) { getListingDetails() }
  }, [])
  //fetch the data related to id from the database
  const getListingDetails = async () => {
    let result = await fetch('/api/vouchers/' + location.state.id.voucherid, {
      method: 'GET'
    })
    let json_object = await result.json()
    setName(json_object.name)
    setPercentage(json_object.percentage)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name === '') {
      setNameError(true)
    }
    if (percentage === '') {
      setPercentageError(true)
    }

    const voucher = {
      name,
      percentage
    }

    const response =
      await fetch('/api/vouchers/', {
        method: 'POST',
        body: JSON.stringify(voucher),
        headers: {
          'Content-Type': 'application/json'
        }
      })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setName('')
      setPercentage('')
      setError(null)

      setNameError(false)
      setPercentageError(false)

    }
  }







  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={12}>
          <form noValidate className="voucher-form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Name</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField fullWidth
                  id="name"
                  name="name"
                  className="form-field"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  variant="outlined"
                  size="small"
                  type="text"
                  error={nameError}
                />
              </FormGroup>

              <FormGroup sx={{ flexGrow: '1', marginX: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Percetage</FormLabel>
                  <Typography sx={{ marginLeft: '0.3rem', color: '#E50808' }}>*</Typography>
                </Box>
                <TextField fullWidth
                  id="phone"
                  name="phone"
                  className="form-field"
                  onChange={(e) => setPercentage(e.target.value)}
                  value={percentage}
                  variant="outlined"
                  size="small"
                  type="number"
                  error={percentageError}
                />
              </FormGroup>

              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                <Button disableElevation
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ marginLeft: "10px", padding: "0 2rem", fontSize: '1.2rem', fontWeight: 'bold', textTransform: "unset", borderRadius: '12px', color: 'white', bgcolor: '#ED5F1E', ':hover': { bgcolor: "#ED5F1EB5" } }}
                >
                  Add Voucher
                </Button>
              </Box>

            </Box>
          </form>
        </Grid>
      </Grid>
    </Container >
  )
}

export default VoucherForm