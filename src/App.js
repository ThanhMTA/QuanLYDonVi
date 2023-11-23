import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Nav from './component/Nav';
import DonVi from './component/DonVi';
import LoaiDonVi from './component/DonVi/LoaiDonVi';

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
            <Route path="/loaidonvi" element={<LoaiDonVi />} />




          </Routes>
        </BrowserRouter>


      </div>


    </>
  );
}

export default App;
