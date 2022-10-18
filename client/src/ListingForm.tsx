import { SyntheticEvent, useState } from "react"

const ListingForm = () => {
  const [webScraped, setWebScraped] = useState(false)
  const [pictures, setPictures] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
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
  const [error, setError] = useState(null)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const listing = {
      webScraped,
      pictures,
      price,
      size,
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
      linkApp
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
      setPictures('')
      setPrice('')
      setSize('')
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

      setError(null)
      console.log('New Listing Added', json)
    }
  }

  return (
    <form className="listing-form" onSubmit={handleSubmit}>
      <h3>Add a New Listing</h3>

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
        type="text"
        placeholder="Landlord Email"
        name="landlordEmail"
        onChange={(e) => setLandlordEmail(e.target.value)}
        value={landlordEmail}
      />

      <label>Landlord Phone Number:</label>
      <input
        id="listing-landlordPhone"
        className="form-field"
        type="number"
        placeholder="Landlord Phone"
        name="landlordPhone"
        onChange={(e) => setLandlordPhone(e.target.value)}
        value={landlordPhone}
      />

      <label>Link to Original Listing:</label>
      <input
        id="listing-linkOrig"
        className="form-field"
        type="text"
        placeholder="Original Listing"
        name="linkOrig"
        onChange={(e) => setLinkOrig(e.target.value)}
        value={linkOrig}
      />

      <label>Link to Housing Application:</label>
      <input
        id="listing-linkApp"
        className="form-field"
        type="text"
        placeholder="Housing Application"
        name="linkApp"
        onChange={(e) => setLinkApp(e.target.value)}
        value={linkApp}
      />

      <button type="submit">Add Listing</button>
      {error && <div className="listing-error">{error}</div>}
    </form>
  )
}

export default ListingForm