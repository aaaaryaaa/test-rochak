// components/Consent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Consent = () => {
    const navigate = useNavigate();
    const [consent, setConsent] = useState(null);

    const handleNext = () => {
        if (consent === 'agree') {
            navigate('/prolific-id');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Form of Consent</h2>
            <p className="mb-4">
                This study seeks to understand how you evaluate products and will require only about 5-6 minutes of your time. There are no right or wrong answers. It is extremely important that you read the questions carefully and provide your true assessments.
            </p>
            <p className="mb-4">
                Your responses are anonymous, and the data will be used for academic purposes only. If you have any questions about the study, please contact <a href="mailto:rochak.khandelwal20@iimb.ac.in" className="text-blue-500">rochak.khandelwal20@iimb.ac.in</a>.
            </p>
            <div className="flex flex-col mb-4">
                <label className="flex items-center">
                    <input
                        type="radio"
                        value="agree"
                        checked={consent === 'agree'}
                        onChange={() => setConsent('agree')}
                        className="mr-2"
                    />
                    I Agree
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        value="disagree"
                        checked={consent === 'disagree'}
                        onChange={() => setConsent('disagree')}
                        className="mr-2"
                    />
                    I Do Not Agree
                </label>
            </div>
            <button
                onClick={handleNext}
                className={`px-4 py-2 bg-blue-500 text-white rounded ${!consent ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!consent}
            >
                Next
            </button>
        </div>
    );
};

export default Consent;
