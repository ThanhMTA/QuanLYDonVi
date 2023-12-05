import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Nav from './component/Nav';
import DonVi from './component/DonVi';
import LoaiDonVi from './component/DonVi/LoaiDonVi';
import CanBo from './component/DonVi/CanBo';
import ThietBi from './component/ThietBi/ThietBI';
import HocVien from './component/HocVien/HocVien';
import Diem from './component/HocVien/Diem';
import CapPhat from './component/ThietBi/CapPhat';

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
            <Route path="/thiet_bi" element={<ThietBi />} />
            <Route path="/hocvien" element={<HocVien />} />
            <Route path="/hocvien/diem" element={<Diem />}></Route>
            <Route path="/cap_phat" element={<CapPhat />}></Route>

          </Routes>
        </BrowserRouter>


      </div>


    </>
  );
}

export default App;
