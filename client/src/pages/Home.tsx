import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import FilterSideBar from '../components/FilterSideBar'
import SelectedFilters from '../components/SelectedFilters'
import '../css/Home.css'

const Home = () => {
  const [Listings, setListings] = useState<any[]>([])

  // Hard coded filter list for testings
  
  // const [selected, setSelected] = useState(['Apartment', '3 beds', 'House']);

  // function updateSelected(name: string){
  //   let index = selected.indexOf(name)
  //   if (index>-1) {
  //     selected.splice(index, 1)
  //   }
  //   else { 
  //     selected.push(name)
  //   }
  // }

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listing')
      console.log(response)
      const json = await response.json()

      if (response.ok){
        setListings(json)
      }
    }

    fetchListings()
  }, [])

  //the function that calls the delete routing function
  const handleDelete = async (id: any) => {
    console.log(id)
    await fetch('/api/listing/' + id, {
      method: 'DELETE' 
    })
    // after we delete we must update the local state
    const newListings = Listings.filter(Listing => Listing._id != id)
    setListings(newListings)
  }
   
  return (
    <div>
      <div className='body-box'>
        <div className='side-box'>
          <FilterSideBar />
        </div>
        <div className='content-box'>
          <Container>
            <div className='selected-filters'>
              {/* < SelectedFilters filters={selected} > </SelectedFilters > */}
            </div>
            <div className='listing-cards'>
              <Grid container spacing = {2}>
                {Listings.map((Listing) => (             
                    <Grid item key={Listing._id}>
                      <ListingDetails Listing={Listing} handleDelete = {handleDelete}/>
                    </Grid>
                ))}
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default Home

