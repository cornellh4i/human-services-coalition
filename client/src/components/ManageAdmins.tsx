import { Box, Container, Divider, Grid, InputAdornment, FormControl, TextField, Select, MenuItem, Typography } from '@mui/material'
import AdminDisplayCard from './AdminDisplayCard'
import SearchIcon from '@mui/icons-material/Search';
import ColumnLabel from '../components/ColumnLabel'
import { useState, useEffect } from 'react'


const ManageAdmins = () => {
  const [Admins, setAdmins] = useState<any[]>([])
  let [sortOrder, setSortOrder] = useState(-1)
  let [sortName, setSortName] = useState('createdAt')
  let [search, setSearch] = useState('')
  let [affiliation, setAffiliation] = useState('');

  function handleFilterChange(setFunction: Function, event: { target: { value: any } }) {
    setFunction(event.target.value)
  }

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

  useEffect(() => {
    const fetchAdmins = async () => {
      let params = {
        search: search,
        sortName: sortName,
        sortOrder: sortOrder.toString(),
        affiliation: affiliation
      }
      let searchParams = new URLSearchParams(params)

      const response = await fetch('/api/admins/sort?' + searchParams)
      const json = await response.json()
      if (response.ok) {
        setAdmins(json)
      }
    }
    fetchAdmins()
  }, [search, affiliation, sortOrder, sortName])


  async function handleSortToggle(name: string) {
    if (sortName == name) {
      setSortOrder(sortOrder * -1)
    }
    else {
      setSortOrder(-1)
      setSortName(name)
    }
  }

  // The function that calls the delete routing function
  const handleDelete = async (id: any) => {
    await fetch('/api/admins/' + id, {
      method: 'DELETE'
    })
    // After we delete we must update the local state
    const newAdmins = Admins.filter(Admin => Admin._id !== id)
    setAdmins(newAdmins)
  }

  return (
    <Box sx={{
      mt: '1%',
      maxWidth: '100%',
      p: '0.5%'
    }}>

      <Container maxWidth={false} sx={{ mt: '10px', maxWidth: '100%', borderRadius: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            onChange={(e) => handleFilterChange(setSearch, e)}
          />
        </Grid>

        <Grid container item xs={'auto'}>
          <Box sx={{ display: "flex", justifyContent: "right", alignItems: 'center', marginLeft: '5rem' }}>
            <Typography sx={{ marginRight: '1rem' }}>Affiliation</Typography>
            <Box sx={{ flex: 1 }}>
              <FormControl
                sx={{ flex: 1, borderRadius: 1 }}>
                <Select
                  value={affiliation}
                  onChange={(e) => handleFilterChange(setAffiliation, e)}
                  displayEmpty>
                  <MenuItem value="All">All Affiliations</MenuItem>
                  <MenuItem value="HSC">HSC</MenuItem>
                  <MenuItem value="Non-HSC">Non-HSC</MenuItem>
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
              ascending={sortName == 'fName' && sortOrder == -1} onClick={() => handleSortToggle("fName")}></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "0%" }}>
            <ColumnLabel ascending={sortName == 'lName' && sortOrder == -1} label="Last Name" onClick={() => handleSortToggle("lName")}></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "0%" }}>
            <ColumnLabel ascending={sortName == 'affiliation' && sortOrder == -1} label="Affiliation" onClick={() => handleSortToggle("affiliation")}></ColumnLabel>
          </Grid >
          <Grid item sx={{ ml: "3%" }}>
            <ColumnLabel ascending={sortName == 'createdAt' && sortOrder == -1} label="Created" onClick={() => handleSortToggle("createdAt")}></ColumnLabel>
          </Grid>
        </Grid >

      </Container >

      <div className="admins" >
        {Admins && Admins.map((Admin) => (
          <div>
            <AdminDisplayCard
              key={Admin._id}
              adminid={Admin._id}
              fname={Admin.fName}
              lname={Admin.lName}
              mInitial={Admin.mInitial}
              prefName={Admin.prefName}
              affiliation={Admin.affiliation}
              username={Admin.username}
              password={Admin.password}
              gender={Admin.gender}
              race={Admin.race}
              email={Admin.email}
              phone={Admin.phone}
              birthdate={Admin.birthdate}
              contactPref={Admin.contactPref}
              date={Admin.createdAt}
              handleDelete={handleDelete}
            />
            <Divider variant="middle" sx={{ marginTop: '0.5rem', bgcolor: 'black' }} />
          </div>
        ))}
      </div>
    </Box >
  )
}

export default ManageAdmins