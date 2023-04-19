import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import FilterSideBar from '../components/FilterSideBar'
import SelectedFilters from '../components/SelectedFilters'
import '../css/Home.css'
import ConfirmPopUp from '../components/ConfirmPopUp'
import { useLocation, useNavigate } from 'react-router-dom'

function Home() {
  let [Listings, setListings] = useState<any[]>([])
  let [filters, setFilters] = useState([])
  let [address, setAddress] = useState('')
  let [apartment, setApartment] = useState(false)
  let [house, setHouse] = useState(false)
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

  const [confirmDeletePop, setConfirmDeletePop] = useState(false)
  const [confirmCreatePop, setConfirmCreatePop] = useState(false)
  const [confirmEditPop, setConfirmEditPop] = useState(false)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get("action");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listing')
      const json = await response.json()

      if (response.ok) {
        setListings(json)
      }
    }
    fetchListings()

    if (action === "create") {
      setConfirmCreatePop(true)
      navigate("/")
    } else if (action === "edit") {
      setConfirmEditPop(true)
      navigate("/")
    }


  }, [])

  // The function that calls the delete routing function
  const handleDelete = async (id: any) => {
    await fetch('/api/listing/' + id, {
      method: 'DELETE'
    })
    // After we delete we must update the local state
    const newListings = Listings.filter(Listing => Listing._id != id)
    setListings(newListings)
    setConfirmDeletePop(true)
  }

  return (
    <><div>
      <div className='body-box'>
        <div className='side-box'>
          <FilterSideBar
            listings={Listings} setListings={setListings}
            filters={filters} setFilters={setFilters}
            // unitType={unitType} setUnitType={setUnitType}
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
              </SelectedFilters>
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
      <ConfirmPopUp openConfirmPop={confirmDeletePop} setConfirmPop={setConfirmDeletePop} action="Deleted" type="Listing" />
      <ConfirmPopUp openConfirmPop={confirmCreatePop} setConfirmPop={setConfirmCreatePop} action="Created" type="Listing" />
      <ConfirmPopUp openConfirmPop={confirmEditPop} setConfirmPop={setConfirmEditPop} action="Edited" type="Listing" /></>
  );
}


export default Home;

