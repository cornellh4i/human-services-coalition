import { useState } from "react"

const AdminForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [mInitial, setMInitial] = useState('')
  const [prefName, setPrefName] = useState('')
  const [gender, setGender] = useState('')
  const [race, setRace] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contactPref, setContactPref] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const admin = {
      username,
      password,
      fName,
      lName,
      mInitial,
      prefName,
      gender,
      race,
      ethnicity,
      email,
      phone,
      contactPref,
      company
    }

    const response = await fetch('/api/admins/', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setUsername('')
      setPassword('')
      setFname('')
      setLname('')
      setMInitial('')
      setPrefName('')
      setGender('')
      setRace('')
      setEthnicity('')
      setEmail('')
      setPhone('')
      setContactPref('')
      setCompany('')
      setError(null)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Add a New Admin </h3>

      <label>Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        className="form-field"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />

      <label>Password:</label>
      <input
        type="text"
        id="password"
        name="password"
        className="form-field"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <label>First Name:</label>
      <input
        type="text"
        id="fName"
        name="fName"
        className="form-field"
        onChange={(e) => setFname(e.target.value)}
        value={fName}
        required
      />

      <label>Last Name:</label>
      <input
        type="text"
        id="lName"
        name="lName"
        className="form-field"
        onChange={(e) => setLname(e.target.value)}
        value={lName}
        required
      />

      <label>Middle Initial:</label>
      <input type="text"
        id="mInitial"
        name="mInitial"
        className="form-field"
        onChange={(e) => setMInitial(e.target.value)}
        value={mInitial}
      />

      <label>Preferred Name:</label>
      <input
        type="text"
        id="prefName"
        name="prefName"
        className="form-field"
        onChange={(e) => setPrefName(e.target.value)}
        value={prefName}
      />

      <label>Gender:</label>
      <select
        id="gender"
        name="gender"
        className="select-field"
        onChange={(e) => setGender(e.target.value)}
        value={gender}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-Binary">Non-Binary</option>
        <option value="Other">Other</option>
        <option value="Prefer Not To Respond">Prefer Not To Respond</option>
      </select>


      <label>Race:</label>
      <input
        type="text"
        id="race"
        name="race"
        className="form-field"
        onChange={(e) => setRace(e.target.value)}
        value={race}
      />

      <label>Ethnicity:</label>
      <input
        type="text"
        id="ethnicity"
        name="ethnicity"
        className="form-field"
        onChange={(e) => setEthnicity(e.target.value)}
        value={ethnicity}
      />

      <label>Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        className="form-field"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Phone:</label>
      <input type="tel"
        id="phone"
        name="phone"
        className="phone-field"
        placeholder="123-45-678"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />

      <label>Contact Preference:</label>
      <select
        id="contactpref"
        name="contactpref"
        className="select-field"
        onChange={(e) => setContactPref(e.target.value)}
        value={contactPref}>
        <option value="email">Email</option>
        <option value="phone number">Phone Number</option>
      </select>

      <label>Company</label>
      <input
        type="text"
        id="company"
        name="company"
        className="form-field"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />

      <button type="submit">Add Admin</button>
      {error && <div className="admin-error">{error}</div>}

    </form>
  )
}

export default AdminForm

