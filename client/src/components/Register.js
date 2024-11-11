import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyContext } from './context/ContextProvider';

const Register = () => {
    const { udata, setUdata } = useContext(MyContext);
    const navigate = useNavigate();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => ({
            ...preval,
            [name]: value
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();
        const { name, email, age, mobile, work, add, desc } = inpval;

        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, age, mobile, work, add, desc
                })
            });

            const data = await res.json();
            console.log(data);
            
            if (res.status === 422 || !data) {
                alert("Error adding data");
                console.log("Error");
            } else {
                alert("Data added successfully");
                navigate("/"); // Corrected navigation
                setUdata(data);
                console.log("Data added");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4" onSubmit={addinpdata}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input type="text" onChange={setdata} value={inpval.name} name="name" className="form-control" id="nameInput" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input type="email" onChange={setdata} value={inpval.email} name="email" className="form-control" id="emailInput" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="ageInput" className="form-label">Age</label>
                        <input type="text" onChange={setdata} value={inpval.age} name="age" className="form-control" id="ageInput" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobileInput" className="form-label">Mobile</label>
                        <input type="number" onChange={setdata} value={inpval.mobile} name="mobile" className="form-control" id="mobileInput" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="workInput" className="form-label">Work</label>
                        <input type="text" onChange={setdata} value={inpval.work} name="work" className="form-control" id="workInput" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="addressInput" className="form-label">Address</label>
                        <input type="text" onChange={setdata} value={inpval.add} name="add" className="form-control" id="addressInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descInput" className="form-label">Description</label>
                        <textarea name="desc" onChange={setdata} value={inpval.desc} className="form-control" id="descInput"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
