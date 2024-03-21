import React, { useEffect, useState } from 'react';

function TechnicianForm () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const url = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    }

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleEmployeeIdChange = (e) => {
        const value = e.target.value;
        setEmployeeId(value)
    }

    return (
        <div className="row">
            <div className='offset-3 col-6'>
                <div className="shadow p-4 mt-4">
                    <h1>Add a Technician</h1>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder="First Name"
                            required type="text"
                            name="First Name"
                            id="First Name"
                            className="form-control"></input>
                            <label htmlFor="FirstName">First name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName}
                            onChange={handleLastNameChange}
                            placeholder="last Name"
                            required type="text"
                            name="last name"
                            id="last name"
                            className="form-control"></input>
                            <label htmlFor="lastName">Last name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employeeId}
                            onChange={handleEmployeeIdChange}
                            placeholder="employeeId"
                            required type="text"
                            name="employeeId"
                            id="employeeId"
                            className="form-control"></input>
                            <label htmlFor="employeeId">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default TechnicianForm;