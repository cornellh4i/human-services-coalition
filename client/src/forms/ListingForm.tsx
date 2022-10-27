import React, { SyntheticEvent, useState } from "react"

const ListingForm = () => {
  const [webScraped, setWebScraped] = useState(false)
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [pictures, setPictures] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [unitType, setUnitType] = useState('')
  const [numBath, setNumBath] = useState('')
  const [schoolDistrict, setSchoolDistrict] = useState('')
  const [pets, setPets] = useState('')
  const [utilities, setUtilities] = useState('')
  const [furnished, setFurnished] = useState('')
  const [distTransportation, setDistTransportation] = useState('')
  const [landlord, setLandlord] = useState('')
  const [landlordEmail, setLandlordEmail] = useState('')
  const [landlordPhone, setLandlordPhone] = useState('')
  const [linkOrig, setLinkOrig] = useState('')
  const [linkApp, setLinkApp] = useState('')
  const [dateAvailable, setDateAvailable] = useState('')
  const [error, setError] = useState(null)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const listing = {
      webScraped,
      streetAddress,
      city,
      state,
      country,
      zipCode,
      pictures,
      price,
      size,
      unitType,
      numBath,
      schoolDistrict,
      pets,
      utilities,
      furnished,
      distTransportation,
      landlord,
      landlordEmail,
      landlordPhone,
      linkOrig,
      linkApp,
      dateAvailable
    }

    const response = await fetch('/api/listing/', {
      method: 'POST',
      body: JSON.stringify(listing),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setWebScraped(false)
      setStreetAddress('')
      setCity('')
      setState('')
      setCountry('')
      setZipCode('')
      setPictures('')
      setPrice('')
      setSize('')
      setUnitType('')
      setNumBath('')
      setSchoolDistrict('')
      setPets('')
      setUtilities('')
      setFurnished('')
      setDistTransportation('')
      setLandlord('')
      setLandlordEmail('')
      setLandlordPhone('')
      setLinkOrig('')
      setLinkApp('')
      setDateAvailable('')
    
      setError(null)
      console.log('New Listing Added', json)
    }
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <h3>Add a New Listing</h3>

      <label>Street Address:</label>
      <input
        id="listing-streetAddress"
        className="form-field"
        type="text"
        placeholder="Street Address"
        required={true}
        name="streetAddress"
        onChange={(e) => setStreetAddress(e.target.value)}
        value={streetAddress}
      />

      <label>City:</label>
      <input
        id="listing-city"
        className="form-field"
        type="text"
        placeholder="City"
        required={true}
        name="city"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />

      <label>State:</label>
      <input
        id="listing-state"
        className="form-field"
        type="text"
        placeholder="State"
        required={true}
        name="state"
        onChange={(e) => setState(e.target.value)}
        value={state}
      />

      <label>Country:</label>
      <input
        id="listing-country"
        className="form-field"
        type="text"
        placeholder="Country"
        required={true}
        name="country"
        onChange={(e) => setCountry(e.target.value)}
        value={country}
      />

      <label>Zip:</label>
      <input
        id="listing-zipCode"
        className="form-field"
        type="text"
        placeholder="Zip Code"
        required={true}
        name="zipCode"
        onChange={(e) => setZipCode(e.target.value)}
        value={zipCode}
      />

      <label>Pictures:</label>
      <input
        id="listing-pictures"
        className="form-field"
        type="file"
        accept="image/*"
        multiple={true}
        placeholder="Upload Pictures"
        required={true}
        name="pictures"
        onChange={(e) => setPictures(e.target.value)}
        value={pictures}
      />

      <label>Price:</label>
      <input
        id="listing-price"
        className="form-field"
        type="number"
        placeholder="Listing Price"
        required={true}
        name="price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <label>Size:</label>
      <select
        name="size"
        id="listing-size"
        required={true}
        onChange={(e) => setSize(e.target.value)}
        value={size}
      >
        <option value="" selected disabled hidden >Select a size</option>
        <option value="Studio">Studio</option>
        <option value="One Bed">One Bed</option>
        <option value="Two Bed">Two Bed</option>
        <option value="Three Bed">Three Bed</option>
        <option value="Four Bed">Four Bed</option>
        <option value="Five Bed">Five Bed</option>
        <option value="Five Bed">Six Bed</option>
      </select>

      <label>Unit Type:</label>
      <select
        name="unitType"
        id="listing-unitType"
        required={true}
        onChange={(e) => setUnitType(e.target.value)}
        value={unitType}
      >
        <option value="" selected disabled hidden >Select a type</option>
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Condo">Condo</option>
        <option value="Single Room">Single Room</option>
      </select>

      <label>Number of Bathrooms:</label>
      <input
        id="listing-numBath"
        className="form-field"
        type="number"
        placeholder="Number of bathrooms"
        required={true}
        name="numBath"
        onChange={(e) => setNumBath(e.target.value)}
        value={numBath}
      />

      <label>Nearest School District:</label>
      <input
        id="listing-schoolDistrict"
        className="form-field"
        type="text"
        placeholder="School District"
        name="schoolDistrict"
        onChange={(e) => setSchoolDistrict(e.target.value)}
        value={schoolDistrict}
      />

      <label>Pets:</label>
      <select
        name="pets"
        id="listing-pets"
        required={true}
        onChange={(e) => setPets(e.target.value)}
        value={pets}
      >
        <option value="" selected disabled hidden >Pets Allowed?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label>Utilities:</label>
      <select
        name="utilities"
        id="listing-utilities"
        required={true}
        onChange={(e) => setUtilities(e.target.value)}
        value={utilities}
      >
        <option value="" selected disabled hidden >Utilities Provided?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label>Furnished:</label>
      <select
        name="furnished"
        id="listing-furnished"
        required={true}
        onChange={(e) => setFurnished(e.target.value)}
        value={furnished}
      >
        <option value="" selected disabled hidden >Furnished?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label>Distance to Transportation:</label>
      <select
        name="distTransportation"
        id="listing-distTransportation"
        required={true}
        onChange={(e) => setDistTransportation(e.target.value)}
        value={distTransportation}
      >
        <option value="" selected disabled hidden >Select a distance</option>
        <option value="Close">Close</option>
        <option value="Medium">Medium</option>
        <option value="Far">Far</option>
      </select>

      <label>Landlord:</label>
      <input
        id="listing-landlord"
        className="form-field"
        type="text"
        placeholder="Landlord Name"
        required={true}
        name="landlord"
        onChange={(e) => setLandlord(e.target.value)}
        value={landlord}
      />

      <label>Landlord Email:</label>
      <input
        id="listing-landlordEmail"
        className="form-field"
        type="email"
        placeholder="Landlord Email"
        name="landlordEmail"
        onChange={(e) => setLandlordEmail(e.target.value)}
        value={landlordEmail}
      />

      <label>Landlord Phone Number:</label>
      <input
        id="listing-landlordPhone"
        className="form-field"
        type="tel"
        placeholder="123-456-7890"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        name="landlordPhone"
        onChange={(e) => setLandlordPhone(e.target.value)}
        value={landlordPhone}
      />

      <label>Link to Original Listing:</label>
      <input
        id="listing-linkOrig"
        className="form-field"
        type="url"
        placeholder="Original Listing"
        name="linkOrig"
        onChange={(e) => setLinkOrig(e.target.value)}
        value={linkOrig}
      />

      <label>Link to Housing Application:</label>
      <input
        id="listing-linkApp"
        className="form-field"
        type="url"
        placeholder="Housing Application"
        name="linkApp"
        onChange={(e) => setLinkApp(e.target.value)}
        value={linkApp}
      />

      <label>Date this listing is available</label>
      <input
        id="listing-dateAvailable"
        className="form-field"
        type="date"
        placeholder="01/01/2000"
        pattern = "[0-9]{2}/[0-9]{2}/[0-9]{4}"
        name="dateAvailable"
        onChange={(e) => setDateAvailable(e.target.value)}
        value={dateAvailable}
      />

      <button type="submit">Add Listing</button>

    {error && <div className="listing-error">{error}</div>}
    </form>
  )
}

export default ListingForm