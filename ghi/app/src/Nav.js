import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success flex-wrap">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="navbar-brand" to="/salespeople">Salespeople</NavLink>
        <NavLink className="navbar-brand" to="/salespeople/new">Add a Salesperson</NavLink>
        <NavLink className="navbar-brand" to="/sales/history">Salesperson History</NavLink>
        <NavLink className="navbar-brand" to="/customers">Customers</NavLink>
        <NavLink className="navbar-brand" to="/customers/new">Add a Customer</NavLink>
        <NavLink className="navbar-brand" to="/sales">Sales</NavLink>
        <NavLink className="navbar-brand" to="/sales/new">Add a Sale</NavLink>
        <NavLink className="navbar-brand" to="/automobiles">Automobiles</NavLink>
        <NavLink className="navbar-brand" to="/automobiles/new">Add an Automobile</NavLink>
        <NavLink className="navbar-brand" to="/manufacturers">Manufacturers</NavLink>
        <NavLink className="navbar-brand" to="/manufacturers/new">Create a Manufacturer</NavLink>
        <NavLink className="navbar-brand" to="/models">Vehicle Models</NavLink>
        <NavLink className="navbar-brand" to="/models/new">Add a Model</NavLink>
        <NavLink className="navbar-brand" to="/technicians">Technicians</NavLink>
        <NavLink className="navbar-brand" to="/technicians/new">Add a Technician</NavLink>
        <NavLink className="navbar-brand" to="/appointments/new">Create an Appointment</NavLink>
        <NavLink className="navbar-brand" to="/appointments">Service Appointments</NavLink>
        <NavLink className="navbar-brand" to="/servicehistory">Service History</NavLink>
        </div>
    </nav>
  )
}

export default Nav;
