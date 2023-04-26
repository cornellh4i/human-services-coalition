import { Box, Button, Container, FormGroup, FormLabel, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import React from "react";

const FmrForm = () => {
  const [studio, setStudio] = useState('')
  const [oneBed, setOneBed] = useState('')
  const [twoBed, setTwoBed] = useState('')
  const [threeBed, setThreeBed] = useState('')
  const [fourBed, setFourBed] = useState('')
  const [fiveBed, setFiveBed] = useState('')
  const [sixBed, setSixBed] = useState('')
  const [error, setError] = useState(null)
  const [buttonLabel, setButtonLabel] = useState('Add FMR Prices')

  // Navigation functionality
  const navigate = useNavigate();

  useEffect(() => { getFMRdetails() }, [])

  const getFMRdetails = async () => {
    let exists_response = await fetch('/api/fmr')
    const res_json = await exists_response.json()
    if (res_json.length > 0) {//if there exists an fmr price
      setStudio(res_json[0].studio)
      setOneBed(res_json[0].oneBed)
      setTwoBed(res_json[0].twoBed)
      setThreeBed(res_json[0].threeBed)
      setFourBed(res_json[0].fourBed)
      setFiveBed(res_json[0].fiveBed)
      setSixBed(res_json[0].sixBed)
      setButtonLabel("Update FMR Prices")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const FMRprices = {
      studio,
      oneBed,
      twoBed,
      threeBed,
      fourBed,
      fiveBed,
      sixBed
    }

    const exists_response = await fetch('/api/fmr/')
    const res_json = await exists_response.json()

    const response =
      (res_json.length === 0) ?
        await fetch('/api/fmr/', {
          method: 'POST',
          body: JSON.stringify(FMRprices),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        :
        await fetch(`/api/fmr/${res_json[0]._id}`, {
          method: 'PATCH',
          body: JSON.stringify(FMRprices),
          headers: {
            'Content-Type': 'application/json',
          }
        })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setStudio('')
      setOneBed('')
      setTwoBed('')
      setThreeBed('')
      setFourBed('')
      setFiveBed('')
      setSixBed('')

      setError(null)

      navigate("/?action=set&type=fmr")

    }
  }

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
          <form className="listing-form" onSubmit={handleSubmit}>

            <Grid item xs={12}>
              <Typography variant='h3' sx={{ fontSize: '1.3rem', fontWeight: 'bold', mt: '3%' }} >
                Update FMR Prices
              </Typography>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Studio:</FormLabel>

                </Box>
              </FormGroup>
            </Box>

            <TextField fullWidth
              id="fmr-studio"
              name="studioFMR"
              className="form-field"
              placeholder="Studio FMR Price"
              variant="outlined"
              size="small"
              type="number"
              required={true}
              onChange={(e) => setStudio(e.target.value)}
              value={studio}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>One Bed:</FormLabel>

                </Box>
              </FormGroup>
            </Box>
            <TextField fullWidth
              id="fmr-oneBed"
              name="oneBedFMR"
              className="form-field"
              placeholder="One Bed FMR Price"
              variant="outlined"
              size="small"
              type="number"
              required={true}
              onChange={(e) => setOneBed(e.target.value)}
              value={oneBed}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Two Bed:</FormLabel>

                </Box>
              </FormGroup>
            </Box>
            <TextField fullWidth
              id="fmr-twoBed"
              name="twoBedFMR"
              className="form-field"
              placeholder="Two Bed FMR Price"
              variant="outlined"
              size="small"
              type="number"
              required={true}
              onChange={(e) => setTwoBed(e.target.value)}
              value={twoBed}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Three Bed:</FormLabel>

                </Box>
              </FormGroup>
            </Box>
            <TextField fullWidth
              id="fmr-threeBed"
              name="threeBedFMR"
              className="form-field"
              placeholder="Three Bed FMR Price"
              variant="outlined"
              size="small"
              type="number"
              required={true}
              onChange={(e) => setThreeBed(e.target.value)}
              value={threeBed}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Four Bed:</FormLabel>

                </Box>
              </FormGroup>
            </Box>
            <TextField fullWidth
              id="fmr-fourBed"
              name="fourBedFMR"
              className="form-field"
              placeholder="Four Bed FMR price"
              variant="outlined"
              size="small"
              type="number"
              required={true}
              onChange={(e) => setFourBed(e.target.value)}
              value={fourBed}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Five Bed:</FormLabel>

                </Box>
              </FormGroup>
            </Box>
            <TextField fullWidth
              id="fmr-fiveBed"
              name="fiveBedFMR"
              className="form-field"
              placeholder="Five Bed FMR Price"
              variant="outlined"
              size="small"
              type="number"
              required={true}
              onChange={(e) => setFiveBed(e.target.value)}
              value={fiveBed}
            />


            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              <FormGroup sx={{ flexGrow: '1', marginRight: '1.5rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
                  <FormLabel>Six Bed:</FormLabel>
                </Box>
              </FormGroup>
            </Box>
            <TextField fullWidth
              id="fmr-sixBed"
              name="sixBedFMR"
              className="form-field"
              placeholder="Six Bed FMR price"
              variant="outlined"
              size="small"
              type="number"
              required={true}
              onChange={(e) => setSixBed(e.target.value)}
              value={sixBed}
            />


            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', marginRight: '1.5rem' }}  >
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



            {error && <div className="fmr-error">{error}</div>}
          </form>
        </Grid>
      </Grid>
    </Container >
  )

}
export default FmrForm