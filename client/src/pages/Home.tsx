import { useEffect, useState } from 'react'
import ListingDetails from '../components/ListingDetails'
import ListingForm from "../forms/ListingForm"
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { borders } from '@mui/system'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles'
import { Typography } from '@mui/material'
import FilterSideBar from '../components/FilterSideBar'
import './Home.css'
import Card from '@mui/material/Card';

let theme = createTheme();
theme = responsiveFontSizes(theme);


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
    <div>
      <div className='body-box'>
        <div className='side-box'>
          <FilterSideBar />
        </div>
        <div className='content-box'>
          <div className='listing-cards'>
            <Card style={{backgroundColor: "lightgrey"}}className='card'></Card>
            <Card style={{backgroundColor: "lightgrey"}} className='card'></Card>
            <Card style={{backgroundColor: "lightgrey"}} className='card'></Card>
            <Card style={{backgroundColor: "lightgrey"}} className='card'></Card>
            <Card style={{backgroundColor: "lightgrey"}} className='card'></Card>
            <Card style={{backgroundColor: "lightgrey"}} className='card'></Card>
            {Listings && Listings.map((Listing) => (
            <ListingDetails key={Listing._id} Listing={Listing} />
            ))}
            <ListingForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home