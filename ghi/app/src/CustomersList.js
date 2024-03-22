import React, { useEffect, useState } from 'react';

function CustomersList(){
    const [customers, setCustomers] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setCustomers(data.customers);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="px-4 py-5 my-7 text-center">
            <h1 className="display-5 fw-bold">Customers</h1>
            <div className="col-lg-6 mx-auto">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => {
                            return (
                                <tr key={ customer.first_name }>
                                    <td>{ customer.first_name }</td>
                                    <td>{ customer.last_name }</td>
                                    <td>{ customer.phone_number }</td>
                                    <td>{ customer.address }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default CustomersList
