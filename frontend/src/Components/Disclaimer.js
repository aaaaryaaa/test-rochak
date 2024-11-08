// components/Disclaimer.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure the CSS file is imported

const Disclaimer = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(10); // Initialize timer with 10 seconds
    const [isDisabled, setIsDisabled] = useState(true); // Button starts as disabled

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1); // Decrease time left by 1 every second
            }, 1000);

            return () => clearTimeout(timer); // Clear timeout if component unmounts
        } else {
            setIsDisabled(false); // Enable button when timer reaches 0
        }
    }, [timeLeft]);

    const handleNext = () => {
        navigate('/fridgecomparison');
    };

    return (
        <div className="disclaimer flex flex-col justify-center min-h-screen p-4 mx-60">
            <div className='flex flex-col items-center'>
                <img className='w-[30rem] pt-1' src='https://res.cloudinary.com/daja3mrty/image/upload/v1729478338/frostbytelogo_mllxak.jpg'></img>
                <img className='w-[30rem] pb-1' src='https://res.cloudinary.com/daja3mrty/image/upload/v1729478359/frostbytemoto_fi4kc0.jpg'></img>
            </div>
            <p className="text-2xl mb-4">
            FrostByte is known for its innovation and holds a large number of patents related to refrigeration technology, particularly focused on extending the freshness of food items.
            </p>

            {/* <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">
                Next
            </button> */}
            <button
            onClick={handleNext}
            disabled={isDisabled} // Disable button if isDisabled is true
            className={`px-4 py-2 rounded ${
                isDisabled ? 'bg-gray-400' : 'bg-blue-500'
            } text-white`}
        >
            {isDisabled ? `Wait ${timeLeft} seconds` : '→'}
        </button>
        </div>
    );
};

export default Disclaimer;
