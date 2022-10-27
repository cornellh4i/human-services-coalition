import { useState } from "react"

const UserForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [voucherType, setVoucherType] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [supervisor, setSupervisor] = useState('')
  const [mInitial, setMInitial] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [prefName, setPrefName] = useState('')
  const [gender, setGender] = useState('')
  const [race, setRace] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [contactPref, setContactPref] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user = {
      username,
      password,
      voucherType,
      fName,
      lName,
      supervisor,
      mInitial,
      birthDate,
      email,
      phone,
      prefName,
      gender,
      race,
      ethnicity,
      contactPref
    }

    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify(user),
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
      setVoucherType('')
      setFName('')
      setLName('')
      setSupervisor('')
      setMInitial('')
      setBirthDate('')
      setEmail('')
      setPhone('')
      setPrefName('')
      setGender('')
      setRace('')
      setEthnicity('')
      setContactPref('')
      setError(null)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Add a New User </h3>

      <label>Username:</label>
      <input type="text"
        id="username"
        name="username"
        className="form-field"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />

      <label>Password:</label>
      <input type="text"
        id="password"
        name="password"
        className="form-field"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <label>Voucher Type:</label>
      <input 
        type="text"
        id="voucherType"
        name="voucherType"
        className="form-field"
        placeholder="Voucher Type"
        onChange={(e) => setVoucherType(e.target.value)}
        value={voucherType}
        required
      />

      <label>First Name:</label>
      <input type="text"
        id="fname"
        name="fname"
        className="form-field"
        placeholder="First Name"
        onChange={(e) => setFName(e.target.value)}
        value={fName}
        required
      />

      <label>Last Name:</label>
      <input type="text"
        id="lname"
        name="lname"
        className="form-field"
        placeholder="Last Name"
        onChange={(e) => setLName(e.target.value)}
        value={lName}
        required
      />

      <label>Supervisor:</label>
      <input type="text"
        id="supervisor"
        name="supervisor"
        className="form-field"
        placeholder="Supervisor"
        onChange={(e) => setSupervisor(e.target.value)}
        value={supervisor}
        required
      />

      <label>Middle Initial:</label>
      <input type="text"
        id="minitial"
        name="minitial"
        className="form-field"
        placeholder="Middle Initial"
        onChange={(e) => setMInitial(e.target.value)}
        value={mInitial}
      />

      <label>Birthdate:</label>
      <input type="date"
        id="birthdate"
        name="birthdate"
        className="date-field"
        placeholder="Birthdate"
        onChange={(e) => setBirthDate(e.target.value)}
        value={birthDate}
      />

      <label>Email:</label>
      <input type="email"
        id="email"
        name="email"
        className="form-field"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Phone:</label>
      <input type="tel"
        id="phone"
        name="phone"
        className="phone-field"
        placeholder="123-456-7890"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />

      <label>Preferred Name:</label>
      <input type="text"
        id="prefname"
        name="prefname"
        className="form-field"
        placeholder="Preferred Name"
        onChange={(e) => setPrefName(e.target.value)}
        value={prefName}
      />

      <label>Gender:</label>
      <select
        id="gender"
        name="gender"
        className="select-field"
        placeholder="Gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}>
        <option value="" selected disabled hidden>Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-Binary">Non-Binary</option>
        <option value="Other">Other</option>
        <option value="Prefer Not To Respond">Prefer Not To Respond</option>
      </select>

      <label>Race:</label>
      <input type="text"
        id="race"
        name="race"
        className="form-field"
        placeholder="Race"
        onChange={(e) => setRace(e.target.value)}
        value={race}
      />

      <label>Ethnicity:</label>
      <input type="text"
        id="ethnicity"
        name="ethnicity"
        className="form-field"
        placeholder="Ethnicity"
        onChange={(e) => setEthnicity(e.target.value)}
        value={ethnicity}
      />

      <label>Contact Preference:</label>
      <select
        id="contactpref"
        name="contactpref"
        className="select-field"
        placeholder="Preferred Contact Method"
        onChange={(e) => setContactPref(e.target.value)}
        value={contactPref}>
        <option value="" selected disabled hidden>Preferred Contact Method
        </option>
        <option value="Email">Email</option>
        <option value="Phone Number">Phone Number</option>
      </select>

      <button type="submit">Add User</button>
      {error && <div className="user-error">{error}</div>}
    </form>
  )
}

export default UserForm