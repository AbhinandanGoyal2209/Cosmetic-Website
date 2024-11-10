// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';  // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful!");
            localStorage.setItem("name", user.name);
            localStorage.setItem("email", user.email);
            navigate('/profile'); // Change this to your desired route
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-900" style={{ backgroundImage: "url('5.jpg')" }}>
            <div className="bg-opacity-80 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-yellow-400 mb-6">Log In Form</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-yellow-400 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border-2 border-yellow-400 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-yellow-400 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border-2 border-yellow-400 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={handleLogin} className="w-full p-3 bg-yellow-400 text-black rounded-lg font-semibold mb-4 hover:bg-yellow-300 transition-all duration-300">
                            Submit
                        </button>
                        <button type="reset" className="w-full p-3 bg-gray-300 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300" onClick={() => { setEmail(''); setPassword(''); }}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
