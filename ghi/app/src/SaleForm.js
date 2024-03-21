import React, { useEffect, useState } from 'react';


function SaleForm(){
    const [vin, setVin] = useState([]);
    const [formData, setFormData] = useState({
        vin: '',
        salesperson: '',
        customer: '',
        price: '',
    })

    const fetchAuto = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setVin(data.vin);
        }
    }
    useEffect(() => {
        fetchAuto();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/sales/';
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
                vin: '',
                salesperson: '',
                customer: '',
                price: '',
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
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sales-form">

                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.first_name} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control" />
                        <label htmlFor="model_name">Choose an automobile VIN...</label>
                        </div>

                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.last_name} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control" />
                        <label htmlFor="picture_url">Choose a salesperson...</label>
                        </div>

                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.customer.name} placeholder="customer" required type="text" name="customer" id="customer" className="form-control" />
                        <label htmlFor="picture_url">Choose a customer...</label>
                        </div>

                        <div className="form-floating mb-3">
                        <input onChange={handleFormChange} value={formData.price} placeholder="price" required type="number" name="price" id="price" className="form-control" />
                        <label htmlFor="picture_url">0</label>
                        </div>

                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SaleForm
