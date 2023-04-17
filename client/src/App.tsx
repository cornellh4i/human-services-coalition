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

import ProofSearch from './pages/ProofSearch';
import FmrForm from './forms/FmrForm';


function App() {

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
          <NavBar />
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
              <Route
                path="/proof_search"
                element={<ProofSearch />}
              />
            </Routes>
          </div>
          <div className="forms">
            <Routes>
              <Route
                  path='/login-form'
                  element={<LoginForm />}
                />
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
              <Route
                path='/fmr-form'
                element={<FmrForm />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
