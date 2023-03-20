import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import FilterSideBar from '../components/FilterSideBar'
import SelectedFilters from '../components/SelectedFilters'
import '../css/Home.css'

function Home() {
  let [Listings, setListings] = useState<any[]>([])
  let [filters, setFilters] = useState([])
  let [unitType, setUnitType] = useState('')
  let [apartment, setApartment] = useState(false)
  let [house, setHouse] = useState(false)
  let [address, setAddress] = useState('')
  let [condo, setCondo] = useState(false)
  let [single, setSingle] = useState(false)
  let [numBath, setNumBath] = useState('')
  let [numBed, setNumBed] = useState('')
  let [utilities, setUtilities] = useState(false)
  let [furnished, setFurnished] = useState(false)
  let [pets, setPets] = useState(false)
  let [disTransportation, setDisTransportation] = useState('')
  let [minPrice, setMinPrice] = useState('')
  let [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listing')
      console.log(response)
      const json = await response.json()

      if (response.ok) {
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
          <FilterSideBar
            listings={Listings} setListings={setListings}
            filters={filters} setFilters={setFilters}
            unitType={unitType} setUnitType={setUnitType}
            apartment={apartment} setApartment={setApartment}
            house={house} setHouse={setHouse}
            address={address} setAddress={setAddress}
            condo={condo} setCondo={setCondo}
            single={single} setSingle={setSingle}
            numBath={numBath} setNumBath={setNumBath}
            numBed={numBed} setNumBed={setNumBed}
            utilities={utilities} setUtilities={setUtilities}
            furnished={furnished} setFurnished={setFurnished}
            pets={pets} setPets={setPets}
            disTransportation={disTransportation} setDisTransportation={setDisTransportation}
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}>
          </FilterSideBar>
        </div>
        <div className='content-box'>
          <Container>
            <div className='selected-filters'>
              <SelectedFilters
                listings={Listings} setListings={setListings}
                filters={filters} setFilters={setFilters}
                unitType={unitType} setUnitType={setUnitType}
                apartment={apartment} setApartment={setApartment}
                house={house} setHouse={setHouse}
                address={address} setAddress={setAddress}
                condo={condo} setCondo={setCondo}
                single={single} setSingle={setSingle}
                numBath={numBath} setNumBath={setNumBath}
                numBed={numBed} setNumBed={setNumBed}
                utilities={utilities} setUtilities={setUtilities}
                furnished={furnished} setFurnished={setFurnished}
                pets={pets} setPets={setPets}
                disTransportation={disTransportation} setDisTransportation={setDisTransportation}
                minPrice={minPrice} setMinPrice={setMinPrice}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}>
              </SelectedFilters >
            </div>
            <div className='listing-cards'>
              <Grid container spacing={2}>
                {Listings.map((Listing) => (
                  <Grid item key={Listing._id}>
                    <ListingDetails Listing={Listing} handleDelete={handleDelete} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}


export default Home;

