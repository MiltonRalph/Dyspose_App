import { useState } from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import MainLayout from './layout/MainLayout';
import Register from './page/Register';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import ScanWastePage from './page/ScanWastePage';
import ProfilePage from './page/ProfilePage'
import CouponPage from './page/CouponPage';
import TradePage from './page/TradePage';
import BuyProducts from './page/BuyProducts';
import SellProducts from './page/SellProducts';

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Register />} />
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<MainLayout />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/scan-waste' element={<ScanWastePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/coupons' element={<CouponPage />} />
              <Route path='/trade' element={<TradePage />} />
              <Route path='/buy' element={<BuyProducts />} />
              <Route path='/sell' element={<SellProducts />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>

      {/* <Register /> */}
    </>
  );
}

export default App;
