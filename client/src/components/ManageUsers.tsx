import { Box, Container, Divider, Grid, InputAdornment, FormControl, TextField, Select, MenuItem, Typography } from '@mui/material'
import UserDisplayCard from './UserDisplayCard'
import SearchIcon from '@mui/icons-material/Search';
import ColumnLabel from '../components/ColumnLabel'
import { useState, useEffect } from 'react'


const ManageUsers = () => {
  const [Users, setUsers] = useState<any[]>([])
  let [sortOrder, setSortOrder] = useState(-1)
  let [sortName, setSortName] = useState('createdAt')
  let [search, setSearch] = useState('')
  let [voucherType, setVoucherType] = useState('')

  function handleFilterChange(setFunction: Function, event: { target: { value: any } }) {
    setFunction(event.target.value)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users/')
      const json = await response.json()

      if (response.ok) {
        setUsers(json)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      let params = {
        search: search,
        sortName: sortName,
        sortOrder: sortOrder.toString(),
        voucherType: voucherType
      }
      let searchParams = new URLSearchParams(params)

      const response = await fetch('/api/users/sort?' + searchParams)
      const json = await response.json()
      if (response.ok) {
        setUsers(json)
      }
    }
    fetchUsers()
  }, [search, voucherType, sortOrder, sortName])


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
    await fetch('/api/users/' + id, {
      method: 'DELETE'
    })
    // After we delete we must update the local state
    const newUsers = Users.filter(User => User._id != id)
    setUsers(newUsers)
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
            <Typography sx={{ marginRight: '1rem' }}>Voucher Type</Typography>
            <Box sx={{ flex: 1 }}>
              <FormControl sx={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                <Select
                  value={voucherType}
                  onChange={(e) => handleFilterChange(setVoucherType, e)}
                  displayEmpty>
                  <MenuItem value="All">All Vouchers</MenuItem>
                  <MenuItem value="Voucher I">Voucher I</MenuItem>
                  <MenuItem value="Voucher II">Voucher II</MenuItem>
                  <MenuItem value="Voucher III">Voucher III</MenuItem>
                  <MenuItem value="Voucher IV">Voucher IV</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
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
            <ColumnLabel label="Last Name" ascending={sortName == 'lName' && sortOrder == -1} onClick={() => handleSortToggle("lName")}></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "0%" }}>
            <ColumnLabel label="Voucher" ascending={sortName == 'voucherType' && sortOrder == -1} onClick={() => handleSortToggle("voucherType")}></ColumnLabel>
          </Grid>
          <Grid item sx={{ ml: "3%" }}>
            <ColumnLabel label="Created" ascending={sortName == 'createdAt' && sortOrder == -1} onClick={() => handleSortToggle("createdAt")}></ColumnLabel>
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