import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Update() {
    const { id } = useParams();
    const [data, setData] = useState({
        id: '',
        profileUrl: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: ''
    });

    useEffect(() => {
        fetch(`https://dummyjson.com/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`https://dummyjson.com/users/${id}`, {
            method: 'get', // or PATCH
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(updatedData => {
            console.log('Updated data:', updatedData);
            // Optionally handle success feedback or route to another page
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            // Optionally handle error states
        });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-item-center">
            <div className="w-50 vh-100 border bg-light p-3 m-5">
                <p className="text-center ">Update User Details</p>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="id"> User ID</label>
                        <input
                            type="text"
                            name="id"
                            className="form-control"
                            value={data.id}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="profileUrl"> Profile Image URL</label>
                        <input
                            type="text"
                            name="profileUrl"
                            className="form-control"
                            value={data.profileUrl}
                        />
                    </div>

                    <div>
                        <label htmlFor="firstName"> First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={data.firstName}
                            />
                    </div>

                    <div>
                        <label htmlFor="lastName"> Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={data.lastName}
                            />
                    </div>

                    <div>
                        <label htmlFor="email"> Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={data.email}
                            />
                    </div>

                    <div>
                        <label htmlFor="phone"> Phone Number</label>
                        <input
                            type="number"
                            name="phone"
                            className="form-control"
                            value={data.phone}
                          />
                    </div>

                    <div>
                        <label htmlFor="age"> Age</label>
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            value={data.age}
                          />
                    </div>

                    <button type="submit" className="btn btn-info mt-3">Submit</button>
                </form>
                <br />
                <br />
            </div>
        </div>
    )
}
export default Update;