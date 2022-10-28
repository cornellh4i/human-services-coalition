import React, { useState } from "react"
// const FMR = require("../../../server/src/models/FMR");

const FmrForm = () => {
  const [studio, setStudio] = useState('')
  const [oneBed, setOneBed] = useState('')
  const [twoBed, setTwoBed] = useState('')
  const [threeBed, setThreeBed] = useState('')
  const [fourBed, setFourBed] = useState('')
  const [fiveBed, setFiveBed] = useState('')
  const [sixBed, setSixBed] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const FMRprices = {
      studio,
      oneBed,
      twoBed,
      threeBed,
      fourBed,
      fiveBed,
      sixBed
    }

    const exists_response = await fetch('/api/fmr/')
    const res_json = await exists_response.json()

    if (res_json.length === 0) {
      const response = await fetch('/api/fmr/', {
        method: 'POST',
        body: JSON.stringify(FMRprices),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        setStudio('')
        setOneBed('')
        setTwoBed('')
        setThreeBed('')
        setFourBed('')
        setFiveBed('')
        setSixBed('')

        setError(null)
        console.log('New FMR prices Added', json)
      }
    }
    else {
      const response = await fetch(`/api/fmr/${res_json[0]._id}`, {
        method: 'PATCH',
        body: JSON.stringify(FMRprices),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        setStudio('')
        setOneBed('')
        setTwoBed('')
        setThreeBed('')
        setFourBed('')
        setFiveBed('')
        setSixBed('')

        setError(null)
        console.log('FMR Prices Updated', json)
      }
    }

    return (
      <form className="listing-form" onSubmit={handleSubmit}>
        <h3>Add New FMR Prices</h3>

        <label>Studio:</label>
        <input
          id="fmr-studio"
          className="form-field"
          type="number"
          placeholder="Studio FMR price"
          required={true}
          name="studioFMR"
          onChange={(e) => setStudio(e.target.value)}
          value={studio}
        />

        <label>One Bed:</label>
        <input
          id="fmr-oneBed"
          className="form-field"
          type="number"
          placeholder="One Bed FMR price"
          required={true}
          name="oneBedFMR"
          onChange={(e) => setOneBed(e.target.value)}
          value={oneBed}
        />

        <label>Two Bed:</label>
        <input
          id="fmr-twoBed"
          className="form-field"
          type="number"
          placeholder="Two Bed FMR price"
          required={true}
          name="twoBedFMR"
          onChange={(e) => setTwoBed(e.target.value)}
          value={twoBed}
        />

        <label>Three Bed:</label>
        <input
          id="fmr-threeBed"
          className="form-field"
          type="number"
          placeholder="Three Bed FMR price"
          required={true}
          name="threeBedFMR"
          onChange={(e) => setThreeBed(e.target.value)}
          value={threeBed}
        />

        <label>Four Bed:</label>
        <input
          id="fmr-fourBed"
          className="form-field"
          type="number"
          placeholder="Four Bed FMR price"
          required={true}
          name="fourBedFMR"
          onChange={(e) => setFourBed(e.target.value)}
          value={fourBed}
        />

        <label>Five Bed:</label>
        <input
          id="fmr-fiveBed"
          className="form-field"
          type="number"
          placeholder="Five Bed FMR price"
          required={true}
          name="fiveBedFMR"
          onChange={(e) => setFiveBed(e.target.value)}
          value={fiveBed}
        />

        <label>Six Bed:</label>
        <input
          id="fmr-sixBed"
          className="form-field"
          type="number"
          placeholder="Six Bed FMR price"
          required={true}
          name="sixBedFMR"
          onChange={(e) => setSixBed(e.target.value)}
          value={sixBed}
        />

        <button type="submit">Add FMR Prices</button>

        {error && <div className="fmr-error">{error}</div>}
      </form>
    )
  }
}
  export default FmrForm