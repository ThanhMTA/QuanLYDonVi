import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Nav from './component/Nav';
import DonVi from './component/DonVi';

import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <>
      {/* <Nav /> */}
      {/* <Home /> */}
      <div>

        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/donvi" element={<DonVi />} />



          </Routes>
        </BrowserRouter>


      </div>


    </>
  );
}

export default App;
