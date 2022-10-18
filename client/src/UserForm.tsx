import { useState } from "react"

const UserForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [dateCreated, setDateCreated] = useState('')
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
  const [recentlyViewed, setRecentlyViewed] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user = {
      username,
      password,
      fname,
      lname,
      dateCreated,
      supervisor,
      mInitial,
      birthDate,
      email,
      phone,
      prefName,
      gender,
      race,
      ethnicity,
      contactPref,
      recentlyViewed,
    }

    const response = await fetch('/api/user', {
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
      setFname('')
      setLname('')
      setDateCreated('')
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
      setRecentlyViewed('')
      setError(null)
      console.log('New user added', json)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Add a New User </h3>

      <label>Username:</label>
      <input type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label>Password:</label>
      <input type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>First Name:</label>
      <input type="text"
        onChange={(e) => setFname(e.target.value)}
        value={fname}
      />

      <label>Last Name:</label>
      <input type="text"
        onChange={(e) => setLname(e.target.value)}
        value={lname}
      />

      <label>Date Created:</label>
      <input type="text"
        onChange={(e) => setDateCreated(e.target.value)}
        value={dateCreated}
      />

      <label>Supervisor:</label>
      <input type="text"
        onChange={(e) => setSupervisor(e.target.value)}
        value={supervisor}
      />

      <label>Middle Initial:</label>
      <input type="text"
        onChange={(e) => setMInitial(e.target.value)}
        value={mInitial}
      />

      <label>Birthdate:</label>
      <input type="text"
        onChange={(e) => setBirthDate(e.target.value)}
        value={birthDate}
      />

      <label>Email:</label>
      <input type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Phone:</label>
      <input type="number"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />

      <label>Preferred Name:</label>
      <input type="text"
        onChange={(e) => setPrefName(e.target.value)}
        value={prefName}
      />

      <label>Gender:</label>
      <input type="text"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      />

      <label>Race:</label>
      <input type="text"
        onChange={(e) => setRace(e.target.value)}
        value={race}
      />

      <label>Ethnicity:</label>
      <input type="text"
        onChange={(e) => setEthnicity(e.target.value)}
        value={ethnicity}
      />

      <label>Contact Preference:</label>
      <input type="text"
        onChange={(e) => setContactPref(e.target.value)}
        value={contactPref}
      />

      <label>Recently Viewed:</label>
      <input type="text"
        onChange={(e) => setRecentlyViewed(e.target.value)}
        value={recentlyViewed}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}

    </form>
  )


}

export default UserForm