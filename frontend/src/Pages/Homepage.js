// Pages/Homepage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRedirect = () => {
        setLoading(true); // Set loading to true when button is clicked

        // Fetch the route distribution logic from the server or implement local logic here
        axios.get('http://localhost:5000/route')
            .then((response) => {
                const targetRoute = response.data.route;
                navigate(`/${targetRoute}`);
            })
            .catch((error) => {
                console.error("Error determining the route!", error);
                setLoading(false); // Reset loading if there's an error
            });
    };

    return (
        <div>
            <h2>Welcome to the Homepage!</h2>
            <p>Click the button below to proceed to one of our pages.</p>
            <button onClick={handleRedirect} disabled={loading}>
                {loading ? 'Redirecting...' : 'Go to Page'}
            </button>
        </div>
    );
};

export default Homepage;
