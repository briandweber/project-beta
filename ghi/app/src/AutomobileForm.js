import React, { useEffect, useState } from 'react';


function AutomobileForm(){
    const [models, setModels] = useState([]);
    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: '',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        // console.log(response);
        if (response.ok){
            const data = await response.json();
            setModels(data.models);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(url, fetchConfig);
        console.log(formData);

        if (response.ok){
            setFormData({
                color: '',
                year: '',
                vin: '',
                model_id: '',
            });
        }else {
            console.log("error");
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
                <h1>Add an automobile to inventory</h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">

                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.color} placeholder="Color..." required type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="model_name">Color...</label>
                    </div>

                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.year} placeholder="Year..." required type="number" name="year" id="year" className="form-control" />
                    <label htmlFor="picture_url">Year...</label>
                    </div>

                    <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.vin} placeholder="VIN..." required type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="picture_url">VIN...</label>
                    </div>

                    <div className="mb-3">
                    <select onChange={handleFormChange} value={formData.model_id} name="model_id" id="model_id" className="form-select">
                        <option value="">Choose a model...</option>
                        {models.map(model => {
                        return (
                            <option key={model.href} value={model.id}>{model.name}</option>
                        )
                        })}
                    </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}
export default AutomobileForm;
