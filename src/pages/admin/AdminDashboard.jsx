import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authtoken");
        if (!token) {
            navigate('/login');
        } else {
            setAuthToken(token);

            // Make Axios GET request
            axios.get('http://localhost:8000/api/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    // Update the state with the received user data
                    setUsers(response.data.users);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [navigate]);

    return (
        <>
            <div className="container">

                <h1>Admin Dashboard</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>First Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.role}</td>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;
