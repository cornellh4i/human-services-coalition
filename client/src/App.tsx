import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { useEffect, useState } from "react";
// import Home from "./pages/Home"
import Users from "./pages/Users"
import NavBar from "./components/NavBar"
// const API_URL = process.env.REACT_APP_API;


function App() {
  // const [data, setData] = useState("No data :(");

  // useEffect(() => {
  //   async function getData() {
  //     const url = `${API_URL}/hello`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setData(data.msg);
  //   }
  //   getData();
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Users />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
