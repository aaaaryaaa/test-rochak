// components/InfoPage2.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../BaseUrl';
import axios from 'axios';

const InfoPage2 = () => {
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

    // const handleNext = () => {
    //     navigate('/final');
    // };

    return (
        <div className="flex flex-col justify-center min-h-screen p-4 mx-60">
            <p className="text-2xl mb-4">
                Further you will be presented with various refrigerator models from these four brands. Hover on any model to view its full specifications, which would be displayed on the right side of the screen.
                You are free to select up to 4 models for comparison. The interactive design allows you to revisit the options screen at any time to adjust the models you are comparing.
                Once you’ve completed your comparisons, you’ll be prompted to make a final choice from the options you’ve selected.
            </p>
            <button onClick={handleRedirect} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
                Next
            </button>
        </div>
    );
};

export default InfoPage2;
