import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import ListingForm from "../forms/ListingForm"

const Home = () => {
  const [Listings, setListings] = useState<any[]>([])

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listing')
      const json = await response.json()

      if (response.ok) {
        setListings(json)
      }
    }

    fetchListings()
  }, [])

  //the function that calls the delete routing function
  const handleDelete = async (id: any) => {
    await fetch('/api/listing/' + id, {
      method: 'DELETE' 
    })
    //after we delete we must update the local state
    const newListings = Listings.filter(Listing => Listing.id != id)
    setListings(newListings)
  }
   
  return (
    <div className="home">
      <div className="listings">
        {Listings && Listings.map((Listing) => (
          <ListingDetails key={Listing._id} Listing={Listing} handleDelete = {handleDelete}/>
        ))}
        {/* <ListingForm /> */}
      </div>
    </div>
  )
}

export default Home