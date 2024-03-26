import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function AddUser() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputData, setInputData] = useState({
        id:'',
        profileUrl: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: ''
    });
    const navigat = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData) // Removed unnecessary curly braces around inputData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            setInputData({
                id:'',
                profileUrl: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                age: ''
            });

            alert("Data Added Successfully")
            navigat('/')
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors
          
        });
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-item-center ">
            <div className="w-50 vh-100 border bg-light p-3 m-5">
               <Button>Add user</Button>
                <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
                <form onSubmit={handleSubmit}>
                <div>
                        <label htmlFor="id"> User ID</label>
                        <input
                            type="text"
                            name="id"
                            className="form-control"
                            value={inputData.id}
                            onChange={e => setInputData({ ...inputData, id: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="profileUrl"> Profile Image URL</label>
                        <input
                            type="text"
                            name="profileUrl"
                            className="form-control"
                            value={inputData.profileUrl}
                            onChange={e => setInputData({ ...inputData, profileUrl: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="firstName"> First Name</label>
                        <input 
                        type="text" 
                        name="firstName" 
                        className="form-control"
                        onChange={e => setInputData({ ...inputData, firstName: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="lastName"> Last Name</label>
                        <input 
                        type="text" 
                        name="lastName" 
                        className="form-control"
                        onChange={e => setInputData({ ...inputData, lastName: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="email"> Email</label>
                        <input 
                        type="email" 
                        name="email" 
                        className="form-control"
                        onChange={e => setInputData({ ...inputData, email: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="phone"> Phone Number</label>
                        <input 
                        type="number" 
                        name="phone" 
                        className="form-control"
                        onChange={e => setInputData({ ...inputData, phone: e.target.value })} />
                    </div>

                    <div>
                        <label htmlFor="age"> Age</label>
                        <input 
                        type="number" 
                        name="age" 
                        className="form-control"
                        onChange={e => setInputData({ ...inputData, age: e.target.value })} />
                    </div>

                    <button type="submit" className="btn btn-info mt-3">Submit</button>
                </form>
               
                </Modal>
            </div>
            
        </div>
    );
}

