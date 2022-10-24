import { useState } from "react"

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className="login-form">
      <h3>Login</h3>

      <label>Username:</label>
      <input
        id="login-username"
        className="form-field"
        type="text"
        placeholder="Username"
        required={true}
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label>Password:</label>
      <input
        id="login-password"
        className="form-field"
        type="password"
        placeholder="Password"
        required={true}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm