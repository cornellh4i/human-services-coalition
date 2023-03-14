import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material';

import LoginForm from './forms/LoginForm'

function Log() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Inter'
      ].join(','),
    },
  });

  return (
    <div className="Log">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="pages">

            <div className="login-form">
              <Routes>
                <Route
                  path='/login-form'
                  element={<LoginForm />}
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default Log;
