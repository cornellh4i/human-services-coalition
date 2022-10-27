import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'

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

  return (
    <div className="home">
      <div className="listings">
        {Listings && Listings.map((Listing) => (
          <ListingDetails key={Listing._id} Listing={Listing} />
        ))}
      </div>
    </div>
  )
}

export default Home