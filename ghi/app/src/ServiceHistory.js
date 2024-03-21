import React, { useEffect, useState } from 'react';

function ServiceHistory () {
    const [appointments, setAppointments] = useState([]);

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

    return (
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
    )
}

export default ServiceHistory;