import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Nav from './component/Nav';
import DonVi from './component/DonVi';
import LoaiDonVi from './component/DonVi/LoaiDonVi';
import CanBo from './component/DonVi/CanBo';
import ThietBi from './component/ThietBi/ThietBI';
import HocVien from './component/HocVien/HocVien';
// import Diem from './component/HocVien/Diem';
import CapPhat from './component/ThietBi/CapPhat';
import NhomThietBi from './component/ThietBi/NhomThietBi';
import LoaiThietBi from './component/ThietBi/LoaiThietBi';
import KHHL from './component/KHHL';
import LICHHL from './component/KHHL/LichHL';
import HocVienHL from './component/KHHL/HocVien';
import ChuyenCan from './component/KHHL/ChuyenCan';
import Diem from './component/KHHL/KiemTra';
import DiemDanh from './component/KHHL/ChuyenCan';
import Dashboard from './component/Home';
import TaiKhoan from './component/TaiKhoan';

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
            <Route path="/thiet_bi/nhom_thiet_bi" element={<NhomThietBi />} />
            <Route path="/thiet_bi/loai_thiet_bi" element={<LoaiThietBi />} />
            <Route path="/khhl" element={<KHHL />} />
            <Route path="/lich" element={<LICHHL />} />
            <Route path="/khhl/lich/:id" element={<LICHHL />} />
            <Route path="/lich/diemdanh/:id" element={<DiemDanh />} />
            <Route path="/donvi_thuchien" element={<HocVienHL />} />
            <Route path="/chuyencan" element={<ChuyenCan />} />
            <Route path="/diem" element={<Diem />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/taiKhoan" element={<TaiKhoan />} />
          </Routes>
        </BrowserRouter>

      </div>


    </>
  );
}

export default App;
