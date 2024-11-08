// components/ProlificId.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import CaptchaComponent from './CaptchaComponent';

const ProlificId = () => {
    const [verified, setVerified] = useState(false);
    const [prolificId, setProlificId] = useState(''); // Replace with auto-fill logic if needed
    const navigate = useNavigate();

    const handleNext = async () => {
        try {
            // Call the API to create a user
            const response = await axios.post(`${BaseUrl}/api/users/create`, { prolificId });
            // console.log(response.data); // You can store user data or show a message if needed
            
            localStorage.setItem('prolificId', prolificId);

            // Navigate to the next page after successful user creation
            navigate('/info1');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('There was an error creating your user. Please try again.'); // Optionally handle errors gracefully
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 mx-60">
            <h2 className="text-2xl font-bold mb-4">What is your Prolific ID?</h2>
            <input
                type="text"
                value={prolificId}
                onChange={(e) => setProlificId(e.target.value)}
                placeholder="Enter your Prolific ID"
                className="mb-4 px-4 py-2 border border-gray-300 rounded"
            />
            <CaptchaComponent setVerified={setVerified} />
            <div className="flex justify-end w-full">  {/* Ensures right alignment */}
                <button
                    onClick={handleNext}
                    className="flex items-center justify-center px-5 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#007AC0', fontSize: '28px'}}
                    disabled={!prolificId || !verified}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default ProlificId;
