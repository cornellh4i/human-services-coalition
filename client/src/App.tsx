import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from "./pages/Home"
import Users from "./pages/Users"
import Admins from "./pages/Admins"
import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/users"
              element={<Users />}
            />
            <Route
              path="/admins"
              element={<Admins />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
