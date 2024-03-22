import React, { useEffect, useState } from 'react';

function ServiceHistory () {
    const [appointments, setAppointments] = useState([]);
    const [searchVin, setSearchVin] = useState('');

    useEffect(() => {
        fetchAppointments()
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/appointments');
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
            } else {
                console.error('Failed to fetch appointments', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching appointments', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    const handleSearchChange = (event) => {
        setSearchVin(event.target.value);
    };

    const handleSearch = () => {
        const filteredAppointments = appointments.filter(appointment => appointment.vin.includes(searchVin));
        setAppointments(filteredAppointments);
    };

    return (
        <div>
            <h1>Service History</h1>
            <div className="input-group">
                <input type="search" className="form-control rounded" aria-label="Search" aria-describedby="search-addon" value={searchVin} onChange={handleSearchChange} placeholder="Enter VIN" />
                <button type="button" className="btn btn-outline-primary" onClick={handleSearch} data-mdb-ripple-init>Search</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>VIP</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.vip ? "Yes": "No"}</td>
                                <td>{appointment.customer}</td>
                                <td>{formatDate(appointment.date_time)}</td>
                                <td>{appointment.technician["first_name"]} {appointment.technician["last_name"]}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ServiceHistory;