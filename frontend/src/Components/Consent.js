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
        else navigate('/noconsent');
    };

    return (
        <div className="flex flex-col  justify-center min-h-screen p-4 mx-60">
            <h2 className="text-2xl text-left font-bold mb-4">Form of Consent</h2>
            <p className="mb-4">
                This study seeks to understand how you evaluate products and will require only about a few minutes of your time. There are no right or wrong answers. It is extremely important that you read the questions carefully and provide your true assessments.
            </p>
            <p className="mb-4">
                Your responses are anonymous, and the data will be used for academic purposes only. If you have any questions about the study, please contact <a href="mailto:rochak.khandelwal20@iimb.ac.in" className="text-blue-500">rochak.khandelwal20@iimb.ac.in</a>.
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
                <button
                    onClick={handleNext}
                    className={`w-full py-3 text-white rounded-md ${
                        consent ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Next
                </button>
        </div>
    );
};

export default Consent;
