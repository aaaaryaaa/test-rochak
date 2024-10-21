// components/InfoPage2.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPage2 = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/final');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Information Page 2</h2>
            <p className="mb-4">
                Further you will be presented with various refrigerator models from these four brands. Click on any model to view its full specifications; a pop-up will display the details, and you can close it to return to the options screen.
                You are free to select as many models as you’d like to compare. The interactive design allows you to revisit the options screen at any time to adjust the models you are comparing.
                Once you’ve completed your comparisons, you’ll be prompted to make a final choice from the options you’ve selected.
            </p>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">
                Next
            </button>
        </div>
    );
};

export default InfoPage2;
