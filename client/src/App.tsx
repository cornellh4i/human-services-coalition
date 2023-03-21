import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material';

import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import ListingInformation from './pages/ListingInformation'
import ManageProfiles from './pages/ManageProfiles'
import ListingForm from './forms/ListingForm'
import AdminForm from './forms/AdminForm'
import UserForm from './forms/UserForm'
import LoginForm from './forms/LoginForm'
import { useState } from 'react';

function App() {

  const [showNav, setShowNav] = useState(false);
  const [token, setToken] = useState();

  if (!token) {
    return <LoginForm setToken={setToken} />
  }

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Inter'
      ].join(','),
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {showNav && <NavBar />}
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/manage-profiles"
                element={<ManageProfiles />}
              />
              <Route
                path="/listing_info"
                element={<ListingInformation />}
              />
            </Routes>
          </div>
          <div className="forms">
            <Routes>
              <Route
                path='/listing-form'
                element={<ListingForm />}
              />
              <Route
                path='/admin-form'
                element={<AdminForm />}
              />
              <Route
                path='/user-form'
                element={<UserForm />}
              />
            </Routes>
          </div>
        </BrowserRouter>

      </ThemeProvider>
    </div>
  );
}

export default App;
