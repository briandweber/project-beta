import React, { useEffect, useState } from 'react';

function SalespersonHistory(){
    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '',
    })
    let sum = 0;
    const fetchSales = async() => {
        const salesUrl = 'http://localhost:8090/api/sales/';
        const response = await fetch(salesUrl);
        if (response.ok){
            const data = await response.json();
            // const filteredSales = data.sales.filter((sale) => sale.salesperson.first_name === formData.first_name)
            const filteredSales = data.sales.filter((sale) => sale.salesperson.first_name === formData.first_name)
            sum ++;

            // setSales(data.sales);
            setSales(filteredSales);


            console.log("data.sales: ");
            console.log(data.sales);
            console.log("filtered sales");
            console.log(filteredSales);
            console.log("sales");
            console.log(sales);
            console.log(sum);
        }
    }

    const fetchSalespeople = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(salespeopleUrl);
        if (response.ok){
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }
    useEffect(() => {
        fetchSalespeople();
        // fetchSales();
    }, [])

    const handleFormChange = async (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        // fetchSalespeople();
        setFormData({
            ...formData,
            [inputName]: value
        });
        fetchSales();
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Salesperson History</h1>
                <form id="create-automobile-form">
                    <div className="mb-3">
                    <select onChange={handleFormChange} value={formData.first_name} name="first_name" id="first_name" className="form-select">
                        <option value="">Choose a salesperson...</option>
                        {salespeople.map(peep => {
                        return (
                            <option key={peep.employee_id} value={peep.first_name}>{peep.first_name} {peep.last_name} </option>
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
                                {sales.map(sale => {
                                    return (
                                        <tr key={ sale.price }>
                                            <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                                            <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                                            <td>{ sale.automobile.vin }</td>
                                            <td>{ sale.price }</td>
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
