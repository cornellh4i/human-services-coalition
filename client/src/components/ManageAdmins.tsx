import { Box, Container, Divider, Grid, InputAdornment, FormControl, TextField, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import AdminDisplayCard from './AdminDisplayCard'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import ColumnLabel from '../components/ColumnLabel'
import { useState, useEffect } from 'react'


const ManageAdmins = () => {
  const [Admins, setAdmins] = useState<any[]>([])
  const [sortOrder, setSortOrder] = useState(0)
  const [sortName, setSortName] = useState("None")

  useEffect(() => {
    const fetchAdmins = async () => {

      const response = await fetch('/api/admins/')
      const json = await response.json()

      if (response.ok) {
        setAdmins(json)
      }
    }
    fetchAdmins()
  }, [])

  async function handleToggle(name: string) {
    let localSortOrder = 0
    let localSortName = "None"
    if (sortName == name) {
      setSortOrder((sortOrder + 1) % 3)
      localSortOrder = (sortOrder + 1) % 3
      localSortName = name
    }
    else {
      localSortOrder = 1
      localSortName = name
      setSortOrder(1)
      setSortName(name)
    }
    let sortOrderQuery = 0
    if (localSortOrder == 1) {
      sortOrderQuery = 1
    }
    else if (localSortOrder == 2) {
      sortOrderQuery = -1
    }
    console.log("name: " + name)
    console.log("sort name: " + sortName)
    console.log(sortOrder);
    console.log(sortOrderQuery);
    const fetchAdmins = async () => {
      const response = await fetch('/api/admins/' + sortOrderQuery + '/' + localSortName)
      if (localSortOrder == 0) {
        const response = await fetch('/api/admins/')
      }
      const json = await response.json()
      if (response.ok) {
        setAdmins(json)
      }

    }
    fetchAdmins()
    console.log("Toggled!");

  }
  const [affiliation, setAffiliation] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAffiliation(event.target.value as string);
  };

  return (
    <Box sx={{
      mt: '1%',
      maxWidth: '100%',
      backgroundColor: '#D9D9D9',
      p: '0.5%'
    }}>

      <Container maxWidth={false} sx={{ mt: '10px', maxWidth: '100%', borderRadius: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#D9D9D9', }}>
        <Grid container item xs={8}>
          <TextField
            sx={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 1 }}
            placeholder="Search Current View"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>,
            }}
          />
        </Grid>

        <Grid container item xs={'auto'}>
          <Box sx={{ display: "flex", justifyContent: "right", alignItems: 'center', marginLeft: '5rem' }}>
            <Typography sx={{ marginRight: '1rem' }}>Affiliation</Typography>
            <Box sx={{ flex: 1 }}>
              <FormControl
                sx={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                <Select
                  value={affiliation}
                  onChange={handleChange}
                  displayEmpty>
                  <MenuItem value="">All Affiliations</MenuItem>
                  <MenuItem value={10}>HSC</MenuItem>
                  <MenuItem value={20}>Non-HSC</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Container>

      <Container maxWidth={false} sx={{ borderRadius: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'left', backgroundColor: '#D9D9D9' }}>

        <Grid container spacing={"10%"}>
          <Grid item sx={{ ml: "1%" }}>
            <ColumnLabel label="First Name"
              onClick={() => handleToggle("fName")}></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "0%" }}>
            <ColumnLabel label="Last Name" onClick={() => handleToggle("lName")}></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "0%" }}>
            <ColumnLabel label="Affiliation" onClick={() => handleToggle("affiliation")}></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "3%" }}>
            <ColumnLabel label="Created" onClick={() => handleToggle("createdAt")}></ColumnLabel>
          </Grid>
        </Grid>

      </Container>

      <div className="admins" >
        {Admins && Admins.map((Admin) => (
          <div>
            <AdminDisplayCard
              key={Admin._id}
              fname={Admin.fName}
              lname={Admin.lName}
              affiliation={Admin.affiliation}
              date={Admin.createdAt}
            />
            <Divider variant="middle" sx={{ marginTop: '0.5rem', bgcolor: 'black' }} />
          </div>
        ))}
      </div>
    </Box >
  )
}

export default ManageAdmins