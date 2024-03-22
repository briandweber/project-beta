import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success flex-wrap">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="navbar-brand" to="/models/new">Create a Model</NavLink>
        <NavLink className="navbar-brand" to="/automobiles">Automobiles</NavLink>
        <NavLink className="navbar-brand" to="/automobiles/new">Create an Automobile</NavLink>
        <NavLink className="navbar-brand" to="/salespeople">Salespeople</NavLink>
        <NavLink className="navbar-brand" to="/salespeople/new">Add a Salesperson</NavLink>
        <NavLink className="navbar-brand" to="/sales/history">Salesperson History</NavLink>
        <NavLink className="navbar-brand" to="/customers">Customers</NavLink>
        <NavLink className="navbar-brand" to="/customers/new">Add a Customer</NavLink>
        <NavLink className="navbar-brand" to="/sales">Sales</NavLink>
        <NavLink className="navbar-brand" to="/sales/new">Add a Sale</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/new">Create a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models">Vehicle Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians/new">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/new">Create an Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/servicehistory">Service History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
