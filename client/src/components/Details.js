import React, { useState, useEffect } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';




const Details = () => {
    const [getuserdata, setUserdata] = useState({});
    console.log(getuserdata);

    const { id } = useParams();
    console.log(id);

    const navigate = useNavigate();

    const getdata = async () => {
        try {
            const res = await fetch(`/getuser/${id}`, { // Corrected the endpoint here
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
    }, []); // Added dependency array to prevent repeated calls

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
            navigate("/");

        }
    };
    
    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome Soham Sheth</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="row">
                        <div className="add_btn">
                            <NavLink to={`/edit/${getuserdata._id}`}>
                                <button className="btn btn-primary mx-2"><CreateIcon /></button>
                            </NavLink>
                            <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><DeleteIcon /></button>
                        </div>
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <AccountCircleIcon style={{ width: 50, height: 50 }} alt="profile" />
                            <h3 className='mt-3'>Name: <span>{getuserdata.name || "N/A"}</span></h3>
                            <h3 className='mt-3'>Age: <span>{getuserdata.age || "N/A"}</span></h3>
                            <p className='mt-3'><EmailIcon />Email: <span>{getuserdata.email || "N/A"}</span></p>
                            <p className='mt-3'><WorkIcon />Occupation: <span>{getuserdata.occupation || "N/A"}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12">
                            <p className='mt-5'><PhoneIphoneIcon />Mobile: <span>{getuserdata.mobile || "N/A"}</span></p>
                            <p className='mt-3'><AddLocationIcon />Location: <span>{getuserdata.location || "N/A"}</span></p>
                            <p className='mt-3'><DescriptionIcon />Description: <span>{getuserdata.description || "N/A"}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;

