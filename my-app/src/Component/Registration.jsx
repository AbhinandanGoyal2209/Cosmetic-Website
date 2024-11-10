// src/components/Registration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';  // Import the CSS file

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.email === email)) {
            alert("You are already registered! Please login.");
            navigate('/login');
        } else {
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful!");
            navigate('/login');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Already a user?</h2>
                <button onClick={() => navigate('/login')} className="btn btn-warning">Log In</button>
                <h2>Sign Up</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={handleRegister} className="btn btn-primary">
                            Submit
                        </button>
                        <button type="reset" className="btn btn-warning" onClick={() => { setName(''); setEmail(''); setPassword(''); }}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
