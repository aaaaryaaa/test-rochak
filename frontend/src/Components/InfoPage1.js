// components/InfoPage1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPage1 = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/info2');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Information Page 1</h2>
            <p className="mb-4">
                Frustrated by your fridge's lukewarm performance, you recall the nightmare that began 3 weeks ago. It suddenly stopped cooling entirely. A repair person offered a temporary fix, but the chill soon vanished again, and the problem resurfaced. After a thorough inspection, the inevitable was confirmed: you need a new fridge. Fortunately, your search led you to a selection of refrigerators that might be just what you need.
            </p>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">
                Next
            </button>
        </div>
    );
};

export default InfoPage1;
