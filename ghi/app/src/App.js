import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespeopleList from './SalespeopleList.js';
import SalespeopleForm from './SalespeopleForm.js';
import CustomersList from './CustomersList.js';
import CustomerForm from './CustomerForm.js';
import SalesList from './SalesList.js';
import SaleForm from './SaleForm.js';
import SalespersonHistory from './SalespersonHistory.js';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm.js';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
import AutomobileForm from './AutomobileForm.js';
import AutomobilesList from './AutomobilesList.js';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople">
            <Route path="" element={<SalespeopleList />} />
            <Route path="new" element={<SalespeopleForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomersList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="new" element={<SaleForm />} />
            <Route path="history" element={<SalespersonHistory />} />
          </Route>
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="manufacturers/new" element={<ManufacturerForm />} />
          <Route path="models" element={<VehicleModelList />} />
          <Route path="models/new" element={<VehicleModelForm />} />
          <Route path="technicians" element={<TechnicianList />} />
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="appointments/new" element={<AppointmentForm />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="servicehistory" element={<ServiceHistory />} />
        <Route path="automobiles">
          <Route path="" element={<AutomobilesList />} />
          <Route path="new" element={<AutomobileForm />} />
        </Route>
        <Route path="salespeople">
            <Route path="" element={<SalespeopleList />} />
            <Route path="new" element={<SalespeopleForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomersList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="new" element={<SaleForm />} />
            <Route path="history" element={<SalespersonHistory />} />
          </Route>
        </Routes>




      </div>
    </BrowserRouter>
  );
}

export default App;
