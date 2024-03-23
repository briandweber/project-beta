import React, { useEffect, useState } from 'react';


function SaleForm(){
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        vin: '',
        salesperson_id: '',
        customer_id: '',
        price: '',
    })

    const fetchAutos = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const filteredAutos = data.autos.filter((auto) => auto.sold === false);
            setAutomobiles(filteredAutos);
        }
    }

    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    const fetchCustomers = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchAutos();
        fetchSalespeople();
        fetchCustomers();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        console.log(formData);
        const response = await fetch(url, fetchConfig);
        if (response.ok){
            setFormData({
                vin: '',
                salesperson: '',
                customer: '',
                price: '',
            });
            console.log("response is ok")
        }
        console.log(formData);
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

                        <div className="mb-3">
                            <select onChange={handleFormChange} value={formData.vin} name="vin" id="vin" className="form-select">
                                <option value="">Choose an Automobile VIN...</option>
                                {automobiles.map(auto => {
                                return (
                                    <option key={auto.href} value={auto.vin}>{auto.vin}</option>
                                )
                                })}
                            </select>
                        </div>

                        <div className="mb-3">
                            <select onChange={handleFormChange} value={formData.salesperson_id} name="salesperson_id" id="salesperson" className="form-select">
                                <option value="">Choose a Salesperson...</option>
                                {salespeople.map(peep => {
                                return (
                                    <option key={peep.first_name} value={peep.employee_id}>{peep.first_name} {peep.last_name}</option>
                                )
                                })}
                            </select>
                        </div>

                        <div className="mb-3">
                            <select onChange={handleFormChange} value={formData.customer_id} name="customer_id" id="customer_id" className="form-select">
                                <option value="">Choose a Customer...</option>
                                {customers.map(customer => {
                                return (
                                    <option key={customer.first_name} value={customer.customer_id}>{customer.first_name} {customer.last_name}</option>
                                )
                                })}
                            </select>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.price} placeholder="price" required type="number" name="price" id="price" className="form-control" />
                            <label htmlFor="price">$</label>
                        </div>

                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SaleForm
