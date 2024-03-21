import React, { useEffect, useState } from 'react';

function VehicleModelList() {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table table-image">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.map(
                                model => {
                                    return (
                                        <tr key={model.id}>
                                            <td>{model.name}</td>
                                            <td>{model.manufacturer["name"]}</td>
                                            <td className="w-25">
                                                <img src={model.picture_url} className="img-fluid img-thumbnail" alt="Model"></img>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default VehicleModelList;
