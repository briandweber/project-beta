import React, { useEffect, useState } from 'react';


function SalesList(){
    const [sales, setSales] = useState([])
    const fetchData = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        setSales(data.sales);
    }
}
useEffect(() => {
    fetchData();
}, [])

return (
    <div className="px-4 py-5 my-7 text-center">
        <h1 className="display-5 fw-bold">Sales</h1>
        <div className="col-lg-6 mx-auto">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {sales.map(sale => {
                        return (
                            <tr key={ sale.href }>
                                <td>{ sale.employee_id }</td>
                                <td>{ sale.salesperson }</td>
                                <td>{ sale.customer }</td>
                                <td>{ sale.automobile.vin }</td>
                                <td>{ sale.price }</td>
                            </tr>
                        )
                    })} */}
                {/* </tbody> */}
            </table>
        </div>
    </div>
)
}
export default SalesList
