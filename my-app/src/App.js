
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import Registration from './Component/Registration';
function App() {
    return (
        <Router future={{ v7_startTransition: true }}>
            <Routes>
            <Route path="/" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                {/* Add a default route or a profile route if needed */}
            </Routes>
        </Router>
    );
}

export default App;
