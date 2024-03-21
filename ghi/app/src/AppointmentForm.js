import React, { useEffect, useState } from 'react';


function AppointmentForm () {
    const [technicians, setTechnicians] = useState([]);

    const initialState = {
        vin: '',
        customer: '',
        reason: '',
        date_time: '',
        technician: '',
    }

    const [formData, setFormData] = useState(initialState)

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify({
                date_time: formData.date_time,
                reason: formData.reason,
                vin: formData.vin,
                customer: formData.customer,
                technician: formData.technician,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }

          const response = await fetch(url, fetchConfig);
          console.log(response)
          if (response.ok) {
            setFormData(initialState);
          }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
          ...formData,
          [inputName]: value
        });
      }



    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create an Appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                            <input value={formData.vin}
                            onChange={handleFormChange}
                            placeholder="vin"
                            required type="text"
                            name="vin"
                            id="vin"
                            className="form-control">
                            </input>
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.customer}
                            onChange={handleFormChange}
                            placeholder="customer"
                            required type="text"
                            name="customer"
                            id="customer"
                            className="form-control">
                            </input>
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.reason}
                            onChange={handleFormChange}
                            placeholder="reason"
                            required type="text"
                            name="reason"
                            id="reason"
                            className="form-control">
                            </input>
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.date_time}
                            onChange={handleFormChange}
                            placeholder="date_time"
                            required type="datetime-local"
                            name="date_time"
                            id="date_time"
                            className="form-control">
                            </input>
                            <label htmlFor="date_time">Select a date</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.technician} onChange={handleFormChange} required name="technician" id="technician" className="form-select">
                                <option value="">Choose a Technician</option>
                                {technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.href}>
                                            {technician.first_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AppointmentForm;