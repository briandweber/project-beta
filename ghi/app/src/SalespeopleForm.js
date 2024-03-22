import React, { useState } from 'react';


function SalespeopleForm(){

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok){
            setFormData({
                first_name: '',
                last_name: '',
                employee_id: '',
            });
        }
    }

    const handleFormChange = async (e) => {
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
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">

                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.first_name} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control" />
                        <label htmlFor="model_name">First Name...</label>
                        </div>

                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.last_name} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control" />
                        <label htmlFor="picture_url">Last Name...</label>
                        </div>

                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.employee_id} placeholder="employee_id" required type="number" name="employee_id" id="employee_id" className="form-control" />
                        <label htmlFor="picture_url">Employee ID...</label>
                        </div>

                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalespeopleForm;
