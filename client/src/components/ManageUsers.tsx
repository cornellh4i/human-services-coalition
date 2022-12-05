import { Box, Container, Divider, Grid, InputAdornment, FormControl, TextField, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import UserDisplayCard from './UserDisplayCard'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import ColumnLabel from '../components/ColumnLabel'
import { useState, useEffect } from 'react'

const ManageUsers = () => {
  const [Users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const json = await response.json()

      if (response.ok) {
        setUsers(json)
      }
    }
    fetchUsers()
  }, [])

  const [voucher, setVoucher] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setVoucher(event.target.value as string);
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

        <Grid container item xs={4}>
          <Box sx={{ display: "flex", justifyContent: "right", alignItems: 'center', marginLeft: '5rem' }}>
            <Typography sx={{ marginRight: '1rem' }}>Voucher Type</Typography>
            <Box sx={{ minWidth: 300 }}>
              <FormControl fullWidth size="small"
                sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                <Select
                  value={voucher}
                  onChange={handleChange}
                  displayEmpty>
                  <MenuItem value="">All Vouchers</MenuItem>
                  <MenuItem value={10}>Voucher I</MenuItem>
                  <MenuItem value={20}>Voucher II</MenuItem>
                  <MenuItem value={30}>Voucher III</MenuItem>
                  <MenuItem value={40}>Voucher IV</MenuItem>
                  <MenuItem value={50}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Container>

      <Container sx={{ mt: '10px', ml: '2.5%', maxWidth: '100%', borderRadius: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'left', backgroundColor: '#D9D9D9' }}>
        <Grid container item xs={10} md={10}>
          <Grid container columnSpacing={20}>
            <Grid item>
              <ColumnLabel label="First Name" ></ColumnLabel>
            </Grid>
            <Grid item sx={{ ml: "-0.6%" }} >
              <ColumnLabel label="Last Name"></ColumnLabel>
            </Grid>
            <Grid item sx={{ ml: "2.1%" }}>
              <ColumnLabel label="Voucher Type"></ColumnLabel>
            </Grid>
            <Grid item sx={{ ml: "-2.4%" }}>
              <ColumnLabel label="Created"></ColumnLabel>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <div className="users" >
        {Users && Users.map((User) => (
          <div>
            <UserDisplayCard
              key={User._id}
              fname={User.fName}
              lname={User.lName}
              voucher={User.voucherType}
              date={User.createdAt}
            />
            <Divider variant="middle" sx={{ marginTop: '0.5rem', bgcolor: 'black' }} />
          </div>
        ))}
      </div>
    </Box>
  )
}

export default ManageUsers