import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../constants/baseUrl';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../../store/slices/authTokenSlice';

const AdminLogin = () => {
    const authToken = useSelector((state) => state.authToken.authToken);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        if (authToken) {
            navigate('/');
        }
    }, [navigate]);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value) // Placeholder for handling password changes
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${BASE_URL}/login`, {
            email: email,
            password: password
        })
        
        if (response.data.authtoken) {
            // save it in browser local storage
            localStorage.setItem('authtoken', response.data.authtoken)
            const storedAuthToken = localStorage.getItem('authtoken');
            if (storedAuthToken) {
                dispatch(setAuthToken(storedAuthToken));
            }
            localStorage.setItem('role', response.data.user.role)
            // navigate to / page
            navigate('/admin-dashboard')
        }
    };

    return (
        <>
            <div className="container py-4 px-4 my-4 bg-dark text-white">
                <form onSubmit={handleFormSubmit}>
                    <h4 className="text-center text-danger">Admin Login Form</h4>
                    {/* email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </div>
                    {/* password */}
                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="btn btn-outline-secondary"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {/* submit */}
                    <div className="mb-3 text-center">
                        <button className="btn btn-primary form-control" type="submit" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin