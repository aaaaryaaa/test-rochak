// components/Disclaimer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/fridgecomparison');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
            <p className="mb-4">
              Notably, FrostByte holds a large number of patents related to refrigeration technology, particularly focused on extending the freshness of food items.
            </p>
            <img className='' src='https://res.cloudinary.com/daja3mrty/image/upload/v1729478338/frostbytelogo_mllxak.jpg'></img>
            <img className='' src='https://res.cloudinary.com/daja3mrty/image/upload/v1729478359/frostbytemoto_fi4kc0.jpg'></img>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">
                Next
            </button>
        </div>
    );
};

export default Disclaimer;
