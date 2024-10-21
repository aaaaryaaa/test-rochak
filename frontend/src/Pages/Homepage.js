// Pages/Homepage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [consent, setConsent] = useState(null); // State to track consent

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
            <h2>Consent Form</h2>
            <p>
                This study seeks to understand how you evaluate products and will require only about 5-6 minutes of your time. There are no right or wrong answers. It is extremely important that you read the questions carefully and provide your true assessments.
            </p>
            <p>
                Your responses are anonymous, and the data will be used for academic purposes only. If you have any questions about the study, please contact <a href="mailto:rochak.khandelwal20@iimb.ac.in">rochak.khandelwal20@iimb.ac.in</a>.
            </p>
            <p>Thank you for your time and support. Please indicate your consent:</p>
            <div>
                <label>
                    <input
                        type="radio"
                        value="agree"
                        checked={consent === 'agree'}
                        onChange={() => setConsent('agree')}
                    />
                    I Agree
                </label>
                <label>
                    <input
                        type="radio"
                        value="disagree"
                        checked={consent === 'disagree'}
                        onChange={() => setConsent('disagree')}
                    />
                    I Do Not Agree
                </label>
            </div>
            <button onClick={handleRedirect} disabled={loading || consent !== 'agree'}>
                {loading ? 'Redirecting...' : 'Go to Page'}
            </button>
        </div>
    );
};

export default Homepage;
