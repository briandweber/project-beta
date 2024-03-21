import React, { useEffect, useState } from 'react';

function SalespersonHistory(){
    const [salespeople, setSalespeople] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '',
    })
    const fetchData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

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
                <h1>Salesperson History</h1>
                <form id="create-automobile-form">
                    <div className="mb-3">
                    <select onChange={handleFormChange} value={formData.model_id} name="model_id" id="model_id" className="form-select">
                        <option value="">Choose a salesperson...</option>
                        {salespeople.map(peep => {
                        return (
                            <option key={peep.href} value={peep.employee_id}>{peep.first_name} {peep.last_name}</option>
                        )
                        })}
                    </select>
                    </div>
                </form>
                </div>
                <div className="px-4 py-5 my-7 text-center">
                    <div className="col-lg-6 mx-auto">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Salesperson</th>
                                    <th>Customer</th>
                                    <th>VIN</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salespeople.map(peeps => {
                                    return (
                                        <tr key={ peeps.href }>
                                            <td>{ peeps.first_name } { peeps.last_name }</td>
                                            <td>{ peeps.first_name }</td>
                                            <td>{ peeps.last_name }</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalespersonHistory
