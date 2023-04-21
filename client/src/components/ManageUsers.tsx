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

    const accountTime = async () => {
      for (let i = 0; i < Users.length; i++) {
        const date = new Date();
        const created = new Date(Users[i].createdAt);
        let addDays = Users[i].additionalDays;
        addDays = addDays * 86400000;
        let timeDiff = date.getTime() - created.getTime();
        if (timeDiff > 10368000000 + addDays) {
          handleDelete(Users[i]._id);
        }
      }
    }
    accountTime()
  }, [])

  // The function that calls the delete routing function
  const handleDelete = async (id: any) => {
    await fetch('/api/users/' + id, {
      method: 'DELETE'
    })
    // After we delete we must update the local state
    const newUsers = Users.filter(User => User._id != id)
    setUsers(newUsers)
  }

  const daysRemaining = (user: any): number => {

    const date = new Date();
    const created = new Date(user.createdAt);
    let addDays = user.additionalDays;
    let totalDays = 120 + addDays;
    addDays = addDays * 86400000;
    let timeDiff = date.getTime() - created.getTime();
    if (timeDiff <= 10368000000 + addDays) {
      return Math.floor((totalDays - (timeDiff / 86400000) + 1));
    }
    return 0;
  };


  const [voucher, setVoucher] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setVoucher(event.target.value as string);
  };

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
          />
        </Grid>

        <Grid container item xs={'auto'}>
          <Box sx={{ display: "flex", justifyContent: "right", alignItems: 'center', marginLeft: '5rem' }}>
            <Typography sx={{ marginRight: '1rem' }}>Voucher Type</Typography>
            <Box sx={{ flex: 1 }}>
              <FormControl sx={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 1 }}>
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


      <Container maxWidth={false} sx={{ borderRadius: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'left' }}>

        <Grid container spacing={"10%"}>
          <Grid item sx={{ ml: "1%" }}>
            <ColumnLabel label="First Name" ></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "0%" }}>
            <ColumnLabel label="Last Name"></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "2%" }}>
            <ColumnLabel label="Voucher Type"></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "-1%" }}>
            <ColumnLabel label="Created"></ColumnLabel>
          </Grid>
        </Grid>

      </Container>

      <div className="users" >
        {Users && Users.map((User) => (
          <div>
            <UserDisplayCard
              key={User._id}
              user_id={User._id}
              fname={User.fName}
              lname={User.lName}
              mInitial={User.mInitial}
              username={User.username}
              password={User.password}
              voucher={User.voucherType}
              supervisor={User.supervisor}
              birthDate={User.birthDate}
              email={User.email}
              phone={User.phone}
              prefName={User.prefName}
              gender={User.gender}
              race={User.race}
              contactPref={User.contactPref}
              date={User.createdAt}
              daysLeft={daysRemaining(User)}
              handleDelete={handleDelete}
            />
            <Divider variant="middle" sx={{ marginTop: '0.5rem', bgcolor: 'black' }} />
          </div>
        ))}
      </div>
    </Box>
  )
}

export default ManageUsers