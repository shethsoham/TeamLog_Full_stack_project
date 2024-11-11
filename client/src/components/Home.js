import React, { useState, useEffect, useContext } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { MyContext } from './context/ContextProvider'; 
import {adddata} from './context/ContextProvider';



const Home = () => {
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    
    const { udata, setUdata } = useContext(MyContext);


    // Use MyContext instead of adddata
    const { state, setState } = useContext(MyContext);

    const getdata = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("Error: No data found");
            } else {
                setUserdata(data);
                console.log("Data fetched successfully");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {
        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            console.log("User deleted");
            getdata(); // Refresh the data after deletion
        }
    };

    return (
        <>
        {
            <>
            {udata ? 
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> User added successfully.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> 
                : ""
            }
        </>
        
        }
            
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add Data</NavLink>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">ID</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getuserdata.length > 0 ? (
                                getuserdata.map((user, index) => (
                                    <tr key={user.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.name || "N/A"}</td>
                                        <td>{user.email || "N/A"}</td>
                                        <td>{user.work || "N/A"}</td>
                                        <td>{user.mobile || "N/A"}</td>
                                        <td className="d-flex justify-content-between">
                                            <NavLink to={`/view/${user._id}`}>
                                                <button className="btn btn-success"><RemoveRedEyeIcon /></button>
                                            </NavLink>
                                            <NavLink to={`/edit/${user._id}`}>
                                                <button className="btn btn-primary"><CreateIcon /></button>
                                            </NavLink>
                                            <button className="btn btn-danger" onClick={() => deleteuser(user._id)}><DeleteIcon /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Home;
