// components/Consent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure the CSS file is imported

const Consent = () => {
    const navigate = useNavigate();
    const [consent, setConsent] = useState(null);

    const handleNext = () => {
        if (consent === 'agree') {
            navigate('/prolific-id');
        }
        else navigate('/noconsent');
    };

    return (
        <div className="consent flex flex-col justify-center min-h-screen p-4 mx-60">
            <p className="text-2xl mb-4">
                This study helps us understand how people evaluate products. There are no right or wrong answers. It is extremely important that you read the questions carefully and provide your true assessments.
            </p>
            <p className="text-2xl mb-4">
                Your responses are anonymous, and the data will be used for academic purposes only. Thank you for your time and support. Please indicate your consent by clicking on the appropriate button below.
            </p>
            {/* <div className="flex flex-col mb-4">
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
            </button> */}
            <div className="flex flex-col space-y-4 mb-6">
                    <label className="block">
                        <input
                            type="radio"
                            value="agree"
                            checked={consent === 'agree'}
                            onChange={() => setConsent('agree')}
                            className="hidden"
                        />
                        <div
                            className={`cursor-pointer w-full p-4 text-center border rounded-md ${
                                consent === 'agree' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'
                            }`}
                        >
                            I Agree
                        </div>
                    </label>
                    <label className="block">
                        <input
                            type="radio"
                            value="disagree"
                            checked={consent === 'disagree'}
                            onChange={() => setConsent('disagree')}
                            className="hidden"
                        />
                        <div
                            className={`cursor-pointer w-full p-4 text-center border rounded-md ${
                                consent === 'disagree' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'
                            }`}
                        >
                            I Do Not Agree
                        </div>
                    </label>
                </div>
                <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    className={`flex items-center justify-center px-5 py-2 text-white rounded-lg ${
                        consent ? 'bg-[#007AC0] hover:bg-[#007AC0]' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!consent}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default Consent;
