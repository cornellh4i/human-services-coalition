import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from "./pages/Home"
import Users from "./pages/Users"
import Admins from "./pages/Admins"
import NavBar from "./components/NavBar"
import ListingInformation from './pages/ListingInformation'

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
            <Route
              path="/listing_info"
              element={<ListingInformation />}
            />
          </Routes>
        </div>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
