import React, { useEffect, useState } from 'react';


function AppointmentForm () {
    const [technicians, setTechnicians] = useState([]);
    const [isVIP, setIsVIP] = useState(false);

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

    const checkVIPStatus = async () => {
        const inventoryUrl = 'http://localhost:8100/api/automobiles/';
        try {
            const response = await fetch(inventoryUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch automobile data');
            }
            const responseData = await response.json();
            const inventoryData = responseData.autos;
            console.log(inventoryData)
            if (!Array.isArray(inventoryData)) {
                throw new Error('Unexpected automobile data format');
            }
            const found = inventoryData.some(autos => autos.vin === formData.vin);
            setIsVIP(found);
        } catch (error) {
            console.error('Error fetching or processing automobile data:', error);
            setIsVIP(false); // Set isVIP to false in case of error
        }
    };
    
    // const checkVIPStatus = async () => {
    //     const inventoryUrl = 'http://localhost:8100/api/automobiles/';
    //     try {
    //         const response = await fetch(inventoryUrl);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch automobile data');
    //         }
    //         const responseData = await response.json();
    //         const inventoryData = responseData.autos;
    //         console.log('Inventory Data:', inventoryData);
    //         if (!Array.isArray(inventoryData)) {
    //             throw new Error('Unexpected automobile data format');
    //         }
    //         const formVIN = formData.vin.trim(); // Trim leading/trailing white spaces
    //         const found = inventoryData.some(auto => auto.vin === formVIN);
    //         console.log('Form VIN:', formVIN);
    //         console.log('VIP Status:', found);
    //         setIsVIP(found);
    //     } catch (error) {
    //         console.error('Error fetching or processing automobile data:', error);
    //         setIsVIP(false); // Set isVIP to false in case of error
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await checkVIPStatus();
        const url = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify({...formData, "vip": isVIP}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                setFormData(initialState);
            } else {
                const errorMessage = await response.text();
                throw new Error(`Failed to create appointment: ${response.status} - ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error creating appointment:', error.message);
        }
    };

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
                                        <option key={technician.id} value={technician.id}>
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