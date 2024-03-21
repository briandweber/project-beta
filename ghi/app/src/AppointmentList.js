import React, { useEffect, useState } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/appointments');
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
            } else {
                console.error('Failed to fetch appointments:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleCancelAppointment = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ "status": "canceled" })
            });
            if (response.ok) {
                setAppointments(appointments.filter(appointment => appointment.id !== id));
            } else {
                console.error('failed to cancel appointment', response.statusText)
            }
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    }

    const handleFinishAppointment = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ "status": "finished" }),
            });
            if (response.ok) {
                setAppointments(appointments.filter(appointment => appointment.id !== id));
            } else {
                console.error("failed to finish appointment", response.statusText);
            }
        } catch (error) {
            console.error("Error finishing appointment:", error);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Vin</th>
                    <th>VIP</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    if (appointment.status === "created") {
                        return (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.vip ? "Yes": "No"}</td>
                            <td>{appointment.customer}</td>
                            <td>{formatDate(appointment.date_time)}</td>
                            <td>{appointment.technician["first_name"]} {appointment.technician["last_name"]}</td>
                            <td>{appointment.reason}</td>
                            <td>
                                <button onClick={() => handleCancelAppointment(appointment.id)}>Cancel</button>
                                <button onClick={() => handleFinishAppointment(appointment.id)}>Finish</button>
                            </td>
                        </tr>
                    )
                    }
                    
                })}
            </tbody>
        </table>
    )
}


export default AppointmentList;
