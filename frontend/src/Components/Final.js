import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../BaseUrl';

const Final = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const prolificId = localStorage.getItem('prolificId'); // Retrieve prolificId from localStorage

    const handleRedirect = () => {
        setLoading(true); // Set loading to true when button is clicked

        // Fetch the route distribution logic from the server
        axios.get(`${BaseUrl}/api/route`)
            .then((response) => {
                const targetRoute = response.data.route;

                // Make a PATCH request to update the user's page field
                axios.patch(`${BaseUrl}/api/users/update-page`, {
                    prolificId: prolificId,
                    page: targetRoute
                })
                .then(() => {
                    navigate(`/${targetRoute}`);
                })
                .catch((error) => {
                    console.error('Error updating user page:', error);
                    setLoading(false); // Reset loading if there's an error
                });
            })
            .catch((error) => {
                console.error("Error determining the route!", error);
                setLoading(false); // Reset loading if there's an error
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Final Page</h2>
            <p className="mb-4">
                You have completed all the required steps. Click the button below to proceed to the survey.
            </p>
            <button onClick={handleRedirect} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
                {loading ? 'Redirecting...' : 'Go to Survey'}
            </button>
        </div>
    );
};

export default Final;
