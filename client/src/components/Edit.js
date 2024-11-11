import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    });

    const { id } = useParams();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Handle input changes
    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            };
        });
    };

    // Fetch user data
    const getdata = async () => {
        try {
            const res = await fetch(`/getuser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (res.status === 422 || !data) {
                console.log("Error: No data found");
            } else {
                setINP(data);
                console.log("Data fetched successfully");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, [id]);

    // Update user data
    const updateduser = async (e) => {
        e.preventDefault();

        const { name, email, work, add, mobile, desc, age } = inpval;

        try {
            const res2 = await fetch(`/updateuser/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    work,
                    add,
                    mobile,
                    desc,
                    age
                })
            });

            const data2 = await res2.json();

            if (res2.status === 422 || !data2) {
                alert("Please fill in the data correctly.");
            } else {
                alert("Data updated successfully!");
                navigate("/");  // Corrected to use navigate instead of history.push
            }
        } catch (error) {
            console.error("Error updating data:", error);
            alert("There was an error updating the data.");
        }
    };

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4" onSubmit={updateduser}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            onChange={setdata}
                            value={inpval.name}
                            name="name"
                            className="form-control"
                            id="name"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            onChange={setdata}
                            value={inpval.email}
                            name="email"
                            className="form-control"
                            id="email"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input
                            type="text"
                            onChange={setdata}
                            value={inpval.age}
                            name="age"
                            className="form-control"
                            id="age"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input
                            type="number"
                            onChange={setdata}
                            value={inpval.mobile}
                            name="mobile"
                            className="form-control"
                            id="mobile"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="work" className="form-label">Work</label>
                        <input
                            type="text"
                            onChange={setdata}
                            value={inpval.work}
                            name="work"
                            className="form-control"
                            id="work"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="add" className="form-label">Address</label>
                        <input
                            type="text"
                            onChange={setdata}
                            value={inpval.add}
                            name="add"
                            className="form-control"
                            id="add"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea
                            name="desc"
                            onChange={setdata}
                            value={inpval.desc}
                            className="form-control"
                            id="desc"
                            cols="30"
                            rows="5"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
