import React, { useEffect, useState } from 'react';

function AutomobilesList(){
    const [autos, setAutos] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setAutos(data.autos);
            // console.log("The autos are: " + data.autos[0]);
            console.log(data.autos);
        }

    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold">Automobiles</h1>
                <div className="col-lg-6 mx-auto">
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                       <th>VIN</th>
                       <th>Color</th>
                       <th>Year</th>
                       <th>Model</th>
                       <th>Manufacturer</th>
                       <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => {
                        return (
                            <tr key={ auto.href }>
                                <td>{ auto.vin }</td>
                                <td>{ auto.color }</td>
                                <td>{ auto.year }</td>
                                <td>{ auto.model.name }</td>
                                <td>{ auto.model.manufacturer.name }</td>
                                <td>{ auto.sold }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}
export default AutomobilesList
