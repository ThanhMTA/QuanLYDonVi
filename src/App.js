import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Nav from './component/Nav';
import DonVi from './component/DonVi';
import LoaiDonVi from './component/DonVi/LoaiDonVi';
import CanBo from './component/DonVi/CanBo';
import LoaiThietBi from './component/ThietBi/LoaiThietBI';
import NhomThietBi from './component/ThietBi/NhomThietBi';
import ThietBi from './component/ThietBi/ThietBI';

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
            <Route path="/canbo" element={<CanBo />} />
            <Route path="/loai_thiet_bi" element={<LoaiThietBi />} />
            <Route path="/nhom_thiet_bi" element={<NhomThietBi />} />
            <Route path="/thiet_bi" element={<ThietBi />} />






          </Routes>
        </BrowserRouter>


      </div>


    </>
  );
}

export default App;
