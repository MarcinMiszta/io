import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import { Home } from './pages/Home';
import { ControllerDashboard } from './pages/controller/Dashboard';
import { StandDetail } from './pages/controller/StandDetail';
import { ControllerMap } from './pages/controller/Map';
import { ControllerInspections } from './pages/controller/Inspections';
import { ControllerIncidents } from './pages/controller/Incidents';
import { OfficeDashboard } from './pages/office/Dashboard';
import { OfficeMap } from './pages/office/Map';
import { OfficeCashier } from './pages/office/Cashier';
import { OfficeReports } from './pages/office/Reports';
import { SellerDashboard } from './pages/seller/Dashboard';
import { SellerMap } from './pages/seller/Map';
import { SellerReservations } from './pages/seller/Reservations';
import { SellerStands } from './pages/seller/Stands';
import { SellerPayments } from './pages/seller/Payments';
import { SellerHistory } from './pages/seller/History';

// Simple Login Placeholder as we handle role selection in Home
const Login = () => <Navigate to="/" />;

function App() {
  return (
    <BrowserRouter>
      <MarketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Controller Routes */}
          <Route path="/controller" element={<ControllerDashboard />} />
          <Route path="/controller/map" element={<ControllerMap />} />
          <Route path="/controller/inspections" element={<ControllerInspections />} />
          <Route path="/controller/incidents" element={<ControllerIncidents />} />
          <Route path="/controller/stand/:id" element={<StandDetail />} />

          {/* Office Routes */}
          <Route path="/office" element={<OfficeDashboard />} />
          <Route path="/office/map" element={<OfficeMap />} />
          <Route path="/office/cashier" element={<OfficeCashier />} />
          <Route path="/office/reports" element={<OfficeReports />} />

          {/* Seller Routes */}
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/map" element={<SellerMap />} />
          <Route path="/seller/reservations" element={<SellerReservations />} />
          <Route path="/seller/stands" element={<SellerStands />} />
          <Route path="/seller/payments" element={<SellerPayments />} />
          <Route path="/seller/history" element={<SellerHistory />} />
        </Routes>
      </MarketProvider>
    </BrowserRouter>
  );
}

export default App;

