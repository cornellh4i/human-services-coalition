import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import ListingForm from "../forms/ListingForm"
import ListingInformation from './ListingInformation'

const Home = () => {
  const [Listings, setListings] = useState<any[]>([])

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
    <div className="home">
      <div className="listings">
        <Container>
          <Grid container spacing = {2}>
            {Listings.map((Listing) => (             
                <Grid item key={Listing._id}>
                  <ListingDetails Listing={Listing} handleDelete = {handleDelete}/>
                </Grid>
            ))}
          </Grid>
        </Container>
        {/* <ListingForm /> */}
      </div>
    </div>
  )
}

export default Home

