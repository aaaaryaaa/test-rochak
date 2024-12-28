// components/InfoPage1.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure the CSS file is imported

const InfoPage1 = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(10); // Initialize timer with 10 seconds
    const [isButtonVisible, setIsButtonVisible] = useState(false); // Track button visibility

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1); // Decrease time left by 1 every second
            }, 1000);

            return () => clearTimeout(timer); // Clear timeout if component unmounts
        } else {
            setIsButtonVisible(true); // Show button after 10 seconds
        }
    }, [timeLeft]);

    const handleNext = () => {
        navigate('/info2');
    };

    return (
        <div className="infopage1 flex flex-col justify-center min-h-screen p-4 mx-60">
            <p className="text-2xl mb-4 leading-relaxed">
            Imagine a scenario where you’re frustrated by your fridge's poor performance, recalling the nightmare that began three weeks ago when it suddenly stopped cooling entirely. A repair person offered a temporary fix, but the chill soon vanished again, and the problem resurfaced.
            </p>
            <p className="text-2xl mb-4 leading-relaxed">
            After a thorough inspection, the inevitable was confirmed: you need a new fridge now and decide to buy a new one. Fortunately, your search led you to a selection of refrigerators that are within your budget.
            </p>
            <p className='text-2xl mb-4 leading-relaxed'>
            After some initial research, you narrowed your search to the options offered by four brands: <span className="frostbyte">FrostByte</span>, <span className="coolnest">CoolNest</span>, <span className="chillcore">ChillCore</span>, and <span className="polarpeak">PolarPeak</span>.
            </p>
            <div className="flex justify-end">  {/* Ensures right alignment */}
            <button
                    onClick={handleNext}
                    className={`flex items-center justify-center px-5 py-2 text-white rounded-lg transition-opacity duration-300 ${isButtonVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundColor: '#007AC0', pointerEvents: isButtonVisible ? 'auto' : 'none' }} // Apply styling and visibility control
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default InfoPage1;
