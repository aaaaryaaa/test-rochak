import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';

const App = () => {
    const [route, setRoute] = useState('');

    useEffect(() => {
        console.log("Sending GET request to determine the route");

        axios.get('http://localhost:5000/route')
            .then((response) => {
                console.log("Response received:", response.data);
                setRoute(response.data.route);
            })
            .catch((error) => {
                console.error("Error determining the route:", error);
            });
    }, []);

    if (!route) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
