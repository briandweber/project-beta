import React, { useEffect, useState } from 'react';


function SalespeopleList(){
    const [salespeople, setSalespeople] = useState([]);
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

    return (
        <div className="px-4 py-5 my-7 text-center">
            <h1 className="display-5 fw-bold">Salespeople</h1>
            <div className="col-lg-6 mx-auto">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespeople.map(peeps => {
                            return (
                                <tr key={ peeps.href }>
                                    <td>{ peeps.employee_id }</td>
                                    <td>{ peeps.first_name }</td>
                                    <td>{ peeps.last_name }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default SalespeopleList;
